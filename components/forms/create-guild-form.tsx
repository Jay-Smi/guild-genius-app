"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateGuildSchema } from "@/schemas";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    WowFaction,
    WowRegion,
    WowSodRealm,
    WowVersion,
} from "@/enums/wow-enums";
import { createGuild } from "@/actions/create-guild";
import { useRouter } from "next/navigation";
import { updateGuild } from "@/data/guild";
import { updateGuildAction } from "@/actions/update-guild";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CreateGuildFormProps = {
    userAdminServers: PartialDiscordServer[];
    editGuildDefaults?: z.infer<typeof CreateGuildSchema>;
    guildId?: number;
};

export const CreateGuildForm = ({
    userAdminServers,
    editGuildDefaults,
    guildId,
}: CreateGuildFormProps) => {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof CreateGuildSchema>>({
        resolver: zodResolver(CreateGuildSchema),
        defaultValues: editGuildDefaults || {
            playerName: "",
            name: "",
            discord_server_id: undefined,
            faction: undefined,
            region: undefined,
            version: undefined,
            realm: undefined,
        },
    });

    const onSubmit = (values: z.infer<typeof CreateGuildSchema>) => {
        setError(undefined);
        setSuccess(undefined);

        const server = userAdminServers.find(
            (server) => server.id === values.discord_server_id
        );

        if (!server) return setError("Invalid server");

        startTransition(() => {
            if (!editGuildDefaults) {
                createGuild(values, server)
                    .then((data) => {
                        if (data.error) setError(data.error);
                        if (data.success) {
                            setSuccess(data.success);
                            if (data.guild && data.guild.id) {
                                setTimeout(() => {
                                    router.push(
                                        `/guild/${data.guild?.id}/settings`
                                    );
                                }, 500);
                            }
                        }
                    })
                    .catch(() => setError("An unknown error occurred"))
                    .finally(() => {});
            } else if (editGuildDefaults && guildId) {
                updateGuildAction(values, guildId)
                    .then((data) => {
                        if (data.error) setError(data.error);
                        if (data.success) {
                            setSuccess(data.success);
                            toast(data.success);
                        }
                    })
                    .catch(() => setError("An unknown error occurred"));
            }
        });
    };

    return (
        <Card
            className={cn(
                "flex-1 max-w-[500px]",
                success && "border-green-500",
                error && "border-destructive"
            )}
        >
            <CardHeader>
                <h3 className="text-xl text-primary text-semibold">
                    {editGuildDefaults ? "Basic Info" : "Step 2"}
                </h3>
                {!editGuildDefaults && (
                    <p className="text-sm">Fill out this form</p>
                )}
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            {!editGuildDefaults && (
                                <FormField
                                    control={form.control}
                                    name="playerName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Your Player Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Who your guild knows you as"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Guild Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="guild name"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discord_server_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discord Server</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a server" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {userAdminServers.map(
                                                    (server) => (
                                                        <SelectItem
                                                            key={server.id}
                                                            value={server.id}
                                                        >
                                                            {server.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="faction"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Faction</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a faction" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(WowFaction).map(
                                                    (faction) => (
                                                        <SelectItem
                                                            key={faction}
                                                            value={faction}
                                                        >
                                                            {faction}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="region"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Region</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a region" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(WowRegion).map(
                                                    (region) => (
                                                        <SelectItem
                                                            key={region}
                                                            value={region}
                                                        >
                                                            {region}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="version"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WoW Version</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a version of WoW" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(WowVersion).map(
                                                    (version) => (
                                                        <SelectItem
                                                            key={version}
                                                            value={version}
                                                        >
                                                            {version}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="realm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>WoW Realm</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a WoW realm" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(WowSodRealm).map(
                                                    (version) => (
                                                        <SelectItem
                                                            key={version}
                                                            value={version}
                                                        >
                                                            {version}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit" disabled={isPending}>
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
