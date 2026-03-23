export type Unit = "tablet" | "capsule" | "pack" | "ml" | "mg" | "g";

export type FormFactor = "Pill" | "Syrup" | "Cream" | "Drops" | "Spray";

export type Category =
  | "Pain & Fever"
  | "Cold & Flu"
  | "Allergy"
  | "Digestion"
  | "First Aid"
  | "Skin Care"
  | "Prescription"
  | "Vitamins"
  | "Other";

export const CATEGORY_OPTIONS: Category[] = [
  "Pain & Fever",
  "Cold & Flu",
  "Allergy",
  "Digestion",
  "First Aid",
  "Skin Care",
  "Prescription",
  "Vitamins",
  "Other",
];

export const UNIT_OPTIONS: Unit[] = [
  "tablet",
  "capsule",
  "pack",
  "ml",
  "mg",
  "g",
];

export const FORM_FACTOR_OPTIONS: FormFactor[] = [
  "Pill",
  "Syrup",
  "Cream",
  "Drops",
  "Spray",
];

export interface Medicine {
  id: string;
  name: string;
  category: Category;
  formFactor: string;
  quantity: number;
  unit: Unit;
  expirationDate: string;
  openDate: string;
  storageLocation: string;
  notes: string;
  createdAt: string;
}
