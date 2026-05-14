"use client";

import { useMemo, useState } from "react";
import { FiGrid } from "react-icons/fi";
import { IoMdMove } from "react-icons/io";
import { useResume } from "@/context/resumeContext";

type SectionKey =
    | "image"
    | "contact"
    | "education"
    | "skills"
    | "languages"
    | "volunteering"
    | "header"
    | "profile"
    | "experience"
    | "projects"
    | "achievements"
    | "certifications";

const sectionMeta: { key: SectionKey; label: string }[] = [
    { key: "image", label: "Profile Image" },
    { key: "contact", label: "Contact" },
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
    { key: "languages", label: "Languages" },
    { key: "volunteering", label: "Volunteering" },
    { key: "header", label: "Header" },
    { key: "profile", label: "Professional Summary" },
    { key: "experience", label: "Work Experience" },
    { key: "projects", label: "Projects" },
    { key: "achievements", label: "Achievements" },
    { key: "certifications", label: "Certifications" },
];

export default function ResumeCustomizeSections() {
    const { content, updateCVData, sectionOrder, setSectionOrder } = useResume();
    const [draggedSection, setDraggedSection] = useState<string | null>(null);

    const sections = useMemo(() => {
        const order = sectionOrder.length ? sectionOrder : sectionMeta.map((s) => s.key);
        return order
            .map((key) => sectionMeta.find((m) => m.key === key))
            .filter(Boolean)
            .map((meta) => ({
                ...meta!,
                visible: content?.[meta!.key]?.visibility_section ?? true,
            }));
    }, [content, sectionOrder]);

    const toggleSectionVisibility = (key: SectionKey) => {
        updateCVData([key, "visibility_section"], !(content?.[key]?.visibility_section ?? true));
    };

    const handleDragStart = (id: string) => setDraggedSection(id);
    const handleDragOver = (e: React.DragEvent) => e.preventDefault();
    const handleDrop = (targetId: string) => {
        if (!draggedSection || draggedSection === targetId) return;
        const draggedIndex = sections.findIndex((s) => s.key === draggedSection);
        const targetIndex = sections.findIndex((s) => s.key === targetId);
        if (draggedIndex < 0 || targetIndex < 0) return;
        const ordered = sections.map((s) => s.key);
        const [moved] = ordered.splice(draggedIndex, 1);
        ordered.splice(targetIndex, 0, moved);
        setSectionOrder(ordered);
        setDraggedSection(null);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiGrid className="w-5 h-5 text-indigo-600" />
                    Customize Sections
                </h2>

                <div className="space-y-3 mb-6">
                    {sections.map((section) => (
                        <div
                            key={section.key}
                            draggable
                            onDragStart={() => handleDragStart(section.key)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(section.key)}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all group cursor-move"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <input
                                    type="checkbox"
                                    checked={section.visible}
                                    onChange={() => toggleSectionVisibility(section.key)}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className={`text-gray-700 font-medium ${!section.visible ? "line-through text-gray-400" : ""}`}>
                                    {section.label}
                                </span>
                            </div>
                            <IoMdMove className="w-5 h-5 text-gray-400" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}