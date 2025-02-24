import { EditContentForm } from "@/components/edit-content-form";
import { getContentById } from "@/lib/server/queries"
import { notFound } from "next/navigation";

export default async function ContentPage({
  params,
}: {
  params: { contentId: string }
}) {

  const content = await getContentById(params.contentId);

  if (!content) {
    return notFound();
  }

  return (
    <EditContentForm content={content} />
  )
}

