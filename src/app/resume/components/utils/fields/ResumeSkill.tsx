import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeSkills } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { FaBrain, FaPlusCircle, FaTrash } from "react-icons/fa";
export default function ResumeSkill({ skills, updateCVData }: { skills: ResumeSkills, updateCVData: (path: (string | number)[], value: unknown) => void; }) {
    const addSkillItem = () => {
        const newItem = { id: crypto.randomUUID(), name: "new skill" };
        const updatedItems = [...skills.items, newItem];
        updateCVData(["skills", "items"], updatedItems);
    }
    return (
        <section id="skills">
            <h2>
                <InlineEditText as="span" title="section name" initialValue={skills.title || "skills"}
                    validate={(newVal) => createValidator({ field: "section name", min: 3, max: 13, required: true, type: "text" })(newVal)}
                    onChange={(val) => updateCVData(["skills", "title"], val)}
                />
                <FaBrain />
                <FaPlusCircle onClick={addSkillItem} className="create-item" />
            </h2>
            <ul>
                {skills.items.map((skill: any, idx: number) => (
                    <li key={idx}>
                        <InlineEditText as="span" title="skill name" initialValue={skill.name || "skill name"}
                            validate={(newVal) => createValidator({ field: "skill name", min: 3, max: 30, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["skills", "items", idx, "name"], val)}
                        />
                        <FaTrash className="delete-item" onClick={() => updateCVData(["skills", "items"], skills.items.filter((_, i) => i !== idx))} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
