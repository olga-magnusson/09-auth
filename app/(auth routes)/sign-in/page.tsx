"use client";

import { login } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./page.module.css";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login({ email, password });
      router.push("/profile");
    } catch {
      setError("Login error");
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label>Email</label>
          <input name="email" type="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label>Password</label>
          <input name="password" type="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button className={css.submitButton}>Log in</button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}