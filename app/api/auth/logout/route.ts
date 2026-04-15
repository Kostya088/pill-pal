import { cookies } from "next/headers";
import { api } from "../../api";
import { NextResponse } from "next/server";
import { ApiError } from "../../api";

export async function POST() {
  const cookieStore = await cookies();

  try {
    await api.post("auth/logout", undefined, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("sessionId");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).response?.status ?? 500 },
    );
  }
}
