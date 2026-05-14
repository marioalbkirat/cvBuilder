import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeEducation as ResumeEducationType } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { FaGraduationCap, FaPlusCircle, FaTrash } from "react-icons/fa";
export default function ResumeEducation({ education, updateCVData }: { education: ResumeEducationType, updateCVData: (path: (string | number)[], value: unknown) => void; }) {
    const addEducationItem = () => {
        const newItem = { id: crypto.randomUUID(), university: "new university", major: "new major" };
        const updatedItems = [...education.items, newItem];
        updateCVData(["education", "items"], updatedItems);
    }
    const deleteEducationItem = (idx: number) => {
        updateCVData(["education", "items"], education.items.filter((_, i) => i !== idx));
    }
    return (
        <section id="education">
            <h2>
                <InlineEditText as="span" title="section name" initialValue={education.title || "education"}
                    validate={(newVal) => createValidator({ field: "section name", min: 3, max: 13, required: true, type: "text" })(newVal)}
                    onChange={(val) => updateCVData(["education", "title"], val)}
                />
                <FaGraduationCap />
                <FaPlusCircle onClick={addEducationItem} className="create-item" />
            </h2>
            <ul>
                {education.items.map((item: any, idx: number) => (
                    <li key={idx}>
                        <InlineEditText as="h3" title="university name" initialValue={item.university || "university"}
                            validate={(newVal) => createValidator({ field: "university", min: 3, max: 30, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["education", "items", idx, "university"], val)}
                        />
                        <InlineEditText as="h4" title="major" initialValue={item.major || "major"}
                            validate={(newVal) => createValidator({ field: "major", min: 3, max: 30, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["education", "items", idx, "major"], val)}
                        />
                        <InlineEditText as="h6" title="date" initialValue={item.date || "date"}
                            validate={(newVal) => createValidator({ field: "date", min: 3, max: 30, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["education", "items", idx, "date"], val)}
                        />
                        <FaTrash className="delete-item" onClick={() => deleteEducationItem(idx)} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
