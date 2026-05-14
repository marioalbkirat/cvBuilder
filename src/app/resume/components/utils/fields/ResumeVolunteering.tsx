import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeVolunteering as ResumeVolunteeringType } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { useResume } from "@/context/resumeContext";
import { FaHandshake, FaPlusCircle, FaTrash } from "react-icons/fa";
export default function ResumeVolunteering({ volunteering, updateCVData }: { volunteering: ResumeVolunteeringType, updateCVData: (path: (string | number)[], value: unknown) => void; } ) {
    const { showSectionIcons } = useResume();
    const addVolunteeringItem = () => {
        const newItem = { id: Date.now(), organization: "New Organization", role: "New Role", date: "2020 - 2021", description: "New volunteering description", location: "New Location" };
        const updatedItems = [...volunteering.items, newItem];
        updateCVData(["volunteering", "items"], updatedItems);
    }
    return (
        <section id="volunteering">
            <h2>
                <InlineEditText as="span" title="section name" initialValue={volunteering.title || "volunteering"}
                    validate={(newVal) => createValidator({ field: "section name", min: 3, max: 13, required: true, type: "text" })(newVal)}
                    onChange={(val) => updateCVData(["volunteering", "title"], val)}
                />
                {showSectionIcons && <FaHandshake />}
                {showSectionIcons && <FaPlusCircle onClick={addVolunteeringItem} className="create-item" />}
            </h2>
            <ul>
                {volunteering.items.map((vol: any, idx: number) => (
                    <li key={idx}>
                        <FaTrash className="delete-item" onClick={() => updateCVData(["volunteering", "items"], volunteering.items.filter((_, i) => i !== idx))} />
                        <InlineEditText as="h3" title="organization name" initialValue={vol.organization || "organization name"}
                            validate={(newVal) => createValidator({ field: "organization name", min: 3, max: 100, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["volunteering", "items",idx, "organization"], val)}
                        />
                        <InlineEditText as="h4" title="role name" initialValue={vol.role || "role name"}
                            validate={(newVal) => createValidator({ field: "role name", min: 3, max: 100, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["volunteering", "items",idx, "role"], val)}
                        />
                        <InlineEditText as="span" title="date" initialValue={vol.date || "2020 - 2021"}
                            validate={(newVal) => createValidator({ field: "date", min: 3, max: 100, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["volunteering", "items",idx, "date"], val)}
                        />
                        <InlineEditText as="p" title="description" initialValue={vol.description || "description"}
                            validate={(newVal) => createValidator({ field: "description", min: 3, max: 200, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["volunteering", "items",idx, "description"], val)}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}
