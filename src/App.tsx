import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Error404 from "./components/error404";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import PageLoading from "./components/shared/page-loading";
import ProtectedRoute from "./components/protected-route";
import ListingRoutes from "./routes/listing";
import { GlobalContextProvider } from "./context/store";
import queryConfig from "./config/react-query.config";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));

const queryClient = new QueryClient({
    defaultOptions: queryConfig,
});

function App() {
    return (
        <Suspense fallback={<PageLoading />}>
            <div className="App">
                <QueryClientProvider client={queryClient}>
                    <NextUIProvider>
                        <GlobalContextProvider>
                            <Routes>
                                <Route path="*" element={<Error404 />} />
                                <Route path="/" element={<Login />} />
                                <Route
                                    path="/dashboard"
                                    element={<ProtectedRoute />}
                                >
                                    <Route index element={<Dashboard />} />
                                    <Route
                                        path="listings/*"
                                        element={<ListingRoutes />}
                                    />
                                </Route>
                            </Routes>
                        </GlobalContextProvider>
                    </NextUIProvider>
                </QueryClientProvider>
            </div>
            <Toaster richColors position="top-right" />
        </Suspense>
    );
}

export default App;
