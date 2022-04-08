<!-- /////// SERVER SIDE //////// -->

<script context="module">
    /*
    Every page has a magic load() function that you place in the module script. Here 
    you can include code that gets run when the page first loads. Use it to retrieve 
    data, initialize things, etc.

    This is very similar to the onMount() function that you place in the main <script>
    block. However, (a) it is potentially run on the server if you set the page to be
    pre-rendered or it is server-side rendered and (b) it has to be "export"ed since this
    is a turned into a JavaScript module which is called by the SvelteKit framework itself.
    This example requires the async keyword. Asyncronous programming is a huge concept
    central to distributed application development. Discussed in lecture. Also:

        https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous

    The load function passes a single "context" object. This object contains multiple
    objects and methods (url, params, props, fetch, session and stuff) that can be used 
    by load. An import one is "fetch", which is what we use to retrieve data from a
    web service. The same function is built into the browser, but since this code can
    also be run on the server, you need to use the one in the context object.

    See: https://kit.svelte.dev/docs/loading
    */
    // export async function load(context) {
    //     let res = await context.fetch('https://jsonplaceholder.typicode.com/albums');

    // If you don't like calling context.fetch() (context.whatever), you can "destructure"
    // the JS object into individual variables.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    export async function load({ fetch }) {
        let res = await fetch('https://jsonplaceholder.typicode.com/albums');
        // let albumsJSON = res.json();
        // let albumsJSON = await res.json();
        let albums = await res.json();

        // The load() function exports props to the page. This is very much the same as
        // standard Svelte component props, except instead of setting props of a component
        // in the HTML page or a parent component, you set them in the module script.
        return {
            props: {
                // albums: albumsJSON
                albums  // short version since variable and prop have the same name
            }
        }
    }
</script>

<!-- /////// CLIENT SIDE //////// -->

<script>
    export let albums;   // accept as a PROP from the "module" script
</script>

<h1>All Albums</h1>

<ul>
    {#each albums as album}
        <!-- Here we dynamically create an <li><a> for each album -->
        <li><a href="/album/{album.id}">{album.title}</a>
    {/each}
</ul>
