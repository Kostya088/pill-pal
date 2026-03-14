import { Medicine } from "@/types/medicine";
import Dexie, { Table } from "dexie";

class MedChestDB extends Dexie {
  medicine!: Table<Medicine, string>;

  constructor() {
    super("medChestDB");
    this.version(2).stores({
      medicine: "id, name, expirationDate",
    });
  }
}

export const db = new MedChestDB();

export const medicineRepo = {
  getAll: () => db.medicine.toArray(),
  put: (medicine: Medicine) => db.medicine.put(medicine),
  delete: (id: string) => db.medicine.delete(id),
  bulkPut: (medicines: Medicine[]) => db.medicine.bulkPut(medicines),
};
