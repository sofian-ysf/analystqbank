import { NextRequest, NextResponse } from 'next/server';
import { generateEmailContent } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateName, userData, customInstructions } = body;

    if (!templateName || !userData) {
      return NextResponse.json(
        { error: 'templateName and userData are required' },
        { status: 400 }
      );
    }

    if (!userData.name || !userData.email) {
      return NextResponse.json(
        { error: 'userData.name and userData.email are required' },
        { status: 400 }
      );
    }

    const email = await generateEmailContent(
      templateName,
      userData,
      customInstructions
    );

    return NextResponse.json({ email });
  } catch (error: any) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { error: 'Failed to generate email', details: error.message },
      { status: 500 }
    );
  }
}