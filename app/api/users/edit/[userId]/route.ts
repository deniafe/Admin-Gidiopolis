import { admin } from "@/lib/firebase";
import { handleError } from "@/utils/func";

const db = admin.firestore()
const auth = admin.auth();

interface IParams {
  userId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {

  try {
    const req = await request.json()

    const { displayName, email, password, isEnabled } = req;

    const { userId } = params

    if (!userId || !displayName || !email || isEnabled === undefined) {
      return Response.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Reference the specific user document in Firestore
    const userRef = db.collection('users').doc(userId);

    // Check if the user document exists
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return Response.json({ message:  'User not found' }, { status: 404 });
    }

    // Update the user's data in Authentication
    const updatedUserDetails =  password ? {
      email,
      password,
      displayName,
      disabled: !isEnabled,
    } : {
      email,
      displayName,
      disabled: !isEnabled,
    };

    await auth.updateUser(userId, updatedUserDetails);

    // Update the user's data in Firestore
    await userRef.update({
      displayName,
      email,
      isEnabled,
    });

    // Fetch the updated user data from Firestore
    const updatedUserDoc = await userRef.get();
    const updatedUserData = updatedUserDoc.data();
    if(updatedUserData) updatedUserData.uid = userId


    return Response.json({ user: updatedUserData }, { status: 201 });

  } catch (err) {
    console.log('there was an error adding user', err)
    return handleError(Response, err);
  }
}