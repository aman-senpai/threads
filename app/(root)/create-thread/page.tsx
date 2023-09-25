import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    const plainUser = JSON.parse(JSON.stringify(userInfo));

    if (!userInfo?.onboarded) redirect("/onboarding");
    return (
        <>
            <h1 className="head-text">Create Thread</h1>

            <PostThread userId={plainUser._id} />
        </>
    );
}

export default Page;
