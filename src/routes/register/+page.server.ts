import { generateUsername } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    register: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        let username = body.name as string;

        username = generateUsername(username.split(" ").join("")).toLowerCase();

        try {
            await locals.pb.collection("users").create({ username, ...body });
            await locals.pb.collection("users").requestVerification(body.email as string);
        } catch (err) {
            console.error(err);
            throw error(500, "Something went wrong")
        }

        throw redirect(303, "/login");
    }
}