import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching email templates:', error);
      return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
    }

    return NextResponse.json({ templates: data });
  } catch (error: any) {
    console.error('Error in email templates API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, subject_template, body_template, variables } = body;

    if (!name || !slug || !subject_template || !body_template) {
      return NextResponse.json(
        { error: 'name, slug, subject_template, and body_template are required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('email_templates')
      .insert({
        name,
        slug,
        subject_template,
        body_template,
        variables: variables || []
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating email template:', error);
      return NextResponse.json(
        { error: 'Failed to create template', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ template: data }, { status: 201 });
  } catch (error: any) {
    console.error('Error in create email template API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}