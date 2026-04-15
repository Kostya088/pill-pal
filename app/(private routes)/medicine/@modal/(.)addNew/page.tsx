"use client";

import { useRouter } from "next/navigation";
import MedForm from "@/components/form/form";
import Modal from "@/components/modal/modal";

export default function AddNewModalPage() {
	const router = useRouter();

	return (
		<Modal onClose={() => router.back()}>
			<MedForm onCancel={() => router.back()} />
		</Modal>
	);
}
