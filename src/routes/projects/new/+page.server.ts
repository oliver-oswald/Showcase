import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, "/login")
    }
};

export const actions: Actions = {
    create: async ({ request, locals }) => { 
        const formData = await request.formData();

        const thumbnail = formData.get("thumbnail") as File;

        if (thumbnail.size === 0) { 
            formData.delete("thumbnail");
        }

        formData.append("user", locals.user?.id as string);

        try {
            await locals.pb.collection("projects").create(formData);
        } catch(err) { 
            console.error(err); 
            throw error(500, "Internal Server Error");
        }

        throw redirect(303, "/my/projects");
    }
};
