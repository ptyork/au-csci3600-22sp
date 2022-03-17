<svelte:head>
	<title>Use a Component and Props to Set Heading</title>
</svelte:head>

<script>
    import Layout from "$lib/Layout.svelte";
</script>

<!-- Wrap the ENTIRE content of the page the component. -->
<!-- Set the heading value as a prop of the component. -->
<Layout heading="Use a Component and Props to Set Heading">
    <p>
        This option entirely bypasses SvelteKit's __layout system. Instead we treat the layout
        as a component and shove each "page" component inside of it. To set the heading value, we
        simply set the "heading" prop of this component, which itself is "exported" from and used
        in the lib/Layout.svelte component. This is probably the most "elegant" solution, but it's
        never a great thing to have to bypass a built-in feature like this.
    </p>
    <h3>Pros</h3>
    <ul>
        <li>Not too many changes required</li>
        <li>Doesn't "flash" when updating</li>
        <li>Not terribly hard to grasp once you grasp the concept of SvelteKit components</li>
        <li>Probably the most elegant option for a simple value like this</li>
    </ul>
    <h3>Cons</h3>
    <ul>
        <li>Bypasses the built-in layout system</li>
        <li>Have to enclose the body of each page inside of a component</li>
        <li>Only works if your "other" values are simple like the heading text in this example</li>
    </ul>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Ultrices dui sapien eget mi proin sed libero enim. Ornare lectus sit amet est placerat in egestas erat imperdiet. Odio pellentesque diam volutpat commodo sed. Faucibus scelerisque eleifend donec pretium vulputate. Egestas tellus rutrum tellus pellentesque. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Tristique magna sit amet purus gravida. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Hendrerit dolor magna eget est lorem ipsum dolor sit. Non blandit massa enim nec. Elit ullamcorper dignissim cras tincidunt lobortis. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Cum sociis natoque penatibus et magnis dis parturient montes. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam.</p>
</Layout>
