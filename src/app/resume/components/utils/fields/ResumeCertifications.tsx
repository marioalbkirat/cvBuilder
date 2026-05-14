import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeCertifications as ResumeCertificationsType } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
export default function ResumeCertifications({ certifications, updateCVData }: { certifications: ResumeCertificationsType, updateCVData: (path: (string | number)[], value: unknown) => void; }) {
    const addCertificationItem = () => {
        const newItem = { id: crypto.randomUUID(), name: "New Certification", issuer: "New Issuer", date: "Date Earned", description: "New certification description" };
        const updatedItems = [...certifications.items, newItem];
        updateCVData(["certifications", "items"], updatedItems);
    }
    return (
        <section id="certifications">
            <InlineEditText as="h2" title="section name" initialValue={certifications?.title || "certifications"}
                validate={(newVal) => createValidator({ field: "section name", min: 3, max: 30, required: true, type: "text" })(newVal)}
                onChange={(val) => updateCVData(["certifications", "title"], val)}
            >
                <i className="fa-solid fa-certificate"></i>
            </InlineEditText>
            <FaPlusCircle onClick={addCertificationItem} className="create-item" />
            {certifications?.items?.map((certification: any, idx: number) => (
                <div className="cert-item" key={idx}>
                    <InlineEditText as="h3" title="certification name" initialValue={certification.name || "Certification Name"}
                        validate={(newVal) => createValidator({ field: "certification name", min: 3, max: 100, required: true, type: "text" })(newVal)}
                        onChange={(val) => updateCVData(["certifications", "items", idx, "name"], val)}
                    />
                    <div className="cert-meta">
                        <InlineEditText as="span" title="certification issuer" initialValue={certification.issuer || "Issuer Name"}
                            validate={(newVal) => createValidator({ field: "certification issuer", min: 3, max: 100, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["certifications", "items", idx, "issuer"], val)}
                        />
                        <InlineEditText as="span" title="certification date" initialValue={certification.date || "Date Earned"}
                            validate={(newVal) => createValidator({ field: "certification date", min: 3, max: 30, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["certifications", "items", idx, "date"], val)}
                        />
                    </div>
                    <FaTrash className="delete-item" onClick={() => updateCVData(["certifications", "items"], certifications.items.filter((_, i) => i !== idx))} />
                </div>
            ))}
        </section>
    )
}
