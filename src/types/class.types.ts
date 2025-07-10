export type PaymentMethod = 'tuition' | 'onetime' | 'both' | undefined;

// Base interface with common properties
export interface BaseClassData {
  ClassName: string;
  ClassType: 'Regular' | 'Workshop' | 'Private' | 'Competition';
  Description?: string;
  InstructorId: string;
  MaxSize: number;
  MinAge?: number;
  MaxAge?: number;
  EnforceAgeLimit: boolean;
  RoomId: string;
  SeasonId: string;
  StartTime: string;
  EndTime: string;
  Days: string[];
  Students?: string[];
  ClassStyleId: string;
  PaymentMethod?: PaymentMethod;
  RatePlanId?: string;
  OneTimeFee?: number;
  StudioId?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  Fee?: Array<{ amount: number }>;
  PaymentType?: string;
}

// Interface for existing classes (includes id)
export interface ClassData extends BaseClassData {
  id: string; // Make id required since it always exists after fetching
  ClassId: string; // Keep ClassId for backward compatibility
}

// Interface for new classes (before they have an id)
export interface NewClassData extends Omit<BaseClassData, 'id' | 'ClassId'> {
  // Add any additional fields specific to new classes
}

// Type for the view dropdown props
export interface ViewDropdownProps<T = string | string[]> {
  onViewChange: (view: T) => void;
  value: T;
  options: Array<{
    label: string;
    value: string;
    color?: string;
  }>;
  className?: string;
  defaultLabel?: string;
  isLoading?: boolean;
  isMulti?: boolean;
  allItemsLabel?: string;
  icon?: React.ReactNode;
}

export interface CalendarViewSelectorProps {
  currentView: string;
  onViewChange: (view: string) => void;
  className?: string;
}

export interface ClassFilters {
  seasonId?: string;
  roomId?: string;
  instructorId?: string;
  classType?: string;
} 