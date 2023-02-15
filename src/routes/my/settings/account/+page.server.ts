import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    updateEmail: async ({ request, locals }) => { 
        const data = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('users').requestEmailChange(data.email as string);
        } catch (err) {
            console.error(err);
            throw error(400, 'Error updating email');
        }

        return {
            success: true
        }
    },
    updateUsername: async ({ request, locals }) => { 
        const data = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`)
        } catch (err: any) {
            if (err.status === 404) {
                try {
                    const { username } = await locals.pb.collection('users').update(locals.user?.id as string, { username: data.username });
                    if (locals.user) {
                        locals.user.username = username;
                    }
                    return {
                        success: true
                    }
                } catch (err) {
                    console.error(err);
                    throw error(400, 'Error updating username');
                }
            }
            console.error(err);
            throw error(err.status, err.message);
        }
    }
};