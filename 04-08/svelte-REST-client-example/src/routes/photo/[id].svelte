<script context="module">
    export async function load({fetch, params}) {
        let id = params.id;
        let res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
        let photo = await res.json();

        res = await fetch(`https://jsonplaceholder.typicode.com/albums/${photo.albumId}`);
        let album = await res.json();

        return {
            props: {
                photo, album
            }
        }
    }
</script>

<script>
    export let photo, album;
</script>

<h1>Album: <a href="/album/{album.id}">{album.title}</a></h1>
<h2>Photo: {photo.title}</h2>

<figure>
    <img src="{photo.url}" alt="{photo.title}" />
    <figcaption>{photo.title}</figcaption>
</figure>

<style>
    a {
        text-decoration: none;
        color: unset;
    }
    a:hover {
        text-decoration: underline;
    }
    figure {
        text-align: center;
    }
</style>