import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phone,
      service,
      budget,
      timeline,
      message
    } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Save inquiry to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || null,
        budget: budget || null,
        message: `Timeline: ${timeline || 'Not specified'}\n\n${message}`,
        status: 'NEW'
      }
    });

    // Here you could add email notification logic
    // For example, send email to admin or client

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully',
        inquiryId: inquiry.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  );
}