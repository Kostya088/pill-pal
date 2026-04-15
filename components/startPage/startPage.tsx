import Link from "next/link";
import css from "./startPage.module.css";

export default function StartPage() {
  return (
    <div className={css.auth}>
      <Link href="/login">Sign-in</Link>
      <Link href="/register">Sign-up</Link>
    </div>
  );
}
