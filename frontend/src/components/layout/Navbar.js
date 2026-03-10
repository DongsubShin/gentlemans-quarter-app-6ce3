"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("@iconify/react");
const Navbar = () => {
    return (<header className="fixed top-0 w-full bg-white border-b border-slate-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <react_router_dom_1.Link to="/" className="text-primary font-bold text-xl tracking-tight">
            The Gentleman's Quarter
          </react_router_dom_1.Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-slate-600 hover:text-primary font-medium transition-colors">Services</a>
          <a href="#queue" className="text-slate-600 hover:text-primary font-medium transition-colors">Live Queue</a>
          <react_router_dom_1.Link to="/book" className="bg-primary text-white px-6 py-2.5 rounded-md font-semibold hover:bg-primary/90 transition-all">
            Book Now
          </react_router_dom_1.Link>
        </div>

        <div className="md:hidden">
          <react_2.Icon icon="lucide:menu" className="text-2xl text-primary"/>
        </div>
      </nav>
    </header>);
};
exports.Navbar = Navbar;
