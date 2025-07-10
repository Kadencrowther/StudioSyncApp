import { collection, doc, getDoc, getDocs, query, where, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface CardDetails {
  CardType: string;
  ExpirationMonth: string;
  ExpirationYear: string;
  LastFour: string;
}

export interface EmergencyContact {
  Name: string;
  Phone: string;
}

export interface LastPayment {
  Amount: number;
  Date: string;
  IsPartialPayment: boolean;
  Method: string;
}

export interface SignatureInfo {
  AgreedToTerms: boolean;
  AgreedToWaiver: boolean;
  SignatureDate: string;
  SignatureIp: string;
  SignatureText: string;
  SignatureTime: string;
  SignatureTimestamp: string;
  SignedBy: string;
}

export interface Family {
  id: string;
  AdditionalDetails: string;
  Address1: string;
  Address2: string;
  Balance: number;
  CardDetails: CardDetails[];
  City: string;
  CreatedAt: Date;
  Email: string;
  EmergencyContacts: EmergencyContact[];
  FirstName: string;
  LastName: string;
  HowDidYouHearAboutUs: string;
  IsOnAutoPay: boolean;
  LastChargeAmount: number;
  LastChargeDate: Date;
  LastPayment: LastPayment;
  LastUpdated: Date;
  PayarcCustomerId: string;
  Phone: string;
  PolicyAgreements: string[];
  ReferredBy: string;
  SignatureInfo: SignatureInfo;
  State: string;
  Students: string[];
  UpdatedAt: Date;
  ZipCode: string;
}

class FamilyService {
  private familiesCache: Map<string, Family> = new Map();

  // Get a single family by ID
  async fetchFamily(studioId: string, familyId: string): Promise<Family | null> {
    try {
      const familyDoc = await getDoc(doc(db, `Studios/${studioId}/Families/${familyId}`));
      if (!familyDoc.exists()) return null;

      const familyData = {
        id: familyDoc.id,
        ...familyDoc.data()
      } as Family;

      this.familiesCache.set(familyId, familyData);
      return familyData;
    } catch (error) {
      console.error('Error fetching family:', error);
      return null;
    }
  }

  // Get all families for a studio
  async fetchFamilies(studioId: string): Promise<Map<string, Family>> {
    try {
      const familiesRef = collection(db, `Studios/${studioId}/Families`);
      const querySnapshot = await getDocs(familiesRef);
      
      this.familiesCache.clear();
      querySnapshot.forEach(doc => {
        const familyData = {
          id: doc.id,
          ...doc.data()
        } as Family;
        this.familiesCache.set(doc.id, familyData);
      });

      return this.familiesCache;
    } catch (error) {
      console.error('Error fetching families:', error);
      return new Map();
    }
  }

  // Get family name by ID
  getFamilyName(familyId: string): string {
    const family = this.familiesCache.get(familyId);
    if (!family) return familyId;
    return `${family.FirstName} ${family.LastName}`;
  }

  // Get family full name with ID
  getFamilyFullName(familyId: string): string {
    const family = this.familiesCache.get(familyId);
    if (!family) return familyId;
    return `${family.FirstName} ${family.LastName} (${familyId})`;
  }

  // Search families by name
  async searchFamilies(studioId: string, searchTerm: string): Promise<Family[]> {
    try {
      // Ensure we have the families loaded
      if (this.familiesCache.size === 0) {
        await this.fetchFamilies(studioId);
      }

      const searchTermLower = searchTerm.toLowerCase();
      return Array.from(this.familiesCache.values()).filter(family => 
        family.FirstName.toLowerCase().includes(searchTermLower) ||
        family.LastName.toLowerCase().includes(searchTermLower) ||
        family.Email.toLowerCase().includes(searchTermLower) ||
        family.Phone.includes(searchTerm)
      );
    } catch (error) {
      console.error('Error searching families:', error);
      return [];
    }
  }

  // Update family
  async updateFamily(studioId: string, familyId: string, updates: Partial<Family>): Promise<boolean> {
    try {
      const familyRef = doc(db, `Studios/${studioId}/Families/${familyId}`);
      await updateDoc(familyRef, {
        ...updates,
        UpdatedAt: new Date()
      });

      // Update cache
      const existingFamily = this.familiesCache.get(familyId);
      if (existingFamily) {
        this.familiesCache.set(familyId, {
          ...existingFamily,
          ...updates,
          UpdatedAt: new Date()
        });
      }

      return true;
    } catch (error) {
      console.error('Error updating family:', error);
      return false;
    }
  }

  // Create new family
  async createFamily(studioId: string, familyData: Omit<Family, 'id' | 'CreatedAt' | 'UpdatedAt'>): Promise<string | null> {
    try {
      const familiesRef = collection(db, `Studios/${studioId}/Families`);
      const newFamilyDoc = await addDoc(familiesRef, {
        ...familyData,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Balance: 0,
        LastChargeAmount: 0,
        IsOnAutoPay: false
      });

      // Add to cache
      const newFamily = {
        id: newFamilyDoc.id,
        ...familyData,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Balance: 0,
        LastChargeAmount: 0,
        IsOnAutoPay: false
      } as Family;

      this.familiesCache.set(newFamilyDoc.id, newFamily);

      return newFamilyDoc.id;
    } catch (error) {
      console.error('Error creating family:', error);
      return null;
    }
  }

  // Delete family
  async deleteFamily(studioId: string, familyId: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, `Studios/${studioId}/Families/${familyId}`));
      this.familiesCache.delete(familyId);
      return true;
    } catch (error) {
      console.error('Error deleting family:', error);
      return false;
    }
  }

  // Get families by student
  async getFamiliesByStudent(studioId: string, studentId: string): Promise<Family[]> {
    try {
      const familiesRef = collection(db, `Studios/${studioId}/Families`);
      const q = query(familiesRef, where('Students', 'array-contains', studentId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Family));
    } catch (error) {
      console.error('Error getting families by student:', error);
      return [];
    }
  }

  // Clear cache
  clearCache() {
    this.familiesCache.clear();
  }
}

export const familyService = new FamilyService(); 