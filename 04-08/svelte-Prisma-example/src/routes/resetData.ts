import { seedData } from '$lib/database';

export async function get() {
    await seedData();
    return {
        status: 303,
        headers: {
            location: "/"
        }
    }
}