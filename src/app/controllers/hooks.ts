import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const createDocument = async (collectionName: string, data: unknown) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (err) {
    console.error("Error adding document: ", err);
  }
};

export const readDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents: unknown[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    console.log('here', documents)
    return documents;
  } catch (error) {
    console.error("Error reading documents: ", error);
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedData: any
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
  } catch (err) {
    console.error("Error updating document: ", err);
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef)
  } catch (err) {
    console.error("Error deleting document: ", err);
  }
};
