import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeLanguages } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { useResume } from "@/context/resumeContext";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { LuLanguages } from "react-icons/lu";
export default function ResumeLanguage({ languages, updateCVData }: { languages: ResumeLanguages, updateCVData: (path: (string | number)[], value: unknown) => void; } ) {
    const { showSectionIcons } = useResume();
    const addLanguageItem = () => {
        const newItem = { id:  crypto.randomUUID(), lang: "new language", level: "new level" };
        const updatedItems = [...languages.items, newItem];
        updateCVData(["languages", "items"], updatedItems);
    }
    return (
        <section id="languages">
            <h2>
                <InlineEditText as="span" title="section name" initialValue={languages.title || "languages"}
                    validate={(newVal) => createValidator({ field: "section name", min: 3, max: 13, required: true, type: "text" })(newVal)}
                    onChange={(val) => updateCVData(["languages", "title"], val)}
                />
                {showSectionIcons && <LuLanguages />}
                {showSectionIcons && <FaPlusCircle onClick={addLanguageItem} className="create-item" />}
            </h2>
            <ul>
                {languages.items.map((lang: any, idx: number) => (
                    <li key={idx}>
                        <InlineEditText as="span" title="language name" initialValue={lang.lang || "English"}
                            validate={(newVal) => createValidator({ field: "language name", min: 3, max: 30, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["languages", "items", idx, "lang"], val)}
                        />
                        <InlineEditText as="span" title="language level" initialValue={lang.level || "Fluent"}
                            validate={(newVal) => createValidator({ field: "language level", min: 3, max: 30, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["languages", "items", idx, "level"], val)}
                        />
                        <FaTrash className="delete-item" onClick={() => updateCVData(["languages", "items"], languages.items.filter((_, i) => i !== idx))} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
