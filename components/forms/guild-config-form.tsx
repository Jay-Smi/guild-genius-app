"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateGuildSchema, GuildConfigSchema } from "@/schemas";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
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
    SelectGroup,
    SelectItem,
    SelectLabel,
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
import { Guild } from "discord.js";
import { TimezoneSelect } from "../timezone-select";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

type GuildConfigFormProps = {
    fullDiscordServer: any;
    defaults: z.infer<typeof GuildConfigSchema>;
};

//roles that may join
//roles that may create raids
//guild time zone

//member management
//delete guild

export const GuildConfigForm = ({
    fullDiscordServer,
    defaults,
}: GuildConfigFormProps) => {
    const serverRoles = fullDiscordServer.roles;

    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof GuildConfigSchema>>({
        resolver: zodResolver(CreateGuildSchema),
        defaultValues: defaults,
    });

    const onSubmit = (values: z.infer<typeof GuildConfigSchema>) => {
        setError(undefined);
        setSuccess(undefined);

        // const server = userAdminServers.find(
        //     (server) => server.id === values.discord_server_id
        // );

        // if (!server) return setError("Invalid server");

        startTransition(() => {
            // createGuild(values, server)
            //     .then((data) => {
            //         if (data.error) setError(data.error);
            //         if (data.success) {
            //             setSuccess(data.success);
            //             if (data.guild && data.guild.id) {
            //                 setTimeout(() => {
            //                     router.push(
            //                         `/guild/${data.guild?.id}/settings`
            //                     );
            //                 }, 500);
            //             }
            //         }
            //     })
            //     .catch(() => setError("An unknown error occurred"))
            //     .finally(() => {});
        });
    };

    return (
        <Card
            className={cn(
                "flex-1 max-w-[500px]",
                success && "border-green-500"
            )}
        >
            <CardHeader>
                <h3 className="text-xl text-primary text-semibold">
                    Configuration
                </h3>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="permittedRoles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Roles permitted to join the guild
                                        </FormLabel>
                                        <FormDescription>
                                            Only selected roles will be
                                            permitted to join.
                                            <br />
                                            Select none and anyone in the server
                                            may join.
                                        </FormDescription>
                                        <div className="flex flex-wrap gap-4">
                                            {fullDiscordServer.roles.map(
                                                (role: {
                                                    id: string;
                                                    name: string;
                                                }) => (
                                                    <FormField
                                                        key={role.id}
                                                        control={form.control}
                                                        name="permittedRoles"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={
                                                                        role.id
                                                                    }
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(
                                                                                role.id
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              role.id,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          field.value?.filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  role.id
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {role.name.includes(
                                                                            "@"
                                                                        )
                                                                            ? role.name
                                                                            : `@${role.name}`}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator />

                            <FormField
                                control={form.control}
                                name="create_raids_permitted_roles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Roles permitted to create and
                                            schedule raids in the app
                                        </FormLabel>
                                        <FormDescription>
                                            Only selected roles, and those with
                                            the administrator permission, will
                                            be permitted.
                                        </FormDescription>
                                        <div className="flex flex-wrap gap-4">
                                            {fullDiscordServer.roles.map(
                                                (role: {
                                                    id: string;
                                                    name: string;
                                                }) => (
                                                    <FormField
                                                        key={role.id}
                                                        control={form.control}
                                                        name="permittedRoles"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={
                                                                        role.id
                                                                    }
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(
                                                                                role.id
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) => {
                                                                                return checked
                                                                                    ? field.onChange(
                                                                                          [
                                                                                              ...field.value,
                                                                                              role.id,
                                                                                          ]
                                                                                      )
                                                                                    : field.onChange(
                                                                                          field.value?.filter(
                                                                                              (
                                                                                                  value
                                                                                              ) =>
                                                                                                  value !==
                                                                                                  role.id
                                                                                          )
                                                                                      );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {role.name.includes(
                                                                            "@"
                                                                        )
                                                                            ? role.name
                                                                            : `@${role.name}`}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator />

                            <FormField
                                control={form.control}
                                name="guild_timezone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Guild&apos;s timezone
                                        </FormLabel>
                                        <TimezoneSelect
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator />
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
