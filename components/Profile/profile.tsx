"use client";

import { logOut } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearIsAuthenticated();
      router.push("/login");
    }
  };

  return (
    <ul>
      <li>
        <p>Username: {user?.username}</p>
      </li>
      <li>
        <p>Email: {user?.email}</p>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
}
