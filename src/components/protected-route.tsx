import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { Outlet, useNavigate } from "react-router-dom";
import PageLoading from "./shared/page-loading";
import Nav from "./nav/nav";
import { Admin } from "../lib/types";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("/api/admin/verify")
            .then(({ data }) => {
                setAdmin(data.admin);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                navigate("/", { replace: true });
            });
    }, [navigate, setAdmin, setIsLoading]);

    if (isLoading) {
        return <PageLoading />;
    }

    return (
        <React.Suspense fallback={<PageLoading />}>
            <Nav admin={admin}>
                <Outlet context={admin} />
            </Nav>
        </React.Suspense>
    );
};

export default ProtectedRoute;
