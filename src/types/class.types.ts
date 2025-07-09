import { Timestamp } from 'firebase/firestore';

export type PaymentMethod = 'tuition' | 'onetime' | 'both' | undefined;

// Base interface with common properties
interface BaseClassData {
  ClassName: string;
  ClassType: 'Regular' | 'Workshop' | 'Private' | 'Competition';
  Days: string[];
  StartTime: string;
  EndTime: string;
  MaxSize: number;
  EnforceAgeLimit: boolean;
  MinAge: number;
  MaxAge: number;
  Description: string;
  InstructorId: string;
  ClassStyleId: string;
  SeasonId: string;
  RoomId: string;
  PaymentMethod: PaymentMethod;
  RatePlanId?: string;
  OneTimeFee?: number;
  StudioId?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  Students: string[];
}

// Interface for existing classes (includes id)
export interface ClassData extends BaseClassData {
  id: string;
}

// Interface for new classes (id is optional)
export interface NewClassData extends BaseClassData {
  id?: string;
} 