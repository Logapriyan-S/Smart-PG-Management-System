
export enum UserRole {
  RESIDENT = 'RESIDENT',
  ADMIN = 'ADMIN'
}

export enum ComplaintStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED'
}

export interface Meal {
  menu: string;
  time: string;
}

export interface DayMenu {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export interface WeeklyMenu {
  [day: string]: DayMenu;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  roomNumber?: string;
  phoneNumber?: string;
  entryDate?: string;
  exitDate?: string;
  isRentPaid?: boolean;
  paidMonths?: string[];
}

export interface Complaint {
  id: string;
  residentId: string;
  residentName: string;
  type: 'Water' | 'Electricity' | 'Cleaning' | 'Internet' | 'Food' | 'Other';
  description: string;
  status: ComplaintStatus;
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}


