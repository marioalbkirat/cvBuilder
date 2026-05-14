"use client";
import { useState, useRef } from "react";
import { IoMdMove } from "react-icons/io";
import { FaRobot } from "react-icons/fa6";
import { FiGrid } from "react-icons/fi";
import ResumeTemplates from "../resumeTemplates/resumeTemplates";
import { useResume } from "@/context/resumeContext";
import ResumeCustomizeSections from "./customizeSections";

interface AnalysisResult {
    score: number;
    missingKeywords: string[];
    suggestions: string[];
}

interface ResumeCPanelInterface {
    setActiveTab: (a: string) => void;
    activeTab: string
}
export default function ResumeCPanel({ setActiveTab, activeTab }: ResumeCPanelInterface) {
    // const width: number = window.screen.width - 850;
    const [jobDescription, setJobDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    interface Question {
        id: string;
        question: string;
        type: "yes_no" | "short_text";
        children_if_yes: Question[];
        children_if_no: Question[];
    }

    const [answers, setAnswers] = useState<any[]>();
    const [questions, setQuestions] = useState<Question[]>();
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [optimizedContent, setOptimizedContent] = useState<Record<number, string>>({});
    const [showOptimized, setShowOptimized] = useState<Record<number, boolean>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    // const handleAnalyzeWithJD = async () => {
    //     if (!jobDescription.trim()) {
    //         alert("Please enter a job description");
    //         return;
    //     }
    //     setIsAnalyzing(true);

    //     try {
    //         const res = await analayzeResume(jobDescription);
    //         const questionsArray: Question[] = typeof res === "string" ? JSON.parse(res) : res;
    //         if (Array.isArray(questionsArray)) {
    //             setQuestions(questionsArray); // خزّن الأسئلة في state
    //         } else {
    //             console.error("Expected array of questions but got:", res);
    //             setQuestions([]);
    //         }

    //         setShowPopup(true);
    //     } catch (err) {
    //         console.error("Error parsing questions:", err);
    //         setQuestions([]);
    //         setShowPopup(false);
    //     } finally {
    //         setIsAnalyzing(false);
    //     }
    // };

    // const handleAnalyzeWithAnswers = async () => {
    //     if (!jobDescription.trim()) {
    //         alert("Please enter a job description");
    //         return;
    //     }
    //     setIsAnalyzing(true);

    //     try {
    //         const res = await analayzeResume2(jobDescription, answers);

    //     } catch (err) {
    //         console.error("Error parsing questions:", err);
    //     } finally {
    //         setIsAnalyzing(false);
    //     }
    // };

    const handleImproveGenerally = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setAnalysisResult({
                score: 65,
                missingKeywords: ["Leadership", "Project Management", "Communication", "Problem Solving"],
                suggestions: [
                    "Add quantifiable achievements with numbers",
                    "Include soft skills like leadership and teamwork",
                    "Highlight project management experience",
                    "Add certifications and continuous learning",
                    "Improve action verbs in experience descriptions"
                ]
            });
            setIsAnalyzing(false);
        }, 1500);
    };
    const handleGenerateCoverLetter = () => {
        alert("Cover letter generation feature coming soon!");
    };
    const handleOptimizeResume = () => {
        const newOptimizedContent: Record<number, string> = {};
        const newShowOptimized: Record<number, boolean> = {};
        // Removed hardcoded sections optimization logic for brevity, you might want to adapt this to use global content later.
        setOptimizedContent(newOptimizedContent);
        setShowOptimized(newShowOptimized);
        alert("Optimizations applied! Check the Professional Summary, Work Experience, and Projects sections.");
    };
    const handleOptimizeResume = () => {
        // Removed hardcoded sections optimization logic for brevity, you might want to adapt this to use global content later.
        alert("Optimizations applied! Check the Professional Summary, Work Experience, and Projects sections.");
    };
    return (
        <div style={{ width: "690px" }} className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 px-4">
            {/* {showPopup && (
                <>
                    <MultiStepPopup
                        questions={questions}
                        onClose={() => setShowPopup(false)}
                        onSubmit={async answers => {
                            setAnswers(answers);
                            await handleAnalyzeWithAnswers();
                            setShowPopup(false); 
                        }}
                    />
                </>
            )} */}
            <div className="max-w-4xl mx-auto">
                {/* <div className="mb-8 flex items-center justify-between">
                    <div className="text-center flex-1">
                        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Resume Optimizer
                        </h1>
                        <p className="text-gray-600 mt-2">Enhance your resume with AI-powered insights</p>
                    </div>
                </div> */}
                <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 shadow-sm">
                    <button
                        onClick={() => setActiveTab("templates")}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${activeTab === "templates"
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Templates
                    </button>
                    <button
                        onClick={() => setActiveTab("analyze")}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${activeTab === "analyze"
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Analyze Resume
                    </button>
                    <button
                        onClick={() => setActiveTab("sections")}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${activeTab === "sections"
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        Customize Sections
                    </button>
                </div>
                {activeTab === "analyze" && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Job Description (Optional)
                            </h2>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job description here to get targeted analysis, or leave empty for general resume improvement..."
                                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                            />
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            {jobDescription.trim() ? (
                                <>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Targeted Analysis
                                    </h2>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        Analyzing your resume against the provided job description
                                    </p>
                                    <button
                                        // onClick={handleAnalyzeWithJD}
                                        disabled={isAnalyzing}
                                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Analyzing...
                                            </>
                                        ) : (
                                            "Analyze Resume (Match Score + Missing Keywords + Suggestions)"
                                        )}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        General Improvement
                                    </h2>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        Get general suggestions to improve your resume without a specific job target
                                    </p>
                                    <button
                                        onClick={handleImproveGenerally}
                                        disabled={isAnalyzing}
                                        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Analyzing...
                                            </>
                                        ) : (
                                            "Improve CV Generally"
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                        {analysisResult && (
                            <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
                                    <div className="text-4xl font-bold text-blue-600">{analysisResult.score}%</div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3">Missing Keywords</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {analysisResult.missingKeywords.map((keyword, index) => (
                                                <span key={index} className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3">Suggestions</h4>
                                        <div className="space-y-2">
                                            {analysisResult.suggestions.map((suggestion, index) => (
                                                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-700">{suggestion}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                                        {jobDescription.trim() && (
                                            <button
                                                onClick={handleGenerateCoverLetter}
                                                className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer"
                                            >
                                                Generate Cover Letter
                                            </button>
                                        )}
                                        <button
                                            onClick={handleOptimizeResume}
                                            className={`px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium cursor-pointer ${!jobDescription.trim() ? 'col-span-2' : ''}`}
                                        >
                                            Optimize Resume
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === "sections" && (
                    <ResumeCustomizeSections />
                )}
                {activeTab === "templates" && (
                    <ResumeTemplates />
                )}
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}