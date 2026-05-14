export interface ResumeImage {
    visibility_section: boolean;
    image: string;
}
export interface ResumeHeader {
    visibility_section: boolean;
    name: string;
    position: string;
}
export interface ResumeProfile {
    visibility_section: boolean;
    summary: string;
    title: string;
}
export interface ResumeEducation {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        university: string;
        major: string;
        date: string;
    }[];
}
export interface ResumeExperience {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        position: string;
        company: string;
        date: string;
        description: string;
    }[];
}
export interface ResumeSkills {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        name: string;
    }[];
}
export interface ResumeLanguages {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        lang: string;
        level: string;
    }[];
}
export interface ResumeContact {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        title: string;
        url: string;
    }[];
}
export interface ResumeProjects {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        name: string;
        description: string;
        link?: {
            visibility_item: boolean;
            title: string;
            url: string;
        };
        tech?: {
            visibility_item: boolean;
            items: {
                id: string,
                name: string
            }[];
        };
    }[];
}
export interface ResumeVolunteering {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        role: string;
        organization: string;
        date: string;
        description: string;
        location: string;
        link?: {
            visibility_item: boolean;
            url: string;
            title: string;
        };
    }[];
}
export interface ResumeCertifications {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        name: string;
        issuer: string;
        date: string;
        link?: {
            visibility_item: boolean;
            url: string;
            title: string;
        };
    }[];
}
export interface ResumeAchievements {
    visibility_section: boolean;
    title: string;
    items: {
        id: string;
        label: string;
        value: string;
    }[];
}
export interface ResumeContent {
    image: ResumeImage,
    header: ResumeHeader,
    profile: ResumeProfile,
    education: ResumeEducation,
    experience: ResumeExperience,
    skills: ResumeSkills,
    languages: ResumeLanguages,
    contact: ResumeContact,
    projects: ResumeProjects,
    volunteering: ResumeVolunteering,
    certifications: ResumeCertifications,
    achievements: ResumeAchievements,
}