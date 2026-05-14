"use client";
import { useState } from "react";
import { IoMdMove } from "react-icons/io";
import { FaRobot } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import { useResume } from "@/context/resumeContext";

export default function ResumeCustomizeSections() {
    const { content, updateCVData, layout, updateLayout } = useResume();
    const [draggedSection, setDraggedSection] = useState<string | null>(null);

    if (!content || !layout) return null;

    const toggleSectionVisibility = (id: string) => {
        const sectionData = content[id as keyof typeof content];
        if (sectionData && 'visibility_section' in sectionData) {
            updateCVData([id, 'visibility_section'], !(sectionData as any).visibility_section);
        }
    };

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedSection(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!draggedSection) return;

        const draggedIndex = layout.findIndex(s => s.id === draggedSection);
        const targetIndex = layout.findIndex(s => s.id === targetId);

        if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
            const newLayout = [...layout];
            const [draggedItem] = newLayout.splice(draggedIndex, 1);
            newLayout.splice(targetIndex, 0, draggedItem);
            updateLayout(newLayout);
        }
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
                    {layout.map((section) => {
                        const sectionData = content[section.id as keyof typeof content];
                        const isVisible = sectionData && 'visibility_section' in sectionData ? (sectionData as any).visibility_section : true;
                        
                        return (
                            <div
                                key={section.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, section.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, section.id)}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all group cursor-move"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <input
                                        type="checkbox"
                                        checked={isVisible}
                                        onChange={() => toggleSectionVisibility(section.id)}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className={`text-gray-700 font-medium ${!isVisible ? 'line-through text-gray-400' : ''}`}>
                                        {section.name}
                                    </span>
                                    {["profile", "experience", "projects"].includes(section.id) && (
                                        <FaRobot className="w-4 h-4 text-purple-500 ml-2" title="AI Optimizable" />
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <IoMdMove className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Custom Section
                </button>
            </div>
        </div>
    );
}