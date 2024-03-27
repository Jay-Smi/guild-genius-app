"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { TimezoneSelect } from "@/components/timezone-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { updateGuildConfigAction } from "@/actions/update-guild";

type GuildConfigFormProps = {
    fullDiscordServer: any;
    defaults: z.infer<typeof GuildConfigSchema>;
    guildId: number;
};

export const GuildConfigForm = ({
    fullDiscordServer,
    defaults,
    guildId,
}: GuildConfigFormProps) => {
    const serverRoles = fullDiscordServer.roles;

    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof GuildConfigSchema>>({
        resolver: zodResolver(GuildConfigSchema),
        defaultValues: defaults,
    });

    const onSubmit = (values: z.infer<typeof GuildConfigSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        console.log("clicked");
        startTransition(() => {
            updateGuildConfigAction(values, guildId)
                .then((data) => {
                    if (data.error) setError(data.error);
                    if (data.success) {
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("An unknown error occurred"))
                .finally(() => {});
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
                                name="roles_that_may_join"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Roles permitted to join the guild
                                        </FormLabel>
                                        <FormDescription>
                                            Only selected roles will be
                                            permitted to join.
                                            <br />
                                            Allows anyone in your discord server
                                            with the appropriate role to join
                                            the guild, without further
                                            authorization.
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
                                                        name="roles_that_may_join"
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
                                name="roles_that_may_create_raids"
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
                                                        name="roles_that_may_create_raids"
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
