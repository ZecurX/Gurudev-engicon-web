import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import { validateContactForm } from '@/lib/utils';
import type { ContactFormData, ApiResponse } from '@/lib/types';
import type SMTPTransport from "nodemailer/lib/smtp-transport";

/**
 * POST /api/contact
 * Handles contact form submissions + sends email using Gmail SMTP
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

    // Create transporter (Gmail SMTP with App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    } as SMTPTransport.Options);

    // Email content
    await transporter.sendMail({
      from: process.env.SMTP_USER!,
      to: process.env.SMTP_USER!, // send to your Gmail inbox
      subject: `New Contact Message from ${body.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${body.name}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Phone:</b> ${body.phone || 'Not provided'}</p>
        <p><b>Message:</b><br/>${body.message}</p>
        <hr />
        <p>Submitted at: ${new Date().toISOString()}</p>
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
