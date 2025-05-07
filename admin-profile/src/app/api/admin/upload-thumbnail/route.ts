import { dbConnect } from '@/src/config/dbConnect';
import adminModel from '@/src/models/admin.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { thumbnail } = await req.json();

    const admin = await adminModel.findOne(); // First admin

    if (!admin) {
      return NextResponse.json({ success: false, message: 'No admin found' }, { status: 404 });
    }

    if (typeof thumbnail === 'string') {
      admin.thumbnail.push(thumbnail);
    } else if (Array.isArray(thumbnail)) {
      admin.thumbnail = thumbnail;
    } else {
      return NextResponse.json({ success: false, message: 'Invalid thumbnail format' }, { status: 400 });
    }

    await admin.save();

    return NextResponse.json({ success: true, admin });
  } catch (err) {
    console.error('Error uploading thumbnail:', err);
    return NextResponse.json({ success: false, message: 'Error uploading thumbnail' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const admin = await adminModel.findOne();
    if (!admin) {
      return NextResponse.json({ success: false, message: 'No admin found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, thumbnail: admin.thumbnail || [] });
  } catch (err) {
    console.error('Error fetching thumbnail:', err);
    return NextResponse.json({ success: false, message: 'Error fetching thumbnail' }, { status: 500 });
  }
}

export async function DELETE() {
  await dbConnect();

  try {
    const admin = await adminModel.findOne();
    if (!admin) {
      return NextResponse.json({ success: false, message: 'No admin found' }, { status: 404 });
    }

    admin.thumbnail = [];
    await admin.save();

    return NextResponse.json({ success: true, admin });
  } catch (err) {
    console.error('Failed to delete thumbnails:', err);
    return NextResponse.json({ success: false, message: 'Failed to delete thumbnails' }, { status: 500 });
  }
}
