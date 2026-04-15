import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { parse } from "cookie";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await api.post("auth/register", body);
    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const sameSiteRaw = parsed.SameSite?.toLowerCase();
        const sameSite: "lax" | "strict" | "none" | undefined =
          sameSiteRaw === "lax" ||
          sameSiteRaw === "strict" ||
          sameSiteRaw === "none"
            ? sameSiteRaw
            : undefined;

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path ?? "/",
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          httpOnly: /(^|;)\s*HttpOnly\s*(;|$)/i.test(cookieStr),
          secure: /(^|;)\s*Secure\s*(;|$)/i.test(cookieStr),
          sameSite,
        };

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
        if (parsed.sessionId) {
          cookieStore.set("sessionId", parsed.sessionId, options);
        }
      }

      return NextResponse.json(apiRes.data);
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    const apiError = error as ApiError;
    const status = apiError.response?.status ?? 500;

    return NextResponse.json(
      {
        error:
          apiError.response?.data?.error ??
          apiError.message ??
          "Internal server error",
      },
      { status },
    );
  }
}
