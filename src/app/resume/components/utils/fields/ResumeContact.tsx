import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeContact as ResumeContentType } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { useResume } from "@/context/resumeContext";
import { FaIdCard, FaPlusCircle, FaTrash } from "react-icons/fa";
import { MdContactPage } from "react-icons/md";
export default function ResumeContact({ contact, updateCVData }: { contact: ResumeContentType, updateCVData: (path: (string | number)[], value: unknown) => void; } ) {
    const { showSectionIcons } = useResume();
    const addContactItem = () => {
        const newItem = { id: crypto.randomUUID(), url: "new contact" };
        const updatedItems = [...contact.items, newItem];
        updateCVData(["contact", "items"], updatedItems);
    }
    return (
        <section id="contact">
            <h2>
                <InlineEditText as="span" title="section name" initialValue={contact.title || "contact"}
                    validate={(newVal) => createValidator({ field: "section name", min: 3, max: 13, required: true, type: "text" })(newVal)}
                    onChange={(val) => updateCVData(["contact", "title"], val)}
                />
                {showSectionIcons && <FaIdCard />}
                {showSectionIcons && <FaPlusCircle onClick={addContactItem} className="create-item" />}
            </h2>
            <ul>
                {contact.items.map((item, idx) => (
                    <li key={item.id || idx}>
                        <MdContactPage />
                        <InlineEditText as="span" title="contact item" initialValue={item.url || "contact"}
                            validate={(newVal) => createValidator({ field: "section title", min: 3, max: 40, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["contact", "items", idx, "url"], val)}
                        />
                        <FaTrash className="delete-item" onClick={() => updateCVData(["contact", "items"], contact.items.filter((_, i) => i !== idx))} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
