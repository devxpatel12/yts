"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"

const uploadShortSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    video: z.string(),
});

type UploadShortState = {
    errors: {
        title?: string[];
        description?: string[];
        video?: string[];
        formError?: string[];
    }
}

export const uploadShort = async (prevState: UploadShortState, formData: FormData): Promise<UploadShortState> => {
    console.log(formData);

    const result = uploadShortSchema.safeParse({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        video: formData.get("video") as string,
    });


    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }
    // check authentication before creating a short
    const { userId } = await auth();
    if (!userId) {
        return {
            errors: {
                formError: ["Please login first to create a reel."]
            }
        }
    }
    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    });

    try {
        if (!user?.id) {
            return {
                errors: {
                    formError: ["User not found."]
                }
            }
        }

        await prisma.short.create({
            data: {
                title: result.data.title,
                description: result.data.description,
                url: result.data.video,
                userId: user.id
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    formError: ['Something went wrong please try again.']
                }
            }
        }
    }
    revalidatePath("/");
    redirect("/");
}