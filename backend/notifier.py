import os
import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("portfolio.notifier")

SMTP_ENABLED = os.getenv("SMTP_ENABLED", "false").lower() in ("true", "1", "yes")
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL", SMTP_USER or "noreply@anujpathak.dev")
SMTP_TO_EMAIL = os.getenv("SMTP_TO_EMAIL", "pathakanuj322@gmail.com")
SMTP_TLS = os.getenv("SMTP_TLS", "true").lower() in ("true", "1", "yes")


def _send_email_sync(subject: str, text_body: str, html_body: str):
    """
    Synchronous SMTP delivery helper intended to run inside BackgroundTasks.
    """
    if not SMTP_ENABLED or not SMTP_HOST or not SMTP_USER:
        logger.info(
            f"[Notifier] Email notification skipped (SMTP_ENABLED={SMTP_ENABLED}). Subject: '{subject}'"
        )
        return

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SMTP_FROM_EMAIL
        msg["To"] = SMTP_TO_EMAIL

        part1 = MIMEText(text_body, "plain", "utf-8")
        part2 = MIMEText(html_body, "html", "utf-8")
        msg.attach(part1)
        msg.attach(part2)

        if SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=12)
        else:
            server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=12)
            if SMTP_TLS:
                server.starttls()

        if SMTP_PASSWORD:
            server.login(SMTP_USER, SMTP_PASSWORD)

        server.sendmail(SMTP_FROM_EMAIL, [SMTP_TO_EMAIL], msg.as_string())
        server.quit()
        logger.info(f"[Notifier] Email successfully sent to {SMTP_TO_EMAIL} with subject: '{subject}'")
    except Exception as exc:
        logger.warning(f"[Notifier] Could not send email alert via SMTP: {exc}")


def send_contact_notification(name: str, email: str, message: str, message_id: int):
    """
    Dispatches an email alert for a newly received contact message.
    """
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    subject = f"[Portfolio Contact #{message_id}] New Message from {name}"

    text_body = f"""New Contact Message Received!

Message ID: #{message_id}
Sender: {name}
Email: {email}
Time: {timestamp}

Message:
{message}
"""

    html_body = f"""
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; padding: 20px; color: #1e293b;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #6366f1, #a855f7); padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">New Contact Message Received</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Message ID #{message_id} &bull; {timestamp}</p>
          </div>
          <div style="padding: 24px;">
            <p style="margin-top: 0;"><strong>Sender Name:</strong> {name}</p>
            <p><strong>Email Address:</strong> <a href="mailto:{email}" style="color: #6366f1;">{email}</a></p>
            <div style="margin-top: 20px; padding: 16px; background: #f1f5f9; border-radius: 8px; border-left: 4px solid #6366f1;">
              <strong style="display: block; margin-bottom: 8px; font-size: 13px; color: #475569;">Message Content:</strong>
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">{message}</p>
            </div>
            <div style="margin-top: 24px;">
              <a href="mailto:{email}?subject=Re: Your inquiry on my portfolio" style="display: inline-block; padding: 10px 20px; background: #6366f1; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px;">Reply to {name}</a>
            </div>
          </div>
        </div>
      </body>
    </html>
    """

    _send_email_sync(subject, text_body, html_body)


def send_inquiry_notification(
    name: str,
    email: str,
    service_type: str,
    budget_range: str,
    timeline: str,
    details: str,
    inquiry_id: int,
):
    """
    Dispatches an email alert for a newly received project inquiry.
    """
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    subject = f"[Freelance Project Inquiry #{inquiry_id}] {service_type} from {name}"

    text_body = f"""New Freelance Project Inquiry Received!

Inquiry ID: #{inquiry_id}
Client: {name}
Email: {email}
Service Type: {service_type}
Budget: {budget_range}
Timeline: {timeline}
Time: {timestamp}

Project Details:
{details}
"""

    html_body = f"""
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; padding: 20px; color: #1e293b;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #10b981, #06b6d4); padding: 24px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">New Freelance Project Inquiry</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Inquiry ID #{inquiry_id} &bull; {timestamp}</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 130px;"><strong>Client Name:</strong></td>
                <td style="padding: 6px 0; font-weight: 600;">{name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 6px 0;"><a href="mailto:{email}" style="color: #06b6d4; font-weight: 600;">{email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Service Type:</strong></td>
                <td style="padding: 6px 0; font-weight: 600; color: #047857;">{service_type}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Budget Range:</strong></td>
                <td style="padding: 6px 0; font-weight: 600;">{budget_range}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Timeline:</strong></td>
                <td style="padding: 6px 0; font-weight: 600;">{timeline}</td>
              </tr>
            </table>

            <div style="padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #10b981;">
              <strong style="display: block; margin-bottom: 8px; font-size: 13px; color: #475569;">Project Scope &amp; Requirements:</strong>
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">{details}</p>
            </div>

            <div style="margin-top: 24px;">
              <a href="mailto:{email}?subject=Proposal for your {service_type} project" style="display: inline-block; padding: 10px 20px; background: #10b981; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px;">Reply to Client</a>
            </div>
          </div>
        </div>
      </body>
    </html>
    """

    _send_email_sync(subject, text_body, html_body)
