
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
    const { content, loading, updateCVData, activeResume, isPreviewMode, layout } = useResume();
    if (loading || !content?.header || !content?.profile || !layout) return <p>loading</p>;

    const layoutOrderMap = new Map(layout.map((item, index) => [item.id, index]));
    const getSectionOrder = (key: string) => {
        const order = layoutOrderMap.get(key);
        return order !== undefined ? order : 999;
    };

    const sections: ResumeSection[] = [
        {
            key: "image",
            component: Resumeimage,
            area: "left",
            order: 1,
            plan: "freemium",
            props: {
                image: content.image
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
            }
        },

    ];
    return (
        <>
            <IoSettings onClick={() => setActiveTab("sections")} className="resume-settings" />
            {activeResume?.css && (<style>{activeResume.css}</style>)}
            <main id="resume" className={isPreviewMode ? "preview-mode" : ""}>
                <div className="left-side">
                    {sections
                        .filter(section =>
                            section.area === "left" &&
                            (
                                section.plan === "freemium" ||
                                user.plan === "premium"
                            )
                        ).sort((a, b) => getSectionOrder(a.key) - getSectionOrder(b.key)).map(section => {
                            const Component = section.component;
                            return <Component key={section.key} {...section.props} />
                        })}
                </div>
                <div className="right-side">
                    {sections
                        .filter(section =>
                            section.area === "right" &&
                            (
                                section.plan === "freemium" ||
                                user.plan === "premium"
                            )
                        ).sort((a, b) => getSectionOrder(a.key) - getSectionOrder(b.key)).map(section => {
                            const Component = section.component;
                            return <Component key={section.key} {...section.props} />
                        })}
                </div>
            </main>
        </>
    )
}
