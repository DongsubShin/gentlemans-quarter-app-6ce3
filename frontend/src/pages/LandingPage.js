"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPage = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@iconify/react");
const useBookingData_1 = require("../hooks/useBookingData");
const LandingPage = () => {
    const { data: queue } = (0, useBookingData_1.useLiveQueue)();
    const { data: services } = (0, useBookingData_1.useServices)();
    return (<div className="pt-20">
      {/* Hero Section */}
      <section id="home" className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" alt="Barbershop Interior" className="w-full h-full object-cover"/>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary text-sm font-bold mb-6 tracking-wide uppercase">Est. 2023</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Precision Grooming for the <br />
            <span className="text-secondary">Modern Gentleman</span>
          </h1>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Experience the perfect blend of traditional craftsmanship and contemporary style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-primary text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-primary/90 transition-all">Book Appointment</button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-all">Join Walk-in Queue</button>
          </div>
        </div>
      </section>

      {/* Live Queue Status */}
      <section id="queue" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <react_2.Icon icon="lucide:clock" className="text-3xl"/>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Live Walk-in Queue</h2>
                <p className="text-slate-500">Current estimated wait time for walk-ins</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <span className="text-5xl font-black text-primary">
                {queue?.[0]?.estimatedWait || 15} <span className="text-xl font-bold text-slate-400 uppercase">min</span>
              </span>
              <p className="text-sm font-semibold text-green-600 mt-2 flex items-center justify-center md:justify-end gap-1">
                <span className="h-2 w-2 bg-green-600 rounded-full animate-pulse"></span>
                {queue?.length || 0} people in line
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Signature Services</h2>
            <div className="h-1.5 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services?.map((service) => (<div key={service.id} className="group bg-white border border-slate-100 p-8 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-slate-500 mb-6">{service.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-2xl font-black text-primary">${service.price}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{service.duration} mins</span>
                </div>
              </div>))}
          </div>
        </div>
      </section>
    </div>);
};
exports.LandingPage = LandingPage;
