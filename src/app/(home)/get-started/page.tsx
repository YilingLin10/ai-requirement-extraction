import { TextForm } from "@/components/home/text-form"
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

const GetStartedPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      email: user.email!
    }
  })
  if (!dbUser) {
    return null
  }
  const outOfCredits = dbUser.credit <= 0;
  return (
    <div>
      <TextForm disabled={outOfCredits}/>
      <div className="mt-4 flex  justify-center">
        <div className="w-[75%] text-right">
          {dbUser.credit} credits remaining
          {outOfCredits && (
            <div className="display:inline">
              &nbsp;
              <Button className="text-large px-0 py-0 text-red-500" variant="link">
                <a href="/purchase">Click Here To Buy Credits</a>
              </Button>
            </div>
           ) }
        </div>
      </div>
    </div>
  )
}

export default GetStartedPage 