<svelte:head>
	<title>Use Stores to Set Heading</title>
</svelte:head>

<script>
    import { heading } from "$lib/pageStore.js";

    heading.set("Use Stores to Set Heading");
</script>

<p>
    This option uses SvelteKit's concept of a "store", which is simply a place to
    store shared data that can be accessed by any components, pages, layouts, etc.
    Beyond the scope (yet), but this is just a basic "writeable" store value.
    In this example I created lib/pageStore.js that contains a single value called heading.
    On this and all other pages, you simply need to import that value from the store
    and set it. In the __layout.svelte page, you basically "read" it by "subscribing"
    to a change in it's value. Easier to read the code than to understand my explanation.
</p>
<h3>Pros</h3>
<ul>
    <li>Not too many changes required</li>
    <li>Doesn't "flash" when updating</li>
    <li>Not terribly hard to grasp once you grasp the concept of SvelteKit stores</li>
    <li>Probably the "best" option for a simple value like this</li>
</ul>
<h3>Cons</h3>
<ul>
    <li>Yet another hack</li>
    <li>Ugly</li>
    <li>More complicated than the DOM option since you have to create the separate store and modify the layout</li>
</ul>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Ultrices dui sapien eget mi proin sed libero enim. Ornare lectus sit amet est placerat in egestas erat imperdiet. Odio pellentesque diam volutpat commodo sed. Faucibus scelerisque eleifend donec pretium vulputate. Egestas tellus rutrum tellus pellentesque. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Tristique magna sit amet purus gravida. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Hendrerit dolor magna eget est lorem ipsum dolor sit. Non blandit massa enim nec. Elit ullamcorper dignissim cras tincidunt lobortis. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Cum sociis natoque penatibus et magnis dis parturient montes. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam.</p>
