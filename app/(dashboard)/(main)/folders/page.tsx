import ContentWrapper from "@/components/content-wrapper"
import { auth } from "@clerk/nextjs/server"
import { getContent } from "@/lib/server/queries"
import { redirect } from "next/navigation"


const FolderPage = async () => {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const folderContent = await getContent();
  
  return (
    <ContentWrapper title="Your Content" initialContent={folderContent}/>
  )
}

export default FolderPage;
