import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import type { User } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('https://ollis-test-pocketbase.fly.dev/');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs<User>(event.locals.pb.authStore.model as User);
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
};
