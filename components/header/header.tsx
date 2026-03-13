import Link from "next/link";
import css from "./header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <ul className={css.headerList}>
        <li>
          <Link href="/" className={css.name}>
            Medical Chest
          </Link>
        </li>
        <li>
          <Link href="/addNew" className={css.addNew}>
            Add new medicine +
          </Link>
        </li>
      </ul>
    </header>
  );
}
