import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navigation}>

          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/notes">Notes</Link>
          </li>

          <AuthNavigation />

        </ul>
      </nav>
    </header>
  );
}