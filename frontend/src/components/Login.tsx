"use client";

import React, { useState } from "react";

import { useLogin } from "@/hooks/mutations/auth/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = async () => {
    try {
      await loginMutation.mutateAsync({ email, password });
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert("Login failed.");
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSubmit} disabled={loginMutation.isPending}>
        Login
      </button>
    </div>
  );
};

export default Login;
