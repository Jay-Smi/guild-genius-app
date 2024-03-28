import { CreateGuildForm } from "@/components/forms/create-guild-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserAdminServers } from "@/data/discord/user/getUserAdminServers";

const CreateGuildPage = async () => {
    const userAdminServers = await getUserAdminServers();

    return (
        <div className="w-full h-full flex flex-col items-center gap-y-4">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <h3 className="text-xl text-primary text-semibold">
                        Step 1
                    </h3>
                    <p className="text-sm">
                        Invite the bot to your server by clicking the button
                        below. You will need to have the
                        &quot;Administrator&quot; permission to invite the bot.
                    </p>
                </CardHeader>
                <CardContent>
                    <a
                        target="_blank"
                        href="https://discord.com/oauth2/authorize?client_id=1195433873975287818&permissions=8&scope=bot"
                    >
                        <Button>Invite Bot</Button>
                    </a>
                </CardContent>
            </Card>

            <CreateGuildForm userAdminServers={userAdminServers || []} />
        </div>
    );
};

export default CreateGuildPage;
