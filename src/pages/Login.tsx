import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "@/api";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Trophy, Users, Zap } from "lucide-react";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const features: { icon: React.ElementType; text: string }[] = [
  { icon: Trophy, text: "Follow live match scores & highlights" },
  { icon: Users, text: "Connect with sports fans worldwide" },
  { icon: Zap, text: "Share and discuss moments in real time" },
];

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post<LoginResponse>("auth/login", form);

      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back to HuddleUp!");
      navigate("/index");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      const errorMsg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message ||
            "Login failed. Invalid credentials.";

      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#080a14" }}>
      

      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0c0e1f 0%, #0f1528 40%, #0b1933 100%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
            }}
          >
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-wide">
            MoneyOrbit
          </span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10"
        style={{ background: "#080a14" }}
      >
        <div
          className="w-full max-w-[400px] rounded-2xl p-8 space-y-6"
          style={{
            background: "rgba(20,24,40,0.85)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#6b7280" }}
              >
                Password
              </Label>

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            {/* Submit */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;