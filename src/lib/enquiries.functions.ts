import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquiryInput = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(6).max(20),
  courseInterest: z.string().max(80).optional(),
  message: z.string().trim().min(10).max(1000),
  sourcePage: z.string().max(200).optional(),
});

const RECIPIENT = "info@geekxunited.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquiryInput.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 1) Save to DB
    const { error: insertError } = await supabaseAdmin.from("enquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      course_interest: data.courseInterest ?? null,
      message: data.message,
      source_page: data.sourcePage ?? null,
    });
    if (insertError) {
      console.error("[enquiry] insert failed", insertError);
      throw new Error("Could not save your enquiry. Please try again.");
    }

    // 2) Enqueue notification email to the GeekX team
    const subject = `New enquiry from ${data.name}`;
    const textBody = [
      `New enquiry received from the GeekX United website.`,
      ``,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Course interest: ${data.courseInterest ?? "—"}`,
      `Source page: ${data.sourcePage ?? "—"}`,
      ``,
      `Message:`,
      data.message,
    ].join("\n");

    const htmlBody = `
      <div style="font-family:Inter,Arial,sans-serif;color:#0f172a;line-height:1.55">
        <h2 style="margin:0 0 12px">New enquiry — GeekX United</h2>
        <table style="border-collapse:collapse;font-size:14px">
          <tr><td style="padding:4px 12px 4px 0;color:#64748b">Name</td><td><strong>${escapeHtml(data.name)}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#64748b">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#64748b">Phone</td><td>${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#64748b">Course interest</td><td>${escapeHtml(data.courseInterest ?? "—")}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#64748b">Source page</td><td>${escapeHtml(data.sourcePage ?? "—")}</td></tr>
        </table>
        <h3 style="margin:20px 0 6px">Message</h3>
        <p style="white-space:pre-wrap;background:#f8fafc;padding:12px 14px;border-radius:8px;border:1px solid #e2e8f0">${escapeHtml(data.message)}</p>
      </div>
    `;

    try {
      const { error: emailError } = await supabaseAdmin.rpc("enqueue_email", {
        p_queue: "transactional_emails",
        p_payload: {
          to: RECIPIENT,
          reply_to: data.email,
          subject,
          html: htmlBody,
          text: textBody,
        },
      });
      if (emailError) {
        // Non-fatal — enquiry is already saved.
        console.error("[enquiry] email enqueue failed", emailError);
      }
    } catch (err) {
      console.error("[enquiry] email enqueue threw", err);
    }

    return { ok: true as const };
  });
