// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from '$lib/types';
import type PocketBase from 'pocketbase';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			user: User | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
