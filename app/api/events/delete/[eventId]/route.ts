import { admin } from "@/lib/firebase";
import { handleError } from "@/utils/func";

const db = admin.firestore()

interface IParams {
  eventId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {

  try {

    const { eventId } = params

    if (!eventId) {
      return Response.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Reference the specific event document in Firestore
    const eventRef = db.collection('events').doc(eventId);

    // Check if the event document exists
    const eventDoc = await eventRef.get();
    if (!eventDoc.exists) {
      return Response.json({ message: 'Event not found' }, { status: 404 });
    }

    // Delete the event's document from Firestore
    await eventRef.delete();

    return Response.json({}, { status: 200 });

  } catch (err) {
    console.log('there was an error with event approval', err)
    return handleError(Response, err);
  }
}