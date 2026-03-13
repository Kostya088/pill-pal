"use client";

import { useEffect, useState } from "react";
import { useMedStore } from "@/store/medStore";
import styles from "./page.module.css";
import Modal from "@/components/modal/modal";

export default function Home() {
  const medicine = useMedStore((state) => state.medicine);
  const loadMedicine = useMedStore((state) => state.loadMedicine);
  const deleteMedicine = useMedStore((state) => state.removeMedicine);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadMedicine();
  }, [loadMedicine]);

  const openDeleteConfirm = (id: string) => {
    setPendingDeleteId(id);
  };

  const closeDeleteConfirm = () => {
    setPendingDeleteId(null);
  };

  const confirmDelete = () => {
    if (!pendingDeleteId) {
      return;
    }

    deleteMedicine(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {medicine.length > 0 ? (
          <ul className={styles.list}>
            {medicine.map((med) => (
              <li key={med.id} className={styles.card}>
                <p className={styles.name}>{med.name}</p>
                <p className={styles.date}>{med.expirationDate}</p>
                <button onClick={() => openDeleteConfirm(med.id)}>
                  Remove medicine
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            No medicines available. Add some to get started!
          </p>
        )}
        {pendingDeleteId ? (
          <Modal onClose={closeDeleteConfirm}>
            <div>
              <h2>Delete medicine?</h2>
              <p>This action will remove the medicine from your list.</p>
              <button type="button" onClick={closeDeleteConfirm}>
                Cancel
              </button>
              <button type="button" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </Modal>
        ) : null}
      </main>
    </div>
  );
}
