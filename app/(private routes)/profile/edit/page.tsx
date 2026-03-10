"use client";

import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";
import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore(); 

  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updatedUser = await updateMe({ username }); 
      setUser(updatedUser); 
      router.push("/profile"); 
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || "https://ac.goit.global/fullstack/react/avatar.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}