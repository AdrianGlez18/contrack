import ContentWrapper from "@/components/content-wrapper"
import { auth } from "@clerk/nextjs/server"
import { getContent } from "@/lib/server/queries"
import { redirect } from "next/navigation"
import { MobileHeader } from "@/components/mobile-header"


const FolderPage = async () => {

  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const folderContent = await getContent();
  const title = "Your Content"
  
  return (
    <>
    <MobileHeader title={title} />
    <ContentWrapper title={title} initialContent={folderContent}/>
    </>
    
  )
}

export default FolderPage;
