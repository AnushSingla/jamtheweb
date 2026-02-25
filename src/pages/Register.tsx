import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { API } from "../api";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  ArrowRight,
  User,
  Eye,
  EyeOff,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

/* =========================
   Interfaces
========================= */

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message?: string;
}

/* =========================
   Perks
========================= */

const perks: { icon: React.ElementType; text: string }[] = [
  { icon: Trophy, text: "Track live scores & sports highlights" },
  { icon: Users, text: "Join fan communities for every sport" },
  { icon: Zap, text: "Post & react to moments in real time" },
];

/* =========================
   Component
========================= */

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
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
      await API.post<RegisterResponse>("auth/register", form);

      toast.success("Account created! Welcome to MoneyOrbit.");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message?: string }>;

        const errorMsg =
          typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data?.message ||
              "Registration failed. Please try again.";

        toast.error(errorMsg);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#080a14" }}>
      

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
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

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[400px] rounded-2xl p-8 space-y-5">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-white">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm">
              It's free and only takes a minute
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username */}
            <Input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, username: e.target.value })
              }
              required
            />

            {/* Email */}
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            {/* Password */}
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;