
import { useResume } from "@/context/resumeContext";
import ResumeContact from "../utils/fields/ResumeContact";
import ResumeEducation from "../utils/fields/ResumeEducation";
import ResumeSkill from "../utils/fields/ResumeSkill";
import ResumeLanguage from "../utils/fields/ResumeLanguage";
import ResumeExperience from "../utils/fields/ResumeExperience";
import ResumeVolunteering from "../utils/fields/ResumeVolunteering";
import ResumeHeader from "../utils/fields/ResumeHeader";
import ResumeProfile from "../utils/fields/ResumeProfile";
import ResumeProjects from "../utils/fields/ResumeProjects";
import ResumeAchievements from "../utils/fields/ResumeAchievements";
import ResumeCertifications from "../utils/fields/ResumeCertifications";
import Resumeimage from "../utils/fields/ResumeImage";
import { IoSettings } from "react-icons/io5";
interface ResumeWorkSpaceInterface {
    setActiveTab: (a: string) => void;
    activeTab: string
}
import type { ComponentType } from "react";

interface ResumeSection {
    key: string;
    visible: boolean;
    component: ComponentType<any>;
    area: "left" | "right";
    order: number;
    plan: string;
    props: Record<string, unknown>;
}
export default function ResumeWorkSpace({ setActiveTab, activeTab }: ResumeWorkSpaceInterface) {

    const user = {
        plan: "premium"
    }
    const { content, loading, updateCVData, activeResume, isPreviewMode, sectionOrder } = useResume();
    if (loading || !content?.header || !content?.profile) return <p>loading</p>;

    const sections: ResumeSection[] = [
        {
            key: "image",
            component: Resumeimage,
            area: "left",
            order: 1,
            plan: "freemium",
            props: {
                image: content.image
            },
            visible: content.image.visibility_section
        },
        {
            key: "contact",
            component: ResumeContact,
            area: "left",
            plan: "freemium",
            order: 2,
            props: {
                contact: content.contact,
                updateCVData
            },
            visible: content.contact.visibility_section
        },
        {
            key: "education",
            component: ResumeEducation,
            area: "left",
            plan: "freemium",
            order: 3,
            props: {
                education: content.education,
                updateCVData
            },
            visible: content.education.visibility_section
        },
        {
            key: "skills",
            component: ResumeSkill,
            area: "left",
            plan: "freemium",
            order: 4,
            props: {
                skills: content.skills,
                updateCVData
            },
            visible: content.skills.visibility_section
        },
        {
            key: "languages",
            component: ResumeLanguage,
            area: "left",
            order: 5,
            plan: "freemium",
            props: {
                languages: content.languages,
                updateCVData
            },
            visible: content.languages.visibility_section
        },
        {
            key: "volunteering",
            component: ResumeVolunteering,
            area: "left",
            order: 6,
            plan: "premium",
            props: {
                volunteering: content.volunteering,
                updateCVData
            },
            visible: content.volunteering.visibility_section
        },
        {
            key: "header",
            component: ResumeHeader,
            area: "right",
            order: 1,
            plan: "freemium",
            props: {
                header: content.header,
                updateCVData
            },
            visible: content.header.visibility_section
        },
        {
            key: "profile",
            component: ResumeProfile,
            area: "right",
            order: 2,
            plan: "freemium",
            props: {
                profile: content.profile,
                updateCVData
            },
            visible: content.profile.visibility_section
        },
        {
            key: "experience",
            component: ResumeExperience,
            area: "right",
            plan: "freemium",
            order: 3,
            props: {
                experience: content.experience,
                updateCVData
            },
            visible: content.experience.visibility_section
        },
        {
            key: "projects",
            component: ResumeProjects,
            area: "right",
            order: 4,
            plan: "premium",
            props: {
                projects: content.projects,
                updateCVData
            },
            visible: content.projects.visibility_section
        },
        {
            key: "achievements",
            component: ResumeAchievements,
            area: "right",
            order: 5,
            plan: "premium",
            props: {
                achievements: content.achievements,
                updateCVData
            },
            visible: content.achievements.visibility_section
        },
        {
            key: "certifications",
            component: ResumeCertifications,
            area: "right",
            plan: "premium",
            order: 6,
            props: {
                certifications: content.certifications,
                updateCVData
            },
            visible: content.certifications.visibility_section
        },

    ];

    const sectionsOrderMap = new Map(sectionOrder.map((key, index) => [key, index]));
    const sortedSections = [...sections].sort((a, b) => (sectionsOrderMap.get(a.key) ?? 999) - (sectionsOrderMap.get(b.key) ?? 999));
    return (
        <>
            {!isPreviewMode && <IoSettings onClick={() => setActiveTab("sections")} className="resume-settings" />} 
            {activeResume?.css && (<style>{activeResume.css}</style>)}
            <main id="resume" className={isPreviewMode ? "preview-mode" : ""}>
                <div className="left-side">
                    {sortedSections
                        .filter(section =>
                            section.area === "left" &&
                            (
                                section.plan === "freemium" ||
                                user.plan === "premium"
                            ) && section.visible
                        ).map(section => {
                            const Component = section.component;
                            return <Component key={section.key} {...section.props} />
                        })}
                </div>
                <div className="right-side">
                    {sortedSections
                        .filter(section =>
                            section.area === "right" &&
                            (
                                section.plan === "freemium" ||
                                user.plan === "premium"
                            ) && section.visible
                        ).map(section => {
                            const Component = section.component;
                            return <Component key={section.key} {...section.props} />
                        })}
                </div>
            </main>
        </>
    )
}
