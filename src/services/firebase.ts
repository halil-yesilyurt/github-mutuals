import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function saveSearch(username: string, userId?: string, userAgent?: string, referrer?: string) {
  await addDoc(collection(db, 'searches'), {
    username,
    timestamp: Timestamp.now(),
    userId: userId || null,
    userAgent: userAgent || null,
    referrer: referrer || null,
  });
} 