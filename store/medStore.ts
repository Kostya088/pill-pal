import { Medicine } from "@/types/medicine";
import { create } from "zustand";
import { medicineRepo } from "./db";

interface MedicineState {
  medicine: Medicine[];
  loadMedicine: () => Promise<void>;
  addMedicine: (medicine: Medicine) => Promise<void>;
  removeMedicine: (id: string) => Promise<void>;
}

export const useMedStore = create<MedicineState>((set) => ({
  medicine: [],
  loadMedicine: async () => {
    const medicines = await medicineRepo.getAll();
    set({ medicine: medicines });
  },

  addMedicine: async (medicine: Medicine) => {
    await medicineRepo.put(medicine);
    const medicines = await medicineRepo.getAll();
    set({ medicine: medicines });
  },

  removeMedicine: async (id: string) => {
    await medicineRepo.delete(id);
    const medicines = await medicineRepo.getAll();
    set({ medicine: medicines });
  },
}));
