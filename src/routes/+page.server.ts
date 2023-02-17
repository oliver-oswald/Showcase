import type { Project } from "$lib/types";
import { serializeNonPOJOs } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { ClientResponseError } from "pocketbase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({locals}) => {
    const getProjects = async () => {
        try {
            const projects = serializeNonPOJOs<Project[]>(await locals.pb.collection('projects').getFullList());
            return projects
        } catch (err) {
            console.error(err);
            const e = err as ClientResponseError;
            throw error(e.status, e.message);
        }
    }

    return {
        projects: getProjects(),
    }
}