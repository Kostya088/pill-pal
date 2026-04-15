"use client";

import { register, RegisterRequest } from "@/lib/api/clientApi";
import css from "./register.module.css";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);

      if (!res) {
        setError("Invalid email or password");
      }

      setUser(res);
      router.replace("/medicine");
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
      );
    }
  };
  return (
    <main>
      <form action={handleSubmit} className={css.registerForm}>
        <label className={css.label}>
          Email
          <input type="email" name="email" required className={css.input} />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            required
            className={css.input}
          />
        </label>
        <button type="submit" className={css.registerButton}>
          Register
        </button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
