import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
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
          Login
        </button>
      </div>
    </form>
  );
};
