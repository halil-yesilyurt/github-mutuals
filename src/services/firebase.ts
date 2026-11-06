import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/** User-owned analytics only: unauthenticated searches are never stored. */
export async function saveSearch(username: string, userId: string): Promise<void> {
  await addDoc(collection(db, 'searches'), {
    username: username.trim().slice(0, 39),
    userId,
    timestamp: serverTimestamp(),
  });
}
