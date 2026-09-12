import { Router, type IRouter } from "express";
import {
  SubmitContactBody,
  SubmitContactResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();
const recipients = [
  "utkarshpandeyprople@gmail.com",
  "utkarshpandeypropl@gmail.com",
];

const errorResponse = (error: string) => ({ error });

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact form");
    res.status(400).json(errorResponse(parsed.error.message));
    return;
  }

  const { name, email, message } = parsed.data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: "Utkarsh Pandey Portfolio <onboarding@resend.dev>",
        to: recipients,
        reply_to: email,
        subject: `[Portfolio] New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <h2>New portfolio message</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr />
          <p>${safeMessage}</p>
        `,
      }),
    });

    if (!providerResponse.ok) {
      const providerError = await providerResponse.text();
      req.log.error(
        { status: providerResponse.status, providerError: providerError.slice(0, 500) },
        "Resend rejected contact message",
      );
      res
        .status(502)
        .json(errorResponse("The email provider rejected the message."));
      return;
    }

    res.json(
      SubmitContactResponse.parse({
        sent: true,
        message: "Message sent successfully.",
      }),
    );
  } catch (error) {
    req.log.error({ err: error }, "Unable to send contact message");
    res
      .status(502)
      .json(errorResponse("Unable to send the message right now."));
  }
});

export default router;