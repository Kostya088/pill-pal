"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Modal from "@/components/modal/modal";
import { useMedStore } from "@/lib/store/medStore";
import Header from "@/components/header/header";

export default function Home() {
  const medicine = useMedStore((state) => state.medicine);
  const loadMedicine = useMedStore((state) => state.loadMedicine);
  const deleteMedicine = useMedStore((state) => state.removeMedicine);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await loadMedicine();
      } catch (error) {
        console.error("Failed to load medicine: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [loadMedicine]);

  const openDeleteConfirm = (id: string) => {
    setPendingDeleteId(id);
  };

  const closeDeleteConfirm = () => {
    setPendingDeleteId(null);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteMedicine(pendingDeleteId);
      setPendingDeleteId(null);
    } catch (error) {
      console.error("Failed to delete medicine: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        {isLoading ? (
          <p className={styles.empty}>Loading...</p>
        ) : medicine.length > 0 ? (
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
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </Modal>
        ) : null}
      </main>
    </div>
  );
}
