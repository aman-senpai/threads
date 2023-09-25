import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import Image from "next/image";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";

const Page = async ({ params }: { params: { id: string } }) => {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(params.id);
    const plainUser = JSON.parse(JSON.stringify(userInfo));

    if (!userInfo?.onboarded) redirect("/onboarding");
    return (
        <section>
            <ProfileHeader
                accountId={plainUser.id}
                authUserId={user.id}
                name={plainUser.name}
                username={plainUser.username}
                imgUrl={plainUser.image}
                bio={plainUser.bio}
            />
            <div className="mt-9">
                <Tabs
                    defaultValue="threads"
                    className="w-full"
                >
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger
                                key={tab.label}
                                value={tab.value}
                                className="tab"
                            >
                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p>
                                {tab.label === "Threads" && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {plainUser?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent
                            key={`content-${tab.label}`}
                            value={tab.value}
                            className="text-light-1"
                        >
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={plainUser.id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};

export default Page;
