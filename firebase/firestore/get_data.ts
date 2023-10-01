import { DocumentReference, DocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../config";


export async function getDocument(collection: string, id: string): Promise<{ data: any; error: any }> {
  const docRef: DocumentReference = doc(db, collection, id);

  let data: any = null;
  let error: any = null;

  try {
      const result: DocumentSnapshot = await getDoc(docRef);
      data = result.data();
      if (result.exists()) {
        console.log("Document data:", result.data());
      } else {
        console.log("No such document!!!!!!!!!!!!!!!!!!!!!!!!!!! impossible");
        error = 'No such document!!!!!!!!!!!!!!!!!!!!!!!!!!!';
        console.log("The error string", error);
      }
      
  } catch (e) {
      error = e;
  }

  return { data, error };
}