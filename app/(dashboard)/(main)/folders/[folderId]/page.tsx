import ContentWrapper from "@/components/content-wrapper"
import { auth } from "@clerk/nextjs/server"
import { getContent, getFolder, getFolderContent } from "@/lib/server/queries"
import { notFound, redirect } from "next/navigation"


const FolderPage = async ({
  params,
}: {
  params: { folderId: string }
}) => {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const folder = await getFolder(params.folderId);
  const folderContent = await getFolderContent(params.folderId);

  if (!folder) {
    notFound();
  }
  
  return (
    <ContentWrapper title={folder.name} initialContent={folderContent}/>
  )
}

export default FolderPage;