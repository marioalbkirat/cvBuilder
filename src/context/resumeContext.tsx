"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import mockData from "@/data/packed-resume-schema.json";
import { Resume } from "@/types/resume";
import { ResumeContent } from "@/types/resumeContent";
type ResumeType = Omit<Resume, "plan" | "resumeUsers">;
interface ResumeContextType {
    resumes: ResumeType[] | null;
    loading: boolean;
    error: string | null;
    activeResume: ResumeType | null;
    setActiveResume: (r: ResumeType | null) => void;
    updateCVData: (path: (string | number)[], value: unknown) => void;
    content: ResumeContent | null;
    isPreviewMode: boolean;
    setPreviewMode: (p: boolean) => void;
}
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);
export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ResumeContent | null>(null);
    const [resumes, setResumes] = useState<ResumeType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isPreviewMode, setPreviewMode] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeResume, setActiveResume] = useState<ResumeType | null>(null);
    const getResumes = useCallback(async () => {
        try {
            setLoading(true);
            const fetchResumes = await fetch("/api/resume");
            const data: ResumeType[] | null = await fetchResumes.json();
            setResumes(data);
            setActiveResume(data ? data[1] : null);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        getResumes();
    }, [getResumes]);
    useEffect(() => {
        getContent();
    }, []);
    const setLocalStorage = (data: ResumeContent) => {
        localStorage.setItem("resume", JSON.stringify(data));
    }
    const getContent = useCallback(async () => {
        let resumeContent: ResumeContent = mockData;
        const localRaw = localStorage.getItem("resume");
        const localData = localRaw ? JSON.parse(localRaw) : null;

        // const res = await fetch("/api/user-resume");
        // if (res.ok) {
        //     const dbData = await res.json();
        //     if (!localRaw) {
        //         setLocalStorage(dbData.content);
        //         localStorage.setItem("resume_updated_at", JSON.stringify(Date.now()));
        //         resumeContent = dbData.content;
        //     } else {
        //         const resumeUpdatedAt = localStorage.getItem("resume_updated_at");
        //         let resumeUpdatedAtDate = resumeUpdatedAt ? JSON.parse(resumeUpdatedAt) : null;
        //         if (!resumeUpdatedAtDate) {
        //             resumeUpdatedAtDate = Date.now();
        //             localStorage.setItem("resume_updated_at", JSON.stringify(resumeUpdatedAtDate));
        //         }
        //         const localDate = new Date(resumeUpdatedAtDate).getTime();
        //         const dbDate = new Date(dbData.updatedAt).getTime();
        //         resumeContent = dbDate > localDate ? dbData.content : localData;
        //     }
        // } else {
        //     if (!localRaw) setLocalStorage(mockData);
        // }
        setContent(mockData);
    }, []);
    function deepClone<T>(obj: T): T {
        if (typeof structuredClone === "function") {
            return structuredClone(obj);
        }
        return JSON.parse(JSON.stringify(obj));
    }
    function setNestedValue(obj: any, path: (string | number)[], value: any) {
        if (!Array.isArray(path) || path.length === 0) return;
        let current = obj;
        for (let i = 0; i < path.length - 1; i++) {
            let key = path[i];
            if (typeof key === "string" && /^\d+$/.test(key)) {
                key = parseInt(key, 10);
            }
            const nextKey = path[i + 1];
            if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
                current[key] =
                    typeof nextKey === "number" || /^\d+$/.test(String(nextKey)) ? [] : {};
            }
            current = current[key];
        }
        let lastKey = path[path.length - 1];
        if (typeof lastKey === "string" && /^\d+$/.test(lastKey)) {
            lastKey = parseInt(lastKey, 10);
        }
        current[lastKey] = value;
    }
    const updateCVData = (path: (string | number)[], value: any) => {
        setContent((prev: any) => {
            const updated = deepClone(prev || {});
            setNestedValue(updated, path, value);
            localStorage.setItem("resume", JSON.stringify(updated));
            localStorage.setItem("resume_updated_at", JSON.stringify(Date.now()))
            return updated;
        });
    };



    return (
        <ResumeContext.Provider
            value={{
                isPreviewMode,
                setPreviewMode,
                resumes,
                loading,
                error,
                activeResume,
                setActiveResume,
                updateCVData,
                content
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};
export const useResume = () => {
    const ctx = useContext(ResumeContext);
    if (!ctx) throw new Error("useResume must be used within ResumeProvider");
    return ctx;
};