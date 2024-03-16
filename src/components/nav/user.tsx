import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import axios from "../../config/axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Admin } from "../../lib/types";

const User = ({ admin }: { admin: Admin | null }) => {
    return (
        <Popover>
            <PopoverTrigger className="flex gap-1 md:gap-2 rounded-full md:min-w-32 bg-zinc-100 py-1 ps-1 dark:bg-zinc-800 sm:pe-4 md:py-1 md:ps-1">
                <img
                    src="https://github.com/shadcn.png"
                    alt=""
                    className="rounded-full size-8 md:size-10"
                />
                <div className="flex flex-col items-start">
                    <span className="font-semibold text-xs lg:text-sm hidden sm:block">
                        {admin?.name}
                    </span>
                    <span className="text-[0.5rem] md:text-xs hidden sm:block text-green-500 font-medium">
                        Admin
                    </span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-1 rounded-2xl">
                <UserCard admin={admin} />
            </PopoverContent>
        </Popover>
    );
};

export default User;

const UserCard = ({ admin }: { admin: Admin | null }) => {
    const navigate = useNavigate();

    // Function to logout the admin
    const logout = () => {
        axios
            .get("/api/admin/logout")
            .then(() => {
                toast.success("Successfully logout!"); // Notify response with toast message
                navigate("/");
            })
            .catch(() => {
                toast.success("Something went wrong!"); // Notify response with toast message
            });
    };

    return (
        <Card className="border-none min-w-[250px] max-w-[300px] bg-transparent p-2 py-2.5 shadow-none">
            <CardHeader className="justify-between p-0">
                <div className="flex gap-3">
                    <Avatar className="ring-2 ring-offset-2 ring-gray-300">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none">
                            {admin?.name}
                        </h4>
                        <h5 className="text-xs font-medium tracking-tight text-green-500">
                            Admin
                        </h5>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 py-2">
                <p className="pl-px text-small dark:text-default-500">
                    Welcome back {admin?.name}
                    <span aria-label="confetti" role="img">
                        🎉
                    </span>
                </p>
            </CardContent>
            <CardFooter className="flex-col gap-3 p-1">
                <Button
                    as={Link}
                    to="/"
                    className="text-black flex gap-2 w-full justify-start font-medium"
                    size="sm"
                    startContent={<Settings size={20} />}
                >
                    Settings
                </Button>
                <Button
                    color="danger"
                    variant="flat"
                    className="flex gap-2 w-full justify-start font-medium"
                    size="sm"
                    onPress={logout}
                    startContent={<LogOut size={20} />}
                >
                    Sign Out
                </Button>
            </CardFooter>
        </Card>
    );
};
