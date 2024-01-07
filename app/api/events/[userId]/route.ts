import { admin } from "@/lib/firebase";

const db = admin.firestore()

interface IParams {
  userId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params

    if (!userId) {
      return Response.json({ message: 'Missing userId in query parameter' }, { status: 400 });
    }


    // Reference the 'events' collection in Firestore
    const eventsRef = db.collection('events');

    // Query events where the 'userId' field matches the provided 'userId'
    const querySnapshot = await eventsRef.where('userId', '==', userId).get();

    // Initialize an array to store event data
    const userEvents: any[] = [];

    // Loop through the documents and extract event data
    querySnapshot.forEach((doc) => {
      const eventData = doc.data();
      // Include the event ID from the Firestore document
      eventData.uid = doc.id;
      userEvents.push(eventData);
    });

    // Send the list of users events as JSON response
    return Response.json({ userEvents }, { status: 200 });

  } catch (err) {
    console.log('there was an error getting events', err)
    return handleError(Response, err);
  }
}


function handleError(res: any, err: any) {
  return res.json({ message: `${err.code} - ${err.message}` }, { status: 500 });
}