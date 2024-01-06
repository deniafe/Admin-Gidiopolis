import { NextResponse } from "next/server";

import { admin } from "@/lib/firebase";


export async function GET() {

  const db = admin.firestore();
  const dataRef = db.collection('users');

  try {
    const snapshot = await dataRef.get();
    const data = snapshot.docs.map(doc => doc.data());

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error getting documents', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  
}