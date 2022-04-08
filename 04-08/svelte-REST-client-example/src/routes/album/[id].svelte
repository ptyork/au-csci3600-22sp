<script context="module">
    /*
    This page takes a "route parameter" called id. We know this because we 
    named the page using [id].svelte (i.e., the route parameter will be in
    square brackets). We can retreive this in the load() method using the 
    context.params object, which will contain a property with a name matching
    whatever is in between the [ and ]. You will often see this referred to 
    as a "slug".
    */
    export async function load({fetch, params}) {
        let id = params.id;   // or params['id']

        // NOTE: USING BACKTICK (`) IN THE URL STRINGS BELOW TO ALLOW INTERPOLATION.
        
        // Because these are async, we can't directly chain them together
        // let photos = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`).json();
        
        // We COULD do this:
        // let photos = await (await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)).json();
        
        // BUT, let's just do it the long way
        let res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
        let photos = await res.json();

        // We also need the album itself to get the title
        // No let on the res this time since it is already declared.
        res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
        let album = await res.json();

        return {
            props: {
                album,
                photos
            }
        }
    }
</script>

<script>
    // export let album, photos;
    export let album;
    export let photos;
</script>

<!-- fancy HTML stuff -->

<h1>Album: {album.title}</h1>

<div>
    {#each photos as photo}
        <a href="/photo/{photo.id}">
            <figure>
                <img src="{photo.thumbnailUrl}" alt="{photo.title}" />
                <figcaption>{photo.title}</figcaption>
            </figure>
        </a>
    {/each}
</div>

<style>
    /* NOTE: Because we are using Svelte's page-level (really component-level)
             styling, we can get away with selecting such broad selectors
             since they will be scoped to this page ONLY.
    */
    a {
        text-decoration: none;
    }
    div {
        display: flex;
        flex-wrap: wrap;
    }
    figure {
        width: 170px;
        text-align: center;
    }
</style>