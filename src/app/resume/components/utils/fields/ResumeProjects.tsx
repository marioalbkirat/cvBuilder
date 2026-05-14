import InlineEditLink from "@/lib/inlineEdit/InlineEditLink";
import InlineEditText from "@/lib/inlineEdit/inlineEditText";
import { createValidator } from "@/utils/validator";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaEye, FaEyeSlash, FaPlusCircle, FaProjectDiagram, FaTrash } from "react-icons/fa";
import { ResumeProjects as ResumeProjectsType } from "@/types/resumeContent";
import { useResume } from "@/context/resumeContext";
export default function ResumeProjects({ projects, updateCVData }: { projects: ResumeProjectsType, updateCVData: (path: (string | number)[], value: unknown) => void; }) {
    const { showSectionIcons } = useResume();
    const addProjectItem = () => {
        const newItem = { id: crypto.randomUUID(), name: "New Project", description: "New project description", link: { visibility_item: true, title: "hello", url: "xsa" }, tech: { visibility_item: true, items: ["java", "php"] } };
        const updatedItems = [...projects.items, newItem];
        updateCVData(["projects", "items"], updatedItems);
    }
    const addTechItem = (projectIdx: number) => {
        const newItem = {
            id: crypto.randomUUID(),
            name: "New Tech"
        };
        const currentTech = projects.items[projectIdx].tech?.items || [];
        const updatedItems = [...currentTech, newItem];
        updateCVData(["projects", "items", projectIdx, "tech", "items"], updatedItems);
    };
    return (
        <section id="projects">
            {projects.visibility_section &&
                <div>
                    <h2>
                        <InlineEditText as="span" title="section name" initialValue={projects?.title || "projects"}
                            validate={(newVal) => createValidator({ field: "section name", min: 3, max: 30, required: true, type: "text" })(newVal)}
                            onChange={(val) => updateCVData(["projects", "title"], val)}
                        />
                        {showSectionIcons && <FaProjectDiagram />}
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                updateCVData(
                                    ["projects", "visibility_section"],
                                    !projects.visibility_section
                                )
                            }
                        >
                            {projects.visibility_section ? (
                                <FaEye />
                            ) : (
                                <FaEyeSlash />
                            )}
                        </div>
                        <FaPlusCircle onClick={addProjectItem} className="create-item" />
                    </h2>
                    <ul className="projects-items">
                        {projects?.items.map((project: any, idx: number) => (
                            <li key={idx}>
                                <InlineEditText as="h3" title="project name" initialValue={project.name || "Project Name"}
                                    validate={(newVal) => createValidator({ field: "project name", min: 3, max: 100, required: true, type: "text" })(newVal)}
                                    onChange={(val) => updateCVData(["projects", "items", idx, "name"], val)}
                                />
                                <InlineEditText as="p" title="project description" initialValue={project.description || "Describe your project in concise statements."}
                                    validate={(newVal) => createValidator({ field: "project description", min: 10, max: 500, required: true, type: "text" })(newVal)}
                                    onChange={(val) => updateCVData(["projects", "items", idx, "description"], val)}
                                />
                                <div className="project-meta">
                                    <span>
                                        <FaArrowUpRightFromSquare />
                                        <InlineEditLink
                                            validate={(newText, newHref) => {
                                                const isTextValid = createValidator({
                                                    field: "project title",
                                                    min: 2,
                                                    max: 30,
                                                    required: true,
                                                    type: "text",
                                                })(newText);
                                                const isHrefValid = createValidator({
                                                    field: "project link",
                                                    required: true,
                                                    type: "link",
                                                })(newHref);
                                                return isTextValid && isHrefValid;
                                            }}
                                            initialText={project.link?.title ?? "link title"}
                                            initialHref={project.link?.url ?? "url"}
                                            onChange={(newText, newHref) => {
                                                updateCVData(["projects", "items", idx, "link", "title"], newText);
                                                updateCVData(["projects", "items", idx, "link", "url"], newHref);
                                            }}
                                        />
                                    </span>
                                    <ul className="tech-items">
                                        <FaPlusCircle onClick={() => addTechItem(idx)} className="create-item" />
                                        {project.tech.items.map((tech: any, techIdx: number) => (
                                            <li key={techIdx}>
                                                <InlineEditText
                                                    as="span"
                                                    title="project tech"
                                                    initialValue={tech.name || "Java"}
                                                    validate={(newVal) =>
                                                        createValidator({
                                                            field: "tech name",
                                                            min: 2,
                                                            max: 30,
                                                            required: true,
                                                            type: "text"
                                                        })(newVal)
                                                    }
                                                    onChange={(val) =>
                                                        updateCVData(
                                                            ["projects", "items", idx, "tech", "items", techIdx, "name"],
                                                            val
                                                        )
                                                    }
                                                />
                                                <FaTrash className="delete-item" onClick={() => updateCVData(["projects", "items", idx, "tech", "items"], projects.items[idx].tech?.items.filter((_, i) => i !== techIdx))} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <FaTrash className="delete-item" onClick={() => updateCVData(["projects", "items"], projects.items.filter((_, i) => i !== idx))} />
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </section >
    )
}
