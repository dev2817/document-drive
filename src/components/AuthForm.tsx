"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

const signInSchema = z.object({
    name: z.string().min(3, { message: "Username or Email is required" }),
    password: z.string().min(3, { message: "Password is required" }),
});

const signUpSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name must not exceed 50 characters" })
        .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(30, { message: "Username must not exceed 30 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    email: z.string()
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must not exceed 50 characters" })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }),
    mobile: z.string()
        .min(10, { message: "Mobile number must be at least 10 digits long" })
        .max(15, { message: "Mobile number must not exceed 15 digits" })
        .regex(/^\+?[0-9]+$/, { message: "Mobile number can only contain digits and an optional leading '+' sign" }),
});

const signUpValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
}

const signInValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
}

type FormType = "sign-in" | "sign-up";

export default function AuthForm({ type }: { type: FormType }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    type FormSchemas = typeof signInSchema | typeof signUpSchema;
    type FormValues = z.infer<FormSchemas>;

    const schema = type === "sign-in" ? signInSchema : signUpSchema;

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: type === "sign-in"
            ? signInValues
            : signUpValues,
    });

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);

        if (type === "sign-in") {
            console.log("Sign-in values:", values);
        } else if (type === "sign-up") {
            console.log("Sign-up values:", values);
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
                    <h1 className="form-title">
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </h1>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={type === 'sign-in' ? "Enter your username or email" : "Enter your full name"}
                                            className="shad-input"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="shad-form-item">
                                        <FormLabel className="shad-form-label">Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your username"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="shad-form-message" />
                                </FormItem>
                            )}
                        />
                    )}
                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="shad-form-item">
                                        <FormLabel className="shad-form-label">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="shad-form-message" />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="shad-form-item">
                                    <FormLabel className="shad-form-label">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            className="shad-input"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="shad-form-item">
                                        <FormLabel className="shad-form-label">Mobile</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter your mobile"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="shad-form-message" />
                                </FormItem>
                            )}
                        />
                    )}
                    <Button type="submit">{isLoading && <LoaderCircle className='h-y w-7 animate-spin' />} Submit</Button>
                    {errorMessage && (<p className="error-message">*{errorMessage}</p>)}
                    <div className="body-2 flex justify-center">
                        <p className="text-light-100">{type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}</p>
                        <Link className="ml-1 font-medium text-brand" href={type === 'sign-in' ? '/auth/sign-up' : '/auth/sign-in'}>
                            {type === 'sign-in' ? "Sign Up" : "Sign In"}
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    );
}
