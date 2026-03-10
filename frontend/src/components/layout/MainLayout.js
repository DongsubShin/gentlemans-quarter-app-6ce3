"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLayout = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Navbar_1 = require("./Navbar");
const MainLayout = () => {
    return (<div className="min-h-screen bg-white">
      <Navbar_1.Navbar />
      <main>
        <react_router_dom_1.Outlet />
      </main>
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">© 2024 The Gentleman's Quarter. All rights reserved.</p>
        </div>
      </footer>
    </div>);
};
exports.MainLayout = MainLayout;
