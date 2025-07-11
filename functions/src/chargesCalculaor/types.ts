export interface FamilyData {
  id: string;
  FirstName?: string;
  LastName?: string;
  FamilyId?: string;
  RatePlan?: string;
  PromoCodes?: string[];
  [key: string]: any;
}

export interface StudioData {
  id?: string;
  StudentFamilyMax?: {
    StudentMax?: number;
    FamilyMax?: number;
  };
  DefaultRatePlan?: string;
  [key: string]: any;
}

export interface StudentData {
  id: string;
  FirstName?: string;
  LastName?: string;
  FamilyId?: string;
  Classes?: string[];
  [key: string]: any;
}

export interface Discount {
  id: string;
  Name: string;
  IsActive: boolean;
  AssociationType: string;
  AssociationItemId?: string;
  DiscountType: string;
  Amount: number;
  DiscountCode?: string;
  [key: string]: any;
}

export interface Fee {
  id: string;
  Name: string;
  IsActive: boolean;
  Amount: number;
  FeeType?: string;
  [key: string]: any;
}
