import { cookies } from "next/headers";
import { api, ApiError } from "../../api";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get("/auth/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    const apiError = error as ApiError;
    const status = apiError.response?.status ?? 500;

    return NextResponse.json(
      {
        error: apiError.response?.data?.error ?? apiError.message,
      },
      { status },
    );
  }
}
