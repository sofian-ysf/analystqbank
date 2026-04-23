import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: Params) {
  try {
    const { id } = await context.params;
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching email template:', error);
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ template: data });
  } catch (error: any) {
    console.error('Error in get email template API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: Params) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, slug, subject_template, body_template, variables } = body;

    const supabase = createAdminClient();

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (subject_template !== undefined) updateData.subject_template = subject_template;
    if (body_template !== undefined) updateData.body_template = body_template;
    if (variables !== undefined) updateData.variables = variables;

    const { data, error } = await supabase
      .from('email_templates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating email template:', error);
      return NextResponse.json(
        { error: 'Failed to update template', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ template: data });
  } catch (error: any) {
    console.error('Error in update email template API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: Params) {
  try {
    const { id } = await context.params;
    const supabase = createAdminClient();

    const { error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting email template:', error);
      return NextResponse.json(
        { error: 'Failed to delete template', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in delete email template API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}