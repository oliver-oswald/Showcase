import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is invalid' }),
	password: z.string({ required_error: 'Password is required' })
});

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required' })
			.regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces' })
			.min(2, { message: 'Name must be at least 2 characters' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),
		email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is invalid' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be at least 8 characters long and contain at least one letter, one number and one special character'
			}),
		passwordConfirm: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be at least 8 characters long and contain at least one letter, one number and one special character'
			})
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['passwordConfirm']
			});
		}
	});

const imageTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'image/gif',
	'image/svg+xml'
];

export const createProjectSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name must be at least 1 character long' })
		.max(64, { message: 'Name must be less than 64 characters long' })
		.trim(),
	tagline: z
		.string({ required_error: 'Tagline is required' })
		.min(1, { message: 'Tagline must be at least 1 character long' })
		.max(64, { message: 'Tagline must be less than 64 characters long' })
		.trim(),
	description: z
		.string({ required_error: 'Description is required' })
		.min(1, { message: 'Description must be at least 1 character long' })
		.max(512, { message: 'Description must be less than 512 characters long' })
		.trim(),
	url: z.string({ required_error: 'URL is required' }).url({ message: 'URL is invalid' }).trim(),
	thumbnail: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Thumbnail must be less than 5MB',
						path: ['thumbnail']
					});
				}
				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported image type. Supported types are: jpeg, jpg, png, webp, gif, svg',
						path: ['thumbnail']
					});
				}
			}
		}),
	user: z.string({ required_error: 'User is required' })
});

export const updateProjectSchema = createProjectSchema.omit({ user: true });

export const updateEmailSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email({ message: 'Email is invalid' })
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(1, { message: 'Username must be at least 1 character long' })
		.max(24, { message: 'Username must be less than 24 characters long' })
		.regex(/^[a-zA-Z0-9]+$/, { message: 'Username can only contain letters or numbers' })
		.trim()
});
