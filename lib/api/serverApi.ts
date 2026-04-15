import { cookies } from "next/headers";
import { nextServer } from "./api";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.post(
    "/auth/refresh",
    undefined,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return res;
};
