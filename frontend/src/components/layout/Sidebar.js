"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("@iconify/react");
const utils_1 = require("../../lib/utils");
const Sidebar = () => {
    const navItems = [
        { label: 'Dashboard', icon: 'lucide:layout-dashboard', to: '/admin', end: true },
        { label: 'Live Queue', icon: 'lucide:users', to: '/admin/queue' },
        { label: 'Client CRM', icon: 'lucide:contact-2', to: '/admin/clients' },
        { label: 'Analytics', icon: 'lucide:bar-chart-3', to: '/admin/analytics' },
    ];
    const managementItems = [
        { label: 'Loyalty', icon: 'lucide:award', to: '/admin/loyalty' },
        { label: 'Settings', icon: 'lucide:settings', to: '/admin/settings' },
    ];
    const linkClass = ({ isActive }) => (0, utils_1.cn)("flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium", isActive
        ? "bg-primary/10 text-primary"
        : "text-slate-600 hover:bg-slate-50");
    return (<aside className="w-60 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 h-screen sticky top-0">
      <div className="p-6">
        <span className="text-primary font-bold text-xl tracking-tight">The Gentleman's Quarter</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Main Menu</p>
        {navItems.map((item) => (<react_router_dom_1.NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            <react_2.Icon icon={item.icon} className="text-lg"/>
            {item.label}
          </react_router_dom_1.NavLink>))}

        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-2 px-2">Management</p>
        {managementItems.map((item) => (<react_router_dom_1.NavLink key={item.to} to={item.to} className={linkClass}>
            <react_2.Icon icon={item.icon} className="text-lg"/>
            {item.label}
          </react_router_dom_1.NavLink>))}
      </nav>
    </aside>);
};
exports.Sidebar = Sidebar;
