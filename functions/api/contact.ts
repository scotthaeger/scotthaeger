// Cloudflare Pages Function: POST /api/contact
// Validates the form and emails it through Resend.
// Required env (Cloudflare Pages -> Settings -> Variables and Secrets):
//   RESEND_API_KEY (secret), CONTACT_TO (recipient), CONTACT_FROM (optional sender)

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: real users never fill this. Pretend success so bots move on.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json({ ok: true });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || name.length > 100) return json({ error: "Please enter your name." }, 400);
  if (!EMAIL_RE.test(email) || email.length > 200)
    return json({ error: "Please enter a valid email address." }, 400);
  if (message.length < 5 || message.length > 5000)
    return json({ error: "Message must be between 5 and 5000 characters." }, 400);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    return json({ error: "Contact form is not configured yet." }, 503);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM || "Site contact <onboarding@resend.dev>",
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Site contact from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) return json({ error: "Could not send your message. Please try again later." }, 502);
  return json({ ok: true });
};
