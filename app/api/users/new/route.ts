import { Timestamp, admin } from "@/lib/firebase";
import { handleError } from "@/utils/func";

const db = admin.firestore()
const auth = admin.auth();

export async function POST(request: Request) {

  try {
    const req = await request.json()

    const { displayName, email, password, isEnabled } = req;

    if (!displayName || !password || !email || isEnabled === undefined) {
      return Response.json({ message: 'Missing fields' }, { status: 400 });
    }

    const userDetails = {
      email,
      password,
      displayName,
      disabled: !isEnabled,
    };

    const userRecord = await auth.createUser(userDetails);

    // Add user details to Firestore
    const userRef = db.collection('users').doc(userRecord.uid);
    const timestamp = Timestamp.now();
    await userRef.set({
      displayName,
      email,
      isEnabled,
      createdAt: timestamp
    });

    const userResponse = {
      uid: userRecord.uid,
      displayName: userRecord.displayName,
      email: userRecord.email,
      isEnabled: !userRecord.disabled,
      createdAt: timestamp,
    };

    return Response.json({ user: userResponse }, { status: 201 });

  } catch (err) {
    console.log('there was an error adding user', err)
    return handleError(Response, err);
  }
}