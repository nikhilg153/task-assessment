"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleLogin = async (username: string, password: string) => {
    try {
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col p-10 items-center">
      <div>
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <h3 className="text-slate-400">Login to continue</h3>
        <h5 className="text-slate-400">
          Doesn't have an account yet?
          <span
            onClick={() => router.push("/registration")}
            className="text-yellow-700 hover:underline cursor-pointer"
          >
            Register
          </span>{" "}
        </h5>
        <LoginForm onLogin={handleLogin} />
        {error && <p className="font-medium  text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
