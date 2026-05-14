import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { ResumeProfile as ResumeProfileType } from "@/types/resumeContent";
import { createValidator } from "@/utils/validator";
import { FaUser } from "react-icons/fa";
export default function ResumeProfile({ profile, updateCVData }: { profile: ResumeProfileType, updateCVData: (path: (string | number)[], value: unknown) => void; }) {
    return (
        <section id="profile">
            <h2>
                <InlineEditText as="span" title="section name" initialValue={profile?.title || "profile"}
                    validate={(newVal) => createValidator({ field: "section name", min: 3, max: 30, required: true, type: "text" })(newVal)}
                    onChange={(val) => updateCVData(["profile", "title"], val)}
                />
                <FaUser />
            </h2>
            <InlineEditText as="p" title="profile summary" initialValue={profile?.summary || "summary"}
                validate={(newVal) => createValidator({ field: "profile summary", min: 10, max: 2000, required: true, type: "text" })(newVal)}
                onChange={(val) => updateCVData(["profile", "summary"], val)}
            />
        </section>
    )
}