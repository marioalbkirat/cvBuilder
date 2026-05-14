

"use client"
import ResumeHeader from "./components/resumeHeader/resumeHeader";
import { ResumeProvider } from "@/context/resumeContext";
import "./sample.css";
import ResumeWorkSpace from "./components/resumeWorkSpace/resumeWorkSpace";
import ResumeCPanel from "./components/resumeCPanel/resumeCPanel";
import { useState } from "react";
export default function Resume() {
    const [activeTab, setActiveTab] = useState("templates");
    return (
        <main>
            <ResumeProvider>
                <ResumeHeader />
                <div className="workspace my-6 flex gap-4 py-4">
                    <ResumeCPanel setActiveTab={setActiveTab} activeTab={activeTab} />
                    <div className="cv-page">
                        <ResumeWorkSpace setActiveTab={setActiveTab} activeTab={activeTab} />
                    </div>
                </div>
            </ResumeProvider>
        </main>
    );
}