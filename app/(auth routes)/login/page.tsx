"use client";

import { useRouter } from "next/navigation";
import css from "./login.module.css";
import { useState } from "react";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { logIn, LogInRequest } from "@/lib/api/clientApi";

export default function LogIn() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LogInRequest;

      const res = await logIn(formValues);

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
      <form action={handleSubmit} className={css.logInForm}>
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
        <button type="submit" className={css.logInButton}>
          Log In
        </button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
