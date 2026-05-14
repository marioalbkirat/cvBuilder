import { useResume } from "@/context/resumeContext";
import Link from "next/link";
import { FiEdit2, FiEye } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";
export default function ResumeHeader() {
    const { isPreviewMode, setPreviewMode } = useResume();
    return (
        <header id="resume-header" className="w-full bg-linear-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-end md:justify-center py-5 md:py-6">
                    <div className="flex items-center gap-2.5 md:gap-4 flex-wrap justify-end"></div>
                    <button id="connect-with-portfolio" title="Link your resume with portfolio" className="group relative px-5 md:px-6 py-2.5 text-sm font-medium rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2.5">
                        <HiOutlineBriefcase className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span>Connect to Portfolio</span>
                    </button>
                    <button id="resume-download">Download Resume</button>

                    <button id="resume-edit-preview-toggle" onClick={()=> setPreviewMode(!isPreviewMode)} className="px-5 md:px-6 py-2.5 text-sm font-medium rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-300 cursor-pointer flex items-center gap-2.5 shadow-sm">
                        {isPreviewMode ? (
                            <>
                                <FiEdit2 className="w-4 h-4" />
                                <span>Edit Mode</span>
                            </>
                        ) : (
                            <>
                                <FiEye className="w-4 h-4" />
                                <span>Preview Mode</span>
                            </>
                        )}
                    </button>
                    <button id="parsing-resume">Parse Resume</button>
                    <Link id="dashboard-link" href="/" className="px-5 md:px-6 py-2.5 text-sm font-medium rounded-xl border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 cursor-pointer flex items-center gap-2.5 shadow-sm">
                        <MdOutlineDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                    </Link>
                </div>
            </div>
        </header >
    );
}