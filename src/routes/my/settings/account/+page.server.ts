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
    }
};