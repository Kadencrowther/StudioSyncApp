import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ClassStyle {
  id: string;
  StyleName: string;
  Description: string;
  CreatedAt: string;
}

export const classStyleService = {
  fetchClassStyles: async (studioId: string): Promise<Map<string, ClassStyle>> => {
    try {
      const stylesRef = collection(db, `Studios/${studioId}/ClassStyles`);
      const snapshot = await getDocs(stylesRef);
      const stylesMap = new Map<string, ClassStyle>();
      
      snapshot.docs.forEach(doc => {
        stylesMap.set(doc.id, {
          id: doc.id,
          ...doc.data()
        } as ClassStyle);
      });
      
      return stylesMap;
    } catch (error) {
      console.error('Error fetching class styles:', error);
      throw error;
    }
  },

  getStyleName: (stylesMap: Map<string, ClassStyle>, styleId: string): string => {
    const style = stylesMap.get(styleId);
    return style ? style.StyleName : 'Unknown Style';
  }
}; 