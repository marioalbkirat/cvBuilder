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

const sectionMeta: { key: SectionKey; label: string; area: "left" | "right" }[] = [
  { key: "image", label: "Profile Image", area: "left" },
  { key: "contact", label: "Contact", area: "left" },
  { key: "education", label: "Education", area: "left" },
  { key: "skills", label: "Skills", area: "left" },
  { key: "languages", label: "Languages", area: "left" },
  { key: "volunteering", label: "Volunteering", area: "left" },
  { key: "header", label: "Header", area: "right" },
  { key: "profile", label: "Professional Summary", area: "right" },
  { key: "experience", label: "Work Experience", area: "right" },
  { key: "projects", label: "Projects", area: "right" },
  { key: "achievements", label: "Achievements", area: "right" },
  { key: "certifications", label: "Certifications", area: "right" },
];

export default function ResumeCustomizeSections() {
  const { content, updateCVData, sectionOrder, setSectionOrder, showSectionIcons, setShowSectionIcons } = useResume();
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

        <div className="mb-4 p-3 rounded-lg bg-indigo-50 flex items-center justify-between">
          <div className="text-sm text-indigo-900 font-medium">Show heading icons</div>
          <button
            type="button"
            onClick={() => setShowSectionIcons(!showSectionIcons)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showSectionIcons ? "bg-indigo-600" : "bg-gray-300"}`}
            aria-label="Toggle heading icons"
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showSectionIcons ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

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
                <button
                  type="button"
                  onClick={() => toggleSectionVisibility(section.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${section.visible ? "bg-blue-600" : "bg-gray-300"}`}
                  aria-label={`Toggle ${section.label} visibility`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${section.visible ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className={`text-gray-700 font-medium ${!section.visible ? "line-through text-gray-400" : ""}`}>
                  {section.label}
                </span>
                <span className="text-[10px] uppercase tracking-wide bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                  {section.area}
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
