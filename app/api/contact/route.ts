import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateContactForm } from '@/lib/utils';
import type { ContactFormData, ApiResponse } from '@/lib/types';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

/**
 * POST /api/contact
 */
export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate data
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Validation failed',
          error: Object.values(validation.errors).join(', '),
        },
        { status: 400 }
      );
    }


    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtpout.secureserver.net
      port: Number(process.env.SMTP_PORT), // 587
      secure: false, // MUST be false for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as SMTPTransport.Options);


    const submittedAt = new Date().toISOString();

    // Email content (styled HTML)
    await transporter.sendMail({
      from: `"Gurudev Engicon" <official@gurudevengicon.com>`,
      to: 'official@gurudevengicon.com',
      subject: `New Contact Message from ${body.name}`,
      html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background:#0f172a; padding:32px; color:#0f172a;">
            <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; box-shadow:0 20px 50px rgba(0,0,0,0.12); overflow:hidden;">
              <div style="background:#1a365d; padding:20px 24px; color:#ffffff;">
                <div style="font-size:12px; letter-spacing:1px; text-transform:uppercase; opacity:0.8;">New Contact</div>
                <div style="font-size:22px; font-weight:700; margin-top:6px;">Project inquiry from ${body.name
        }</div>
                <div style="margin-top:6px; font-size:14px; color:rgba(255,255,255,0.8);">Submitted at ${submittedAt}</div>
              </div>

              <div style="padding:24px;">
                <p style="margin:0 0 16px; font-size:16px; color:#0f172a;">${body.name
        } shared a new message via the Gurudev Engicon website.</p>

                <div style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden;">
                  <div style="display:flex; border-bottom:1px solid #e5e7eb; background:#f8fafc;">
                    <div style="flex:1; padding:12px 14px; border-right:1px solid #e5e7eb;">
                      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.6px; color:#6b7280;">Name</div>
                      <div style="font-size:16px; font-weight:600; color:#0f172a;">${body.name
        }</div>
                    </div>
                    <div style="flex:1; padding:12px 14px;">
                      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.6px; color:#6b7280;">Email</div>
                      <div style="font-size:16px; font-weight:600; color:#0f172a;">${body.email
        }</div>
                    </div>
                  </div>
                  <div style="display:flex;">
                    <div style="flex:1; padding:12px 14px; border-right:1px solid #e5e7eb;">
                      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.6px; color:#6b7280;">Phone</div>
                      <div style="font-size:16px; font-weight:600; color:#0f172a;">${body.phone || 'Not provided'
        }</div>
                    </div>
                    <div style="flex:1; padding:12px 14px;">
                      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.6px; color:#6b7280;">Submitted</div>
                      <div style="font-size:16px; font-weight:600; color:#0f172a;">${submittedAt}</div>
                    </div>
                  </div>
                </div>

                <div style="margin-top:18px;">
                  <div style="font-size:13px; text-transform:uppercase; letter-spacing:0.8px; color:#6b7280; margin-bottom:6px;">Message</div>
                  <div style="padding:14px; border:1px solid #e5e7eb; border-radius:10px; background:#f8fafc; color:#0f172a; line-height:1.6; white-space:pre-wrap;">${body.message
        }</div>
                </div>

                <div style="margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;">
                  <span style="display:inline-flex; align-items:center; gap:6px; padding:8px 12px; border-radius:999px; background:rgba(217,119,6,0.12); color:#b45309; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.8px;">Infrastructure Inquiry</span>
                  <span style="display:inline-flex; align-items:center; gap:6px; padding:8px 12px; border-radius:999px; background:rgba(26,54,93,0.1); color:#1a365d; font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.8px;">Website Form</span>
                </div>
              </div>

              <div style="padding:16px 24px; background:#0f172a; color:rgba(255,255,255,0.75); font-size:13px;">
                Gurudev Engicon Pvt. Ltd · Highways · Flyovers · Bridges
              </div>
            </div>
          </div>
        `,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: 'Your message has been sent successfully!',
        data: { submittedAt: new Date().toISOString() },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: 'An error occurred while sending your message',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 */
export async function GET() {
  return NextResponse.json({
    message: 'Contact API endpoint (SMTP configured)',
    methods: ['POST'],
    version: '2.0.0',
  });
}
