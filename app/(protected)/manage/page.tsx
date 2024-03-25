import { redirect } from "next/navigation";

const ManagePage = () => {
    redirect("/manage/join-guilds");
    return <div>ManagePage</div>;
};

export default ManagePage;
