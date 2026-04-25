import { NextRequest, NextResponse } from 'next/server';
import { generateReplyEmail } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userData, originalMessage, threadId } = body;

    if (!userData?.name || !userData?.email) {
      return NextResponse.json(
        { error: 'userData.name and userData.email are required' },
        { status: 400 }
      );
    }

    if (!originalMessage?.body) {
      return NextResponse.json(
        { error: 'originalMessage.body is required' },
        { status: 400 }
      );
    }

    const email = await generateReplyEmail(userData, originalMessage);

    return NextResponse.json({ email });
  } catch (error: any) {
    console.error('Error generating email reply:', error);
    return NextResponse.json(
      { error: 'Failed to generate email reply', details: error.message },
      { status: 500 }
    );
  }
}