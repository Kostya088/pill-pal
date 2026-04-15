"use client";

import {
  Category,
  CATEGORY_OPTIONS,
  FORM_FACTOR_OPTIONS,
  Medicine,
  Unit,
  UNIT_OPTIONS,
} from "@/types/medicine";
import css from "./form.module.css";
import { useRouter } from "next/navigation";
import { useMedStore } from "@/lib/store/medStore";

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
      category: String(formData.get("category") ?? "Other") as Category,
      formFactor: String(formData.get("formFactor") ?? "Pill"),
      quantity: Number(formData.get("quantity") ?? 0),
      unit: String(formData.get("unit") ?? "tablet") as Unit,
      expirationDate: String(formData.get("expirationDate") ?? ""),
      openDate: String(formData.get("openDate") ?? ""),
      storageLocation: String(formData.get("storageLocation") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      createdAt: new Date().toISOString(),
    };

    await addMedicine(values);
    console.log(values);
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h2>Add new medicine</h2>
      {/* Name */}
      <label htmlFor="name" className={css.label}>
        Name
      </label>
      <input
        id="name"
        type="text"
        placeholder="Name of the medicine"
        name="name"
        className={css.input}
        required
      />

      {/* Category */}
      <label htmlFor="category" className={css.label}>
        Category
      </label>
      <select
        id="category"
        name="category"
        className={css.input}
        defaultValue="Other"
      >
        <option value="" disabled>
          Select category
        </option>
        {CATEGORY_OPTIONS.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Form Factor */}
      <label htmlFor="formFactor" className={css.label}>
        Form factor
      </label>
      <select
        id="formFactor"
        name="formFactor"
        className={css.input}
        defaultValue=""
      >
        <option value="" disabled>
          Select form factor
        </option>
        {FORM_FACTOR_OPTIONS.map((formFactor) => (
          <option key={formFactor} value={formFactor}>
            {formFactor}
          </option>
        ))}
      </select>

      {/* Quantity */}
      <label htmlFor="quantity" className={css.label}>
        Quantity
      </label>
      <input
        id="quantity"
        type="number"
        placeholder="Set quantity"
        name="quantity"
        className={css.input}
      />

      {/* Unit*/}
      <label htmlFor="unit" className={css.label}>
        Unit
      </label>
      <select id="unit" name="unit" className={css.input} defaultValue="">
        <option value="" disabled>
          Select units
        </option>
        {UNIT_OPTIONS.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>

      {/* Expiration date */}
      <label htmlFor="expirationDate" className={css.label}>
        Expiration date
      </label>
      <input
        id="expirationDate"
        type="date"
        placeholder="Select expiration date"
        name="expirationDate"
        className={css.input}
        required
      />

      {/* Open date */}
      <label htmlFor="openDate" className={css.label}>
        Open date
      </label>
      <input
        id="openDate"
        type="date"
        placeholder="Select open date"
        name="openDate"
        className={css.input}
      />

      {/* Storage location */}
      <label htmlFor="storageLocation" className={css.label}>
        Storage location
      </label>
      <input
        id="storageLocation"
        type="text"
        placeholder="Where do you store it?"
        name="storageLocation"
        className={css.input}
        required
      />

      {/* Notes */}
      <label htmlFor="notes" className={css.label}>
        Notes
      </label>
      <input
        id="notes"
        type="text"
        placeholder="Add your notes"
        name="notes"
        className={css.input}
      />

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
