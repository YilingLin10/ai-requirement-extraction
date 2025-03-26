import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import {
    Card,
    CardContent,
    CardHeader
} from '@/components/ui/card';

const ProfilePage = async() => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Not authenticated");
    }
    const dbUser = await prisma.user.findUnique({
        where: {
            email: user.email!
        }
    });
    if (!dbUser) {
        throw new Error("User not found in database");
    }
    return (
        <div className="flex justify-center">
            <div className="lg:w-[60%] md:w-70%] w-full grid gap-4">
                <Card>
                    <CardHeader className="flex justify-center">
                        <h2>{dbUser.name}</h2>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span className="font-medium text-foreground">Email:</span> {dbUser.email}
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-foreground">Credits:</span> {dbUser.credit}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ProfilePage;