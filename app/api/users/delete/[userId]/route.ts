import { admin } from "@/lib/firebase";
import { handleError } from "@/utils/func";

const db = admin.firestore()
const auth = admin.auth();

interface IParams {
  userId?: string;
}

export async function DELETE(request: Request,{ params }: { params: IParams }) {

  try {

    const { userId } = params

    if (!userId) {
      return Response.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Reference the specific user document in Firestore
    const userRef = db.collection('users').doc(userId);

    // Check if the user document exists
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return Response.json({ message:  'User not found' }, { status: 404 });
    }

     // Delete the user's document from Firestore
     await userRef.delete();

     // Delete the user from Firebase Authentication
     await auth.deleteUser(userId);

    return Response.json({ }, { status: 200 });

  } catch (err) {
    console.log('there was an error adding user', err)
    return handleError(Response, err);
  }
}