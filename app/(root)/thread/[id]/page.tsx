import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
    if (!params.id) return null;

    const user = await currentUser();
    const plainUser = JSON.parse(JSON.stringify(user));
    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect("/onboarding");

    const thread = await fetchThreadById(params.id);

    return (
        <section className="relative">
            <div>
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={plainUser?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            </div>
        </section>
    );
};

export default Page;
