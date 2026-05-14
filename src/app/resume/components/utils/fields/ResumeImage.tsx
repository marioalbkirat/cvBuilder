import InlineEditImageBasic from '@/lib/inlineEdit/inlineEditImgBasic'
import { ResumeImage } from '@/types/resumeContent'
export default function Resumeimage({ image }: { image: ResumeImage }) {
    return (
        <section id="image">
            <InlineEditImageBasic width={100} height={100} alt="personal image" initialSrc={image.image || "/images/user-photo.avif"} />
        </section>
    )
}
