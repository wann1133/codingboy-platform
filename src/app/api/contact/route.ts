import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, service, budget, timeline, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const referenceId = randomUUID();

    console.info('[contact] inquiry received', {
      referenceId,
      name,
      email,
      phone: phone ?? null,
      service: service ?? null,
      budget: budget ?? null,
      timeline: timeline ?? 'Not specified',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received. Tim kami akan menghubungi Anda segera.',
        referenceId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is active' },
    { status: 200 }
  );
}
