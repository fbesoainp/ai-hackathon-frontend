"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signInWithGoogle } from "@/integrations/auth";
import { auth } from "@/integrations/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (err: any) {
      setError("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (name) {
        await updateProfile(user, { displayName: name });
      }
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 mt-2">
      {/* Header */}
      <div className="flex flex-col items-start gap-[0.875rem] w-90">
        <h1 className="text-white text-[2.5rem] font-normal leading-[2.5rem] tracking-[-0.01875rem]">
          Get started.
        </h1>
        <p className="text-white text-[1rem] font-light leading-normal tracking-[0.0175rem]">
          Enter the information to create an account.
        </p>
      </div>

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="relative mt-[2.75rem] flex items-center justify-center w-80 h-[3rem] bg-white rounded-[2rem] border border-[#dadce0] disabled:opacity-50"
        disabled={isLoading}
      >
        <div className="absolute left-3.5">
          <Image
            src="/icons/google.svg"
            alt="Google"
            width={28}
            height={28}
          />
        </div>
        <span className="text-[#3C4043] text-[1rem] font-medium leading-[1.0625rem] tracking-[0.01563rem]">
          Sign in with Google
        </span>
      </button>

      {/* Divider */}
      <div className="flex items-center justify-center w-[23rem] mt-[2.2rem]">
        <div className="flex-1 h-[1px] bg-[#a09d9d]" />
        <span className="mx-4 text-[#a09d9d] text-[1rem] font-medium leading-[1.0625rem] tracking-[0.01563rem]">
          or
        </span>
        <div className="flex-1 h-[1px] bg-[#a09d9d]" />
      </div>

      {/* Error Message */}
      {error ? (
        <p className="mt-2 text-red-500 text-center w-[23rem]">
          {error}
        </p>
      ) : (
        <div className="w-[23rem] h-[1rem] mt-2" />
      )}

      {/* Form Fields */}
      <div className="flex flex-col items-center gap-[1.75rem] w-[23rem] mt-4">
        {/* Name */}
        <div className="flex flex-col items-start gap-[0.8125rem] w-full">
          <label className="text-white text-[15px] font-bold">
            Name
          </label>
          <input
            type="text"
            placeholder="John"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[3.5rem] px-[1.5rem] py-[0.75rem] bg-white rounded-[0.625rem] text-[1.2rem] font-[450] text-black placeholder:text-[#D9D9D9]"
          />
        </div>
        {/* Email */}
        <div className="flex flex-col items-start gap-[0.8125rem] w-full">
          <label className="text-white text-[15px] font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[3.5rem] px-[1.5rem] py-[0.75rem] bg-white rounded-[0.625rem] text-[1.2rem] font-[450] text-black placeholder:text-[#D9D9D9]"
          />
        </div>
        {/* Password */}
        <div className="flex flex-col items-start gap-[0.8125rem] w-full">
          <label className="text-white text-[15px] font-bold">
            Password
          </label>
          <input
            type="password"
            placeholder="***"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[3.5rem] px-[1.5rem] py-[0.75rem] bg-white rounded-[0.625rem] text-[1.2rem] font-[450] text-black placeholder:text-[#D9D9D9]"
          />
        </div>
      </div>

      {/* Login Link */}
      <button
        type="button"
        className="mt-[1rem] text-white text-[1rem] font-light leading-normal tracking-[0.0175rem] underline"
      >
        Already have an account? Log In
      </button>

      {/* Confirm Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={handleEmailSignUp}
        className={`mt-[5rem] w-[23rem] h-[4.5rem] flex items-center justify-center rounded-[0.625rem] ${
          isLoading ? "bg-gray-600" : "bg-black"
        }`}
      >
        <span className="text-[#D9D9D9] text-[16px] font-bold">
          {isLoading ? "Loading..." : "Confirm"}
        </span>
      </button>
    </div>
  );
}