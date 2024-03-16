import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useLogin } from "../api-hooks/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZodAuthSchema } from "../lib/zod-schemas/schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import PageLoading from "../components/shared/page-loading";
import { Button } from "@nextui-org/react";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("/api/admin/verify")
            .then(() => {
                navigate("/dashboard");
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [navigate]);

    // 1. Define your form.
    const form = useForm<z.infer<typeof ZodAuthSchema>>({
        resolver: zodResolver(ZodAuthSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSuccess() {
        toast.success("Login Success");
        navigate("/dashboard");
    }

    const mutation = useLogin(onSuccess);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ZodAuthSchema>) {
        mutation.mutate(values);
    }

    if (isLoading) {
        return <PageLoading />;
    }

    return (
        <div className="pt-20">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage className="font-normal text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                color="primary"
                                radius="sm"
                                className="w-full text-white"
                                isLoading={mutation.isPending}
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
