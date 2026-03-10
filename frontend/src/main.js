"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const react_query_1 = require("@tanstack/react-query");
const react_query_devtools_1 = require("@tanstack/react-query-devtools");
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
const queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
    },
});
client_1.default.createRoot(document.getElementById('root')).render(<react_1.default.StrictMode>
    <react_query_1.QueryClientProvider client={queryClient}>
      <App_tsx_1.default />
      <react_query_devtools_1.ReactQueryDevtools initialIsOpen={false}/>
    </react_query_1.QueryClientProvider>
  </react_1.default.StrictMode>);
