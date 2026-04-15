"use client";

import MedForm from "@/components/form/form";
import { useRouter } from "next/navigation";

export default function AddNewPage() {
  const router = useRouter();
  return <MedForm onCancel={() => router.back()} />;
}
