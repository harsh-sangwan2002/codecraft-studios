import { NextRequest, NextResponse } from 'next/server';
import dbConnect from './db';
import { createContact, getContacts } from './controller';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const contact = await createContact(data);
    return NextResponse.json({ success: true, contact });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const contacts = await getContacts();
    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
} 