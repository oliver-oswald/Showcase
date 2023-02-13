import { error } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    resetPassword: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            locals.pb.collection('users').requestPasswordReset(body.email as string);
            return {
                success: true
            }
        } catch (err) {
            console.error(err);
            throw error(500, 'Something went wrong');
        }
    }
}