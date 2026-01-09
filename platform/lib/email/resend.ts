/**
 * Resend 邮件发送服务
 */
import { Resend } from "resend";

if (!process.env.AUTH_RESEND_KEY) {
  throw new Error("AUTH_RESEND_KEY environment variable is not set");
}

if (!process.env.AUTH_EMAIL_FROM) {
  throw new Error("AUTH_EMAIL_FROM environment variable is not set");
}

const resend = new Resend(process.env.AUTH_RESEND_KEY);

/**
 * 发送验证码邮件
 */
export async function sendVerificationCodeEmail(
  email: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: process.env.AUTH_EMAIL_FROM!,
      to: email,
      subject: "Your WorkWrap Verification Code",
      html: getVerificationEmailHTML(code),
      text: getVerificationEmailText(code),
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "errors.emailSendFailed",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: "errors.emailSendFailed",
    };
  }
}

/**
 * 验证码邮件 HTML 模板
 * Professional, clear, and accessible email design
 */
function getVerificationEmailHTML(code: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your WorkWrap Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #0f172a;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 32px; text-align: center; background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">WorkWrap</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #0f172a; line-height: 1.3;">Verification Code</h2>
              <p style="margin: 0 0 32px; font-size: 16px; color: #475569; line-height: 1.6;">Please use the following code to complete your sign-in:</p>
              
              <!-- Verification Code Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 0 0 32px;">
                    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%); border: 2px solid #0ea5e9; border-radius: 12px; padding: 32px 24px; display: inline-block;">
                      <div style="font-size: 42px; font-weight: 700; letter-spacing: 12px; color: #0ea5e9; font-family: 'Courier New', 'Monaco', 'Menlo', monospace; line-height: 1.2; text-align: center;">
                        ${code}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Instructions -->
              <div style="background-color: #f8fafc; border-left: 4px solid #0ea5e9; padding: 16px 20px; border-radius: 6px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.5;">
                  <strong style="color: #0f172a;">Important:</strong> This code will expire in 5 minutes. Do not share this code with anyone.
                </p>
              </div>
              
              <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                If you didn't request this code, you can safely ignore this email. Your account remains secure.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #f8fafc; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.5;">
                This is an automated message. Please do not reply to this email.
              </p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.5;">
                © ${new Date().getFullYear()} WorkWrap. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * 验证码邮件纯文本模板
 * Plain text version for email clients that don't support HTML
 */
function getVerificationEmailText(code: string): string {
  return `
WorkWrap Verification Code

Your verification code is: ${code}

This code will expire in 5 minutes. Do not share this code with anyone.

If you didn't request this code, you can safely ignore this email. Your account remains secure.

This is an automated message. Please do not reply to this email.

© ${new Date().getFullYear()} WorkWrap. All rights reserved.
  `.trim();
}
