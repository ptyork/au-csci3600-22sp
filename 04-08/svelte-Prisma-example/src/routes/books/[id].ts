import { prisma } from '$lib/database';

export async function get({ params }) {
    // `params.id` comes from [id].js
    let bookId = parseInt(params.id);

    let book = await prisma.book.findUnique({
        where: { id: bookId },
        include: { author: true }
    });
    if (!book) {
        return {
            status: 404
        }
    } else {
        return {
            body: {
                book
            }
        }
    }
}
