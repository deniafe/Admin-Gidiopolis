import { admin } from "@/lib/firebase";

const db = admin.firestore()

export async function GET() {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    const userList: any[] = [];

    snapshot.forEach((doc) => {
      const userData = doc.data();
      userData.uid = doc.id;
      userList.push(userData);
    });

    // Send the list of users as JSON response
    return Response.json({ userList }, { status: 200 });

  } catch (err) {
    return handleError(Response, err);
  }
}


function handleError(res: any, err: any) {
  return res.json({ message: `${err.code} - ${err.message}` }, { status: 500 });
}