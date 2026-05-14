import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeHeader as ResumeHeaderType } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
export default function ResumeHeader({ header, updateCVData }: { header: ResumeHeaderType, updateCVData: (path: (string | number)[], value: unknown) => void; }) {
    return (
        <section id="header">
            <InlineEditText as="h1" title="your name" initialValue={header.name || "name"}
                validate={(newVal) => createValidator({ field: "your name", min: 3, max: 30, required: true, type: "text" })(newVal)}
                onChange={(val) => updateCVData(["header", "name"], val)}
            />
            <InlineEditText as="h2" title="your position" initialValue={header.position || "position"}
                validate={(newVal) => createValidator({ field: "your position", min: 3, max: 30, required: true, type: "text" })(newVal)}
                onChange={(val) => updateCVData(["header", "position"], val)}
            />
        </section>
    )
}
