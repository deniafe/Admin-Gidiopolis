import { admin } from "@/lib/firebase";

const db = admin.firestore()

export async function GET() {
  try {
    const eventsRef = db.collection('events');
    const snapshot = await eventsRef.get();
    
    const eventList: any[] = [];
    
    snapshot.forEach((doc) => {
      const eventData = doc.data();
      eventData.uid = doc.id;
      eventList.push(eventData);
    });
    
    // Sort the eventList based on the isApproved field
    eventList.sort((a, b) => {
      // Assuming isApproved is a boolean field
      const isApprovedA = a.isApproved || false;
      const isApprovedB = b.isApproved || false;
    
      // Sort in descending order, so true (approved) comes first
      return isApprovedA - isApprovedB;
    });
    // Send the list of users as JSON response
    return Response.json({ eventList }, { status: 200 });

  } catch (err) {
    return handleError(Response, err);
  }
}


function handleError(res: any, err: any) {
  return res.json({ message: `${err.code} - ${err.message}` }, { status: 500 });
}