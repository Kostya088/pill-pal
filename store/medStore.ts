import { Medicine } from "@/types/medicine";
import { create } from "zustand";

const STORAGE_KEY = "medChest";

const readMedicineFromStorage = (): Medicine[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedValue = localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
};

const writeMedicineToStorage = (medicine: Medicine[]) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(medicine));
};

const deleteMedicineFromStorage = (id: string) => {
  const updatedMedicine = readMedicineFromStorage().filter(
    (med) => med.id !== id,
  );
  writeMedicineToStorage(updatedMedicine);
  return updatedMedicine;
};

interface MedicineState {
  medicine: Medicine[];
  loadMedicine: () => void;
  setMedicine: (medicine: Medicine[]) => void;
  addMedicine: (medicine: Medicine) => void;
  removeMedicine: (id: string) => void;
}

export const useMedStore = create<MedicineState>()((set) => ({
  medicine: [],
  loadMedicine: () => {
    set({ medicine: readMedicineFromStorage() });
  },
  setMedicine: (medicine: Medicine[]) => {
    writeMedicineToStorage(medicine);
    set({ medicine });
  },
  addMedicine: (medicine: Medicine) => {
    const updatedMedicine = [...readMedicineFromStorage(), medicine];
    writeMedicineToStorage(updatedMedicine);
    set({ medicine: updatedMedicine });
  },
  removeMedicine: (id: string) => {
    const updatedMedicine = deleteMedicineFromStorage(id);
    set({ medicine: updatedMedicine });
  },
}));
