import React, { useState } from "react";

interface RegistrationFormProps {
  onRegister: (username: string, password: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegister,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between space-y-4 mt-5">
        <h2 className="font-medium">Username</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 border border-amber-800 rounded-md"
        />
        <h2 className="font-medium">Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border border-amber-800 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-900 p-2 text-white rounded-sm hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </form>
  );
};
