"use client";

import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./page.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await register({ email, password });
      router.push("/profile");
    } catch {
      setError("Registration error");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label>Email</label>
          <input name="email" type="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label>Password</label>
          <input name="password" type="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button className={css.submitButton}>Register</button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}