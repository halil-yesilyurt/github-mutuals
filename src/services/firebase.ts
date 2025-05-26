import { collection, addDoc, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { SearchRecord } from '../types';

export class FirebaseService {
  private readonly searchCollection = 'searches';

  async saveSearch(username: string, userId?: string): Promise<void> {
    try {
      await addDoc(collection(db, this.searchCollection), {
        username,
        timestamp: new Date(),
        userId: userId || null
      });
    } catch (error) {
      console.error('Error saving search record:', error);
      throw new Error('Failed to save search record');
    }
  }

  async getRecentSearches(userId?: string, limitCount: number = 10): Promise<SearchRecord[]> {
    try {
      let q;
      
      if (userId) {
        // Get user-specific searches
        q = query(
          collection(db, this.searchCollection),
          where('userId', '==', userId),
          orderBy('timestamp', 'desc'),
          limit(limitCount)
        );
      } else {
        // Get global recent searches
        q = query(
          collection(db, this.searchCollection),
          orderBy('timestamp', 'desc'),
          limit(limitCount)
        );
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      } as SearchRecord));
    } catch (error) {
      console.error('Error fetching recent searches:', error);
      return [];
    }
  }

  async getGlobalRecentSearches(limitCount: number = 10): Promise<SearchRecord[]> {
    try {
      const q = query(
        collection(db, this.searchCollection),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const searches = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      } as SearchRecord));

      // Remove duplicates by username, keeping the most recent
      const uniqueSearches = searches.reduce((acc, search) => {
        if (!acc.find(s => s.username === search.username)) {
          acc.push(search);
        }
        return acc;
      }, [] as SearchRecord[]);

      return uniqueSearches.slice(0, limitCount);
    } catch (error) {
      console.error('Error fetching global recent searches:', error);
      return [];
    }
  }
} 