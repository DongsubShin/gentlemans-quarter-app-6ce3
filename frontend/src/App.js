"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const MainLayout_1 = require("./components/layout/MainLayout");
const AdminLayout_1 = require("./components/layout/AdminLayout");
const LandingPage_1 = require("./pages/LandingPage");
const DashboardPage_1 = require("./pages/admin/DashboardPage");
const queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});
const App = () => {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          {/* User Routes */}
          <react_router_dom_1.Route path="/" element={<MainLayout_1.MainLayout />}>
            <react_router_dom_1.Route index element={<LandingPage_1.LandingPage />}/>
            <react_router_dom_1.Route path="book" element={<div>Booking Page (Coming Soon)</div>}/>
          </react_router_dom_1.Route>

          {/* Admin Routes */}
          <react_router_dom_1.Route path="/admin" element={<AdminLayout_1.AdminLayout />}>
            <react_router_dom_1.Route index element={<DashboardPage_1.DashboardPage />}/>
            <react_router_dom_1.Route path="queue" element={<div>Live Queue Management</div>}/>
            <react_router_dom_1.Route path="clients" element={<div>Client CRM</div>}/>
            <react_router_dom_1.Route path="analytics" element={<div>Analytics Dashboard</div>}/>
            <react_router_dom_1.Route path="loyalty" element={<div>Loyalty Program</div>}/>
            <react_router_dom_1.Route path="settings" element={<div>Shop Settings</div>}/>
          </react_router_dom_1.Route>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </react_query_1.QueryClientProvider>);
};
exports.default = App;
