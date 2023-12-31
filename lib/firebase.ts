import admin from 'firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY as string
  )

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}



export { admin, Timestamp };
