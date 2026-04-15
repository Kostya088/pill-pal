import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";
import { parse } from "cookie";

export async function POST() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  if (accessToken && sessionId) {
    try {
      await api.get("/auth/me", {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      return NextResponse.json({ success: true });
    } catch {}
  }

  if (refreshToken && sessionId) {
    try {
      const apiRes = await api.post("/auth/refresh", undefined, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

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

          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);

          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);

          if (parsed.sessionId)
            cookieStore.set("sessionId", parsed.sessionId, options);
        }

        return NextResponse.json({ success: true });
      }
    } catch {
      return NextResponse.json({ success: false });
    }
  }

  return NextResponse.json({ success: false });
}
