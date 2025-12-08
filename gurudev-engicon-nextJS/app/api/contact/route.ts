import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/utils';
import type { ContactFormData, ApiResponse } from '@/lib/types';

/**
 * POST /api/contact
 * Handles contact form submissions
 * 
 * This is a Next.js API Route using the App Router
 * Server-side validation and processing
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ContactFormData = await request.json();

    // Validate form data
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

    // TODO: Integrate with your email service or database
    // Examples:
    // - Send email using Resend, SendGrid, or Nodemailer
    // - Store in database (Prisma, MongoDB, etc.)
    // - Send to CRM system
    
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
        data: {
          submittedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: 'An error occurred while processing your request',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Returns API information (optional)
 */
export async function GET() {
  return NextResponse.json({
    message: 'Contact API endpoint',
    methods: ['POST'],
    version: '1.0.0',
  });
}
