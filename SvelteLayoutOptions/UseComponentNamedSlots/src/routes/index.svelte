<svelte:head>
	<title>Use a Component with Named Slots to Set Heading</title>
</svelte:head>

<script>
    import Layout from "$lib/Layout.svelte";
</script>

<!-- Wrap the ENTIRE content of the page the component. -->
<!-- Set the heading value as a prop of the component. -->
<Layout>
    <span slot="heading">Use a Component with Named Slots to Set Heading</span>

    <div slot="content">
        <p>
            This option entirely bypasses SvelteKit's __layout system. Instead we treat the layout
            as a component and shove each "page" component inside of it. Unlike the other "UseComponentProps"
            solution, this one leverages "named slots". In the Layout component, instead of just having
            a single slot, we have TWO slots, each with a name. Here on the page, we have either a
            &lt; div &gt; or a &lt; span &gt; with the slot attribute set to the name of the slot that
            it is supposed to be "slotted" into. This is super flexible, since more than a single line
            can be inserted into each slot, including additional markup. And it's likely the "best"
            overall solution. But it's wordy.
        </p>
        <h3>Pros</h3>
        <ul>
            <li>Most changes required of all solutions</li>
            <li>Doesn't "flash" when updating</li>
            <li>Not terribly hard to grasp once you grasp the concept of SvelteKit components</li>
            <li>Definitely the most flexible solution since it allows ANY content to be slotted ANYWHERE</li>
        </ul>
        <h3>Cons</h3>
        <ul>
            <li>Bypasses the built-in layout system</li>
            <li>Have to enclose the body of each page inside of a component</li>
            <li>Further have to enclose each "slot" of the page inside a div or span</li>
        </ul>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Ultrices dui sapien eget mi proin sed libero enim. Ornare lectus sit amet est placerat in egestas erat imperdiet. Odio pellentesque diam volutpat commodo sed. Faucibus scelerisque eleifend donec pretium vulputate. Egestas tellus rutrum tellus pellentesque. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Tristique magna sit amet purus gravida. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Hendrerit dolor magna eget est lorem ipsum dolor sit. Non blandit massa enim nec. Elit ullamcorper dignissim cras tincidunt lobortis. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Cum sociis natoque penatibus et magnis dis parturient montes. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam.</p>
    </div>
</Layout>
