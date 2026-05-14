import { useResume } from "@/context/resumeContext";
import Image from "next/image";
export default function ResumeTemplates() {
    const { resumes, setActiveResume } = useResume();
    const width = typeof window !== "undefined" ? window.screen.width - 920 : 400;
    if (!resumes) return <p>No templates</p>;
    return (
        <main className="min-h-screen bg-linear-to-br to-slate-100 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto" style={{ width: width > 0 ? width : "auto" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {resumes.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => setActiveResume(template)}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative aspect-4/5 w-full">
                                    <Image
                                        src={template.image}
                                        alt={template.name}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-4 bg-white">
                                    <h3 className="font-semibold text-slate-800 text-base truncate">
                                        {template.name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
