"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function SignInPage() {
  const router = useRouter();

  // Email + Password Login
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Email:", email);
    console.log("Password:", password);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    console.log(data, error);

    if (error) {
      toast.error(error.message || "Sign in failed");
      return;
    }

    toast.success("Sign in successful!");

    router.push("/");
    router.refresh();
  };

  // Google Login
  const handleGoogleSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    console.log(data, error);

    if (error) {
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <Card className="mx-auto mt-10 w-125 border bg-purple-300 py-10">
      <h1 className="text-center text-2xl font-bold">
        Sign In
      </h1>

      <Form
        className="mx-auto flex w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        {/* Email */}
        <TextField
          isRequired
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>

          <Input
            name="email"
            type="email"
            placeholder="john@example.com"
          />

          <FieldError />
        </TextField>

        {/* Password */}
        <TextField isRequired type="password">
          <Label>Password</Label>

          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <Description>
            Enter your account password
          </Description>

          <FieldError />
        </TextField>

        {/* Login Button */}
        <div className="flex gap-2">
          <Button className="w-full" type="submit">
            <Check />
            Login
          </Button>
        </div>
      </Form>

      {/* Separator */}
      <div className="my-6 flex items-center gap-3 px-10">
        <Separator className="flex-1" />

        <span className="whitespace-nowrap text-sm text-gray-500">
          Or sign in with
        </span>

        <Separator className="flex-1" />
      </div>

      {/* Google Login */}
      <div className="px-10">
        <Button
          variant="outline"
          type="button"
          className="w-full rounded-none"
          onClick={handleGoogleSignUp}
        >
          <FaGoogle />
          Login with Google
        </Button>
      </div>
    </Card>
  );
}