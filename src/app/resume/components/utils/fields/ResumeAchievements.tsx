import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeAchievements as ResumeAchievementsType } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { FaPlusCircle, FaTrash, FaTrophy } from "react-icons/fa";
export default function ResumeAchievements({ achievements, updateCVData }: { achievements: ResumeAchievementsType, updateCVData: (path: (string | number)[], value: unknown) => void; }) {
    const addAchievementItem = () => {
        const newItem = { id: crypto.randomUUID(), name: "New Achievement", value: "New achievement value", label: "New achievement label" };
        const updatedItems = [...achievements.items, newItem];
        updateCVData(["achievements", "items"], updatedItems);
    }
    return (
        <section id="achievements">
            <h2>
                <InlineEditText as="span" title="section name" initialValue={achievements?.title || "achievements"}
                    validate={(newVal) => createValidator({ field: "section name", min: 3, max: 30, required: true, type: "text" })(newVal)}
                    onChange={(val) => updateCVData(["achievements", "title"], val)}
                />
                <FaTrophy />
                <FaPlusCircle onClick={addAchievementItem} className="create-item" />
            </h2>
            <div className="achievement-grid">
                {achievements?.items?.map((achievement: any, idx: number) => (
                    <div className="achievement-card" key={idx}>
                        <InlineEditText className="achieve-value" as="div" title="achievement value" initialValue={achievement.value || "Achievement Value"}
                            validate={(newVal) => createValidator({ field: "achievement value", min: 1, max: 100, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["achievements", "items", idx, "value"], val)}
                        />
                        <InlineEditText className="achieve-label" as="div" title="achievement label" initialValue={achievement.label || "Achievement Label"}
                            validate={(newVal) => createValidator({ field: "achievement label", min: 3, max: 100, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["achievements", "items", idx, "label"], val)}
                        />
                        <FaTrash className="delete-item" onClick={() => updateCVData(["achievements", "items"], achievements.items.filter((_, i) => i !== idx))} />
                    </div>
                ))}
            </div>
        </section>
    )
}
