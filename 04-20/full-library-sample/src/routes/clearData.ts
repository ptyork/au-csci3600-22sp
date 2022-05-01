import { clearData } from '$lib/database';

export async function get() {
    await clearData();
    return {
        status: 303,
        headers: {
            location: "/"
        }
    }
}