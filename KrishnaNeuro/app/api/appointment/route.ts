import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/appointment-schema";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_ATTEMPTS) return false;
  current.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, message: "Too many requests. Please wait a few minutes or call the clinic." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Please review the highlighted details.", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const reference = `KN-${new Date().toISOString().slice(2, 10).replaceAll("-", "")}-${randomUUID().slice(0, 6).toUpperCase()}`;
  const webhook = process.env.APPOINTMENT_WEBHOOK_URL;
  let delivered = false;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.APPOINTMENT_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.APPOINTMENT_WEBHOOK_SECRET}` } : {}),
        },
        body: JSON.stringify({ reference, submittedAt: new Date().toISOString(), source: "website", appointment: parsed.data }),
        signal: AbortSignal.timeout(8_000),
        cache: "no-store",
      });
      delivered = response.ok;
    } catch {
      delivered = false;
    }
  }

  return NextResponse.json({
    ok: true,
    reference,
    delivery: delivered ? "webhook" : "whatsapp",
    message: delivered
      ? "Your request was received. The clinic will confirm availability."
      : "Your request is prepared. Send it on WhatsApp to deliver it to the clinic.",
  });
}
