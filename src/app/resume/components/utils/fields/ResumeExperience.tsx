import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeExperience as ResumeExperienceType } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { FaBriefcase, FaPlusCircle, FaTrash } from "react-icons/fa";
export default function ResumeExperience({ experience, updateCVData }: { experience: ResumeExperienceType, updateCVData: (path: (string | number)[], value: unknown) => void; }) {
    const addExperienceItem = () => {
        const newItem = { id: crypto.randomUUID(), position: "New Position", company: "New Company", date: "2020 - 2021", description: "New experience description" };
        const updatedItems = [...experience.items, newItem];
        updateCVData(["experience", "items"], updatedItems);
    }
    return (
        <section id="experience">
            <h2>
                <InlineEditText as="span" title="section name" initialValue={experience?.title || "experience"}
                    validate={(newVal) => createValidator({ field: "section name", min: 3, max: 30, required: true, type: "text" })(newVal)}
                    onChange={(val) => updateCVData(["experience", "title"], val)}
                />
                <FaBriefcase />
                <FaPlusCircle onClick={addExperienceItem} className="create-item" />
            </h2>
            <ul>
                {experience?.items.map((exp: any, idx: number) => (
                    <li key={idx}>
                        <FaTrash className="delete-item" onClick={() => updateCVData(["experience", "items"], experience.items.filter((_, i) => i !== idx))} />
                        <div className="top">
                            <InlineEditText as="h3" title="company name" initialValue={exp.company || "Company Name"}
                                validate={(newVal) => createValidator({ field: "company name", min: 3, max: 50, required: true, type: "text" })(newVal)}
                                onChange={(val) => updateCVData(["experience", "items", idx, "company"], val)}
                            />
                            <InlineEditText as="h5" title="dates" initialValue={exp.date || "2015 - 2019"}
                                validate={(newVal) => createValidator({ field: "dates", min: 3, max: 30, required: true, type: "text" })(newVal)}
                                onChange={(val) => updateCVData(["experience", "items", idx, "date"], val)}
                            />
                        </div>
                        <InlineEditText as="h4" title="position" initialValue={exp.position || "YOUR JOB TITLE GOES HERE"}
                            validate={(newVal) => createValidator({ field: "position", min: 3, max: 50, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["experience", "items", idx, "position"], val)}
                        />
                        <InlineEditText as="p" title="description" initialValue={exp.description || "Describe your responsibilities in concise statements led by strong verbs."}
                            validate={(newVal) => createValidator({ field: "description", min: 10, max: 500, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["experience", "items", idx, "description"], val)}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
