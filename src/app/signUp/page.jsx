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

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const image = formData.get("image") || "";
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Name:", name);
    console.log("Image:", image);
    console.log("Email:", email);

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      callbackURL: "/",
    });

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
      toast.error(error.message || "Sign up failed");
      return;
    }

    toast.success("Sign up successful!");

    router.push("/");
    router.refresh();
  };

  const handleGoogleSignUp = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    console.log("Google data:", data);
    console.log("Google error:", error);

    if (error) {
      toast.error(error.message || "Google sign up failed");
    }
  };

  return (
    <Card className="mx-auto mt-10 w-[500px] border py-10">
      <h1 className="text-center text-2xl font-bold">
        Sign Up
      </h1>

      <Form
        className="mx-auto flex w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        {/* Name */}
        <TextField isRequired type="text">
          <Label>Name</Label>

          <Input
            name="name"
            placeholder="Enter your name"
          />

          <FieldError />
        </TextField>

        {/* Image */}
        <TextField type="text">
          <Label>Image URL</Label>

          <Input
            name="image"
            placeholder="Image URL (optional)"
          />

          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                value
              )
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
        <TextField
          isRequired
          minLength={8}
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>

          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
        </TextField>

        {/* Create Account Button */}
        <Button
          className="w-full rounded-none"
          type="submit"
        >
          <Check />
          Create Account
        </Button>
      </Form>

      {/* Divider */}
      <div className="my-3 flex items-center gap-3 px-10">
        <Separator className="flex-1" />

        <span className="whitespace-nowrap text-sm text-gray-500">
          Or sign up with
        </span>

        <Separator className="flex-1" />
      </div>

      {/* Google Signup */}
      <div className="px-10">
        <Button
        variant="outline"
          type="button"
          className="w-full rounded-none"
          onPress={handleGoogleSignUp}
        >
        <FaGoogle/>  Login with Google
        </Button>
      </div>
    </Card>
  );
}