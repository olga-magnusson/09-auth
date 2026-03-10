import { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";
import type { User } from "@/types/user";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile page",
};

export default async function ProfilePage() {
  let user: User | null = null;
  try {
    user = await getMe();
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "https://ac.goit.global/fullstack/react/avatar.jpg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}