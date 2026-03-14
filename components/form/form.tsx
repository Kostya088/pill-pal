"use client";

import { useMedStore } from "@/store/medStore";
import { Medicine } from "@/types/medicine";
import css from "./form.module.css";
import { useRouter } from "next/navigation";

interface MedFormProps {
  onCancel?: () => void;
}

export default function MedForm({ onCancel }: MedFormProps) {
  const router = useRouter();
  const addMedicine = useMedStore((state) => state.addMedicine);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const values: Medicine = {
      id: Date.now().toString(),
      name: String(formData.get("name") ?? ""),
      expirationDate: String(formData.get("date")),
    };

    await addMedicine(values);
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h2>Add new medicine</h2>
      <input
        type="text"
        placeholder="Name of the medicine"
        name="name"
        className={css.input}
        required
      />
      <input type="date" name="date" className={css.input} required />

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Add medicine
        </button>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
