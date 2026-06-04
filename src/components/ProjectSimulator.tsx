import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { 
  Heart, 
  Activity, 
  Plus, 
  Minus, 
  CheckCircle, 
  Trash2, 
  Database, 
  Terminal, 
  ShoppingBag, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle 
} from 'lucide-react';

export default function ProjectSimulator() {
  const [activeTab, setActiveTab] = useState<'cardio' | 'foodcourt'>('cardio');
  
  // Cardio Simulator States
  const [isSimulating, setIsSimulating] = useState(false);
  const [bpm, setBpm] = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [bloodPressure, setBloodPressure] = useState({ sys: 120, dia: 80 });
  const [riskScore, setRiskScore] = useState<string>('Normal');
  const [ecgData, setEcgData] = useState<number[]>(Array(50).fill(50));
  const ecgIntervalRef = useRef<any>(null);

  // Food Court States
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState<{ id: string; total: number; timestamp: string } | null>(null);

  const menuItems = [
    { id: 'item-1', name: 'Special Java Double-Cheese Burger', price: 149, category: 'Main Course' },
    { id: 'item-2', name: 'Robust Brew Espresso Float', price: 99, category: 'Beverages' },
    { id: 'item-3', name: 'Smart IoT Fruit Bowl (Low Glycemic)', price: 120, category: 'Salads' },
    { id: 'item-4', name: 'Garlic Thread-Pool Fries', price: 79, category: 'Sides' },
  ];

  // 1. Cardio ECG Loop Simulator
  useEffect(() => {
    if (isSimulating) {
      ecgIntervalRef.current = setInterval(() => {
        // Randomize vitals slightly
        setBpm((prev) => {
          const change = Math.floor(Math.random() * 5) - 2;
          const next = Math.max(60, Math.min(135, prev + change));
          return next;
        });

        setSpo2((prev) => {
          const change = Math.floor(Math.random() * 3) - 1;
          const next = Math.max(88, Math.min(100, prev + change));
          return next;
        });

        // Simulating continuous BP fluctuations
        setBloodPressure((prev) => {
          const factor = Math.random() > 0.5 ? 1 : -1;
          const sysChange = Math.floor(Math.random() * 2) * factor;
          const diaChange = Math.floor(Math.random() * 2) * factor;
          return {
            sys: Math.max(90, Math.min(150, prev.sys + sysChange)),
            dia: Math.max(60, Math.min(95, prev.dia + diaChange)),
          };
        });

        // ECG wave simulation
        setEcgData((prev) => {
          const nextData = [...prev.slice(1)];
          // Create simulated heartbeat spike occasionally
          const cyclePosition = Math.floor(Math.random() * 10);
          let nextVal = 50 + (Math.random() * 6 - 3);
          if (cyclePosition === 1) {
            nextVal = 95; // QRS complex spike
          } else if (cyclePosition === 2) {
            nextVal = 10; // QRS deep dip
          } else if (cyclePosition === 4) {
            nextVal = 65; // T-wave
          }
          nextData.push(nextVal);
          return nextData;
        });
      }, 200);
    } else {
      if (ecgIntervalRef.current) {
        clearInterval(ecgIntervalRef.current);
      }
    }

    return () => {
      if (ecgIntervalRef.current) {
        clearInterval(ecgIntervalRef.current);
      }
    };
  }, [isSimulating]);

  // Evaluate risk level on vital changes
  useEffect(() => {
    if (!isSimulating) {
      setRiskScore('Inactive');
      return;
    }
    // Simple mock classification model matching the ESP32 parameter descriptions
    if (bpm > 105 || spo2 < 93 || bloodPressure.sys > 135) {
      setRiskScore('HIGH RISK (Alert Action Required!)');
    } else if (bpm > 90 || spo2 < 95 || bloodPressure.sys > 130) {
      setRiskScore('MILD RISK (Pre-Caution advised)');
    } else {
      setRiskScore('Normal Healthy Heart Pattern');
    }
  }, [bpm, spo2, bloodPressure, isSimulating]);

  const triggerAnomalousSpike = () => {
    setBpm(128);
    setSpo2(90);
    setBloodPressure({ sys: 148, dia: 98 });
  };

  const resetVitals = () => {
    setBpm(72);
    setSpo2(99);
    setBloodPressure({ sys: 120, dia: 80 });
  };

  // 2. Food Court Handlers
  const addToCart = (item: typeof menuItems[0]) => {
    setCart((prev) => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
    setOrderPlaced(false);
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCart((prev) => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = i.quantity + change;
          return newQty > 0 ? { ...i, quantity: newQty } : i;
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter(i => i.id !== itemId));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const orderTotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0) * 1.18; // plus 18% GST
    const transactionId = "TXN-" + Math.floor(100000 + Math.random() * 900000);
    setPlacedOrderDetails({
      id: transactionId,
      total: Math.round(orderTotal),
      timestamp: new Date().toLocaleTimeString(),
    });
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Selector Bar */}
      <div className="flex border-b border-[#37353E]/20" id="simulation-selector">
        <button
          onClick={() => setActiveTab('cardio')}
          className={`flex-1 py-4 text-center font-display font-semibold text-xs md:text-sm transition-all duration-300 relative flex items-center justify-center gap-2 ${
            activeTab === 'cardio' 
              ? 'text-[#D92243]' 
              : 'text-[#37353E]/60 hover:text-[#37353E]'
          }`}
          id="tab-select-cardio"
        >
          <Activity className={`w-4 h-4 ${activeTab === 'cardio' ? 'animate-pulse text-[#D92243]' : ''}`} />
          <span>Cardio Risk Monitor (IoT/ML)</span>
          {activeTab === 'cardio' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D92243]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('foodcourt')}
          className={`flex-1 py-4 text-center font-display font-semibold text-xs md:text-sm transition-all duration-300 relative flex items-center justify-center gap-2 ${
            activeTab === 'foodcourt' 
              ? 'text-[#D92243]' 
              : 'text-[#37353E]/60 hover:text-[#37353E]'
          }`}
          id="tab-select-foodcourt"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Food Court Checkout (Responsive Cart)</span>
          {activeTab === 'foodcourt' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D92243]" />
          )}
        </button>
      </div>

      {/* CARDIO INTERACTIVE SIMULATOR */}
      {activeTab === 'cardio' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="cardio-sim-content">
          {/* Wave & Control Console */}
          <div className="lg:col-span-2 bg-[#37353E] rounded-xl p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden h-[420px]">
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isSimulating ? 'bg-green-500 animate-ping' : 'bg-[#D92243]'}`} />
                <span className="font-mono text-xs tracking-widest text-[#E6D8C3] uppercase">
                  ESP32 Stream: {isSimulating ? 'ONLINE' : 'LOCKED'}
                </span>
              </div>
              <div className="text-[10px] font-mono text-gray-400">
                COM3: 115200 BAUD
              </div>
            </div>

            {/* Simulated Canvas Waveform */}
            <div className="flex-1 my-4 bg-black/40 border border-emerald-500/10 rounded-lg p-2 relative flex flex-col justify-end">
              <div className="absolute top-3 left-4 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-emerald-500/20">
                <Heart className="w-2.5 h-2.5 text-[#D92243] fill-[#D92243] animate-pulse" />
                <span>Simulated Real-Time ECG Output (mV)</span>
              </div>
              
              {/* Render simulated bar charts as heartbeat waveform */}
              <div className="h-44 flex items-end justify-between gap-[2px] px-2 w-full">
                {ecgData.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-emerald-500/80 rounded-t"
                    style={{ 
                      height: `${val}%`,
                      backgroundColor: riskScore.includes('HIGH') ? '#D92243' : '#10B981',
                      opacity: 0.3 + (idx / 50) * 0.7 
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Monitor console action keys */}
            <div className="flex gap-2.5 pt-2 z-10">
              {isSimulating ? (
                <>
                  <button
                    onClick={() => setIsSimulating(false)}
                    className="flex-1 bg-[#D92243] text-white py-2.5 rounded-lg text-xs md:text-sm font-semibold hover:bg-opacity-90 transition font-display"
                    id="sim-stop"
                  >
                    Pause Telemetry
                  </button>
                  <button
                    onClick={triggerAnomalousSpike}
                    className="bg-amber-500 text-slate-900 px-4 py-2.5 rounded-lg text-xs font-mono font-bold hover:bg-amber-400 transition"
                    id="sim-spike"
                    title="Simulate sudden arrhythmia/deoxygenation event"
                  >
                    Trigger Vital Spike
                  </button>
                  <button
                    onClick={resetVitals}
                    className="bg-zinc-600 text-[#E6D8C3] px-3 py-2.5 rounded-lg text-xs font-mono font-semibold hover:bg-zinc-500 transition"
                    id="sim-reset"
                  >
                    Reset Normal
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsSimulating(true)}
                  className="w-full bg-emerald-500 text-slate-950 py-3 rounded-lg text-xs md:text-sm font-bold hover:bg-emerald-400 transition font-display uppercase tracking-wider"
                  id="sim-start"
                >
                  Start Live ESP32 Telemetry & ML Predictor
                </button>
              )}
            </div>
          </div>

          {/* ML Classifier Metrics Panel */}
          <div className="bg-[#E6D8C3]/30 border border-[#37353E]/10 rounded-xl p-5 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-display font-semibold text-slate-800 text-sm md:text-base border-b border-[#37353E]/10 pb-3 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#D92243]" />
                <span>ML Diagnostics Model (Local)</span>
              </h3>

              {/* Vitals breakdown cards */}
              <div className="space-y-3.5">
                {/* Heart Rate BPM */}
                <div className="bg-white/90 border border-slate-200 rounded-lg p-3 flex justify-between items-center shadow-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold block">Heart Rate</span>
                    <span className="font-display text-xl font-bold text-slate-800">{isSimulating ? bpm : '--'} <span className="text-xs font-normal text-slate-500">BPM</span></span>
                  </div>
                  <Heart className={`w-6 h-6 ${isSimulating ? 'text-[#D92243] animate-ping' : 'text-slate-300'}`} />
                </div>

                {/* Oxygen Level SpO2 */}
                <div className="bg-white/90 border border-slate-200 rounded-lg p-3 flex justify-between items-center shadow-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold block">Blood Oxygen</span>
                    <span className="font-display text-xl font-bold text-slate-800">{isSimulating ? spo2 : '--'} <span className="text-xs font-normal text-slate-500">% SpO2</span></span>
                  </div>
                  <TrendingUp className={`w-6 h-6 ${isSimulating ? 'text-emerald-500' : 'text-slate-300'}`} />
                </div>

                {/* Blood Pressure */}
                <div className="bg-white/90 border border-slate-200 rounded-lg p-3 flex justify-between items-center shadow-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold block">Blood Pressure</span>
                    <span className="font-display text-xl font-bold text-slate-800">
                      {isSimulating ? `${bloodPressure.sys}/${bloodPressure.dia}` : '--'} <span className="text-xs font-normal text-slate-500">mmHg</span>
                    </span>
                  </div>
                  <Activity className="w-5 h-5 text-indigo-500" />
                </div>
              </div>
            </div>

            {/* Machine Learning Output Statement */}
            <div className="mt-5 bg-white border border-[#37353E]/15 rounded-lg p-4">
              <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 block font-semibold mb-1">
                Risk Classification Alert Level
              </span>
              <div className="flex items-start gap-2">
                {riskScore.includes('HIGH') ? (
                  <AlertTriangle className="w-5 h-5 text-[#D92243] shrink-0 mt-0.5 animate-bounce" />
                ) : (
                  <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isSimulating ? 'text-emerald-500' : 'text-slate-400'}`} />
                )}
                <div>
                  <h4 className={`text-xs font-bold leading-tight uppercase ${
                    riskScore.includes('HIGH') 
                      ? 'text-[#D92243]' 
                      : riskScore.includes('MILD') 
                        ? 'text-amber-600' 
                        : 'text-slate-800'
                  }`}>
                    {riskScore}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">
                    {isSimulating 
                      ? "A local ML algorithm scores these readings dynamically." 
                      : "Click telemetry to start feeding mock ESP32 registers into the core evaluation matrices."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOD COURT ORDER SIMULATOR */}
      {activeTab === 'foodcourt' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" id="foodcourt-sim-content">
          {/* Menu Catalog Section */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display font-medium text-[#37353E] text-base mb-2">Available Menu Specials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {menuItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-[#37353E]/10 hover:border-[#D92243]/30 rounded-xl p-4 flex flex-col justify-between transition duration-350 hover:shadow-sm"
                  id={`menu-item-${item.id}`}
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-mono bg-[#37353E]/5 text-[#37353E] px-2 py-0.5 rounded-full font-semibold mb-2 inline-block">
                      {item.category}
                    </span>
                    <h4 className="font-display font-bold text-slate-800 text-sm mb-1 leading-tight">{item.name}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-100">
                    <span className="font-mono text-[#D92243] font-bold text-sm">₹{item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-[#37353E] text-white p-2 rounded-full hover:bg-[#D92243] transition-all duration-300 flex items-center justify-center shadow-xs"
                      title="Add to cart"
                      id={`add-btn-${item.id}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#37353E]/5 rounded-lg p-3 border border-dashed border-[#37353E]/20 text-center text-xs text-slate-600">
              Interactive sandbox representing frontend state management and responsive styling configurations.
            </div>
          </div>

          {/* Interactive Dynamic Cart Section */}
          <div className="lg:col-span-2 bg-[#37353E] text-white rounded-xl p-5 flex flex-col justify-between shadow-md h-full min-h-[350px]">
            <div>
              <div className="flex justify-between items-center border-b border-[#E6D8C3]/20 pb-3 mb-4">
                <span className="font-display font-bold text-sm text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <ShoppingBag className="w-4 h-4 text-[#D92243]" />
                  <span>Your Basket</span>
                </span>
                <span className="font-mono text-xs bg-[#D92243] px-2 py-0.5 rounded font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
              </div>

              {/* Cart List */}
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  {orderPlaced && placedOrderDetails ? (
                    <div className="space-y-4 animate-fade-in text-center p-2">
                      <div className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-green-500/15 text-green-400 mb-1">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-sm">ORDER TRANSLATED TO RESTAURANT!</h4>
                        <p className="text-xs text-[#E6D8C3]/80 mt-1">Transaction: <code className="bg-black/20 px-1 py-0.5 rounded text-yellow-300 font-mono text-[10px]">{placedOrderDetails.id}</code></p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Receipt Total: ₹{placedOrderDetails.total} (including SGST/CGST)</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#E6D8C3]/50 text-xs italic">
                      No dishes in cart. Click "+" on the catalog specials to populate details.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center gap-2 border-b border-[#E6D8C3]/5 pb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold truncate text-white block">{item.name}</h4>
                        <span className="text-[10px] text-[#E6D8C3]/60 font-mono block">₹{item.price} each</span>
                      </div>
                      
                      {/* Plus / Minus quantity controls */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-[#E6D8C3]/10 hover:bg-[#E6D8C3]/20 p-1 rounded hover:text-[#D92243] transition text-gray-300"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono text-xs font-bold shrink-0 w-3 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-[#E6D8C3]/10 hover:bg-[#E6D8C3]/20 p-1 rounded hover:text-green-400 transition text-gray-300"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#D92243] p-1 hover:text-white transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculations & Pricing */}
            {cart.length > 0 && (
              <div className="border-t border-[#E6D8C3]/10 pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-xs text-[#E6D8C3]/70">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#E6D8C3]/70">
                  <span>State Taxes (18% combo SGST/CGST)</span>
                  <span className="font-mono">₹{Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.18)}</span>
                </div>
                <div className="flex justify-between text-sm text-white font-bold border-t border-[#E6D8C3]/15 pt-2">
                  <span>Amount Due</span>
                  <span className="font-mono text-yellow-300">
                    ₹{Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.18)}
                  </span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#D92243] hover:bg-opacity-90 text-white font-display text-xs font-bold py-2.5 rounded-lg transition uppercase tracking-wider mt-2.5"
                  id="checkout-btn"
                >
                  Place Order (Simulate Receipt)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
