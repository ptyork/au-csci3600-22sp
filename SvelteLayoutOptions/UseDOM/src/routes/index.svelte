<svelte:head>
	<title>Use DOM to Set Heading</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    onMount(() => {
        document.querySelector('h2').innerHTML='Use DOM to Set Heading';
    });
</script>

<p>
    This option uses the JavaScript Document object to change the page heading after it has loaded.
    You simply need to modify and append the onMount script at the top of each page.
</p>
<h3>Pros</h3>
<ul>
    <li>Easy to do with no other changes</li>
    <li>Doesn't rely on Svelte magic</li>
</ul>
<h3>Cons</h3>
<ul>
    <li>A terrible hack</li>
    <li>Ugly</li>
    <li>"Default" title shows until page has finished loading</li>
    <li>A terrible hack</li>
    <li>Ugly</li>
</ul>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<p>Ultrices dui sapien eget mi proin sed libero enim. Ornare lectus sit amet est placerat in egestas erat imperdiet. Odio pellentesque diam volutpat commodo sed. Faucibus scelerisque eleifend donec pretium vulputate. Egestas tellus rutrum tellus pellentesque. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. Tristique magna sit amet purus gravida. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Hendrerit dolor magna eget est lorem ipsum dolor sit. Non blandit massa enim nec. Elit ullamcorper dignissim cras tincidunt lobortis. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Cum sociis natoque penatibus et magnis dis parturient montes. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam.</p>
