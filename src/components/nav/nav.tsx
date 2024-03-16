import { ReactNode } from "react";
import Sidebar from "./sidebar";
import User from "./user";
import { useLocation } from "react-router-dom";
import { Admin } from "../../lib/types";

const Nav = ({
    children,
    admin,
}: {
    children: ReactNode;
    admin: Admin | null;
}) => {
    const pathname = useLocation().pathname;

    // @ts-ignore
    let path = pathname.split("/").at(-1);
    // @ts-ignore
    if (path && path.length > 12) path = pathname.split("/").at(-2);

    return (
        <div className="flex">
            <Sidebar />
            <div className="scrollbar-thin max-h-screen w-full overflow-y-scroll">
                <nav className="sticky top-0 z-10 flex w-full items-center justify-between border-b bg-white px-3 py-4 dark:bg-dark md:py-5">
                    <h1 className="ms-10 text-xl font-medium capitalize lg:ms-0">
                        {path?.replace("-", " ")}
                    </h1>
                    <div className="flex items-center gap-3">
                        <User admin={admin} />
                    </div>
                </nav>
                <main className="mx-auto min-h-[calc(100vh_-_90px)] max-w-7xl flex-1 px-3 py-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Nav;
