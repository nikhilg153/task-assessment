"use client";
import React, { useState } from "react";
import { AuthService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { RegistrationForm } from "@/components/RegistrationForm";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleRegister = async (username: string, password: string) => {
    try {
      await AuthService.register(username, password);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col p-10 items-center">
      <div>
        <h1 className="text-3xl font-bold">Registration Page</h1>
        <RegistrationForm onRegister={handleRegister} />
        {error && <p className="font-medium  text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
