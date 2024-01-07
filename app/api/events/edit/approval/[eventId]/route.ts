import { admin } from "@/lib/firebase";
import { handleError } from "@/utils/func";

const db = admin.firestore()

interface IParams {
  eventId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {

  try {
    const req = await request.json()

    const { isApproved } = req;

    const { eventId } = params

    if (!eventId || !isApproved === undefined) {
      return Response.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Reference the specific event document in Firestore
    const eventRef = db.collection('events').doc(eventId);

    // Check if the event document exists
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return Response.json({ message: 'Event not found' }, { status: 404 });
    }

    // Update the event's isApproved field in Firestore
    await eventRef.update({ isApproved });

    // Fetch the updated event data from Firestore
    const updatedEventDoc = await eventRef.get();
    const updatedEventData = updatedEventDoc.data();

    

    return Response.json({
      message: 'Event approval status updated successfully',
      event: updatedEventData,
     }, { status: 201 });

  } catch (err) {
    console.log('there was an error with event approval', err)
    return handleError(Response, err);
  }
}