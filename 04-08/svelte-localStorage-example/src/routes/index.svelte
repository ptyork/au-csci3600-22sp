<script>
	import { onMount } from 'svelte';

    let textFormValue;
    let storedText;
    let bgcolor;
    let ready = false;
    let fgcolor;

    onMount(function() {
        // Retrieve the stored value from local storage. Note that it will
        // default to "null" if no value has been stored.
        storedText = localStorage.getItem("text");

        // Note that you can use the "null coalesce" operator to provide
        // a default value if the key doesn't exist
        bgcolor = localStorage.getItem("bgcolor") ?? "black";

        // Unfortunately, no (built-in) way to bind a javascript value to
        // a <style> declaration. So we'll just use javascript to change it.
        document.querySelector('#wrapper').style.backgroundColor = bgcolor;

        // Although, if we use a "reactive block" (see below), the DOM update
        // can be made to happen "automagically" whenver a variable value changes.
        fgcolor = localStorage.getItem("fgcolor") ?? "white";

        // Unfortunately, due to some weirdness related to some of this being
        // code being generated on the server-side (which will NOT have access
        // to localStorage) AND weirdness related to the order in which the
        // reactive block is run (being run even when the fgcolor variable is
        // declared resulting in "undefined" being saved to localStorage),
        // I had to create an artificial "ready" flag to prevent this.
        ready = true;

        // SIDE NOTE: A Svelte Store that directly accesses localStorage instead
        // of embedding localStorage calles in the Svelte pages/components would
        // be a better solution and would get around these issues.
        // See: https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
    });

    function saveText() {
        // The textFormValue variable is bound to the <input> value so this is simple
        localStorage.setItem("text", textFormValue);// put it in local storage
        storedText = textFormValue;                 // update the bound variable
        textFormValue = "";                         // clear the text box
    }

    function bgcolorChange() {
        // note that in practice, the name of the fields, variables and storage
        // locations are often the same. Here I use bgcolor for all three.
        localStorage.setItem("bgcolor", bgcolor);
        document.querySelector('#wrapper').style.backgroundColor = bgcolor;
    }

    // Svelte has an AWESOME feature where you can just create reactive blocks of
    // code that will get run whenver any variable referenced inside of them gets
    // changed. So here we replace the whold bgcolorChange function concept as 
    // well as the need to update the DOM backgroundColor each time it changes
    // with a reactive block that runs wheneve the fgcolor variable changes.
    $: {
        if (ready) { // see above for "why" I need this check
            localStorage.setItem("fgcolor", fgcolor);
            document.querySelector('#wrapper').style.color = fgcolor;
        }
    }

    function clearStore() {
        // For the example, I'll  reset the bound variables first
        storedText = null;
        bgcolor = "black"; // default value
        document.querySelector('#wrapper').style.backgroundColor = bgcolor;
        fgcolor = "white"; // default value -- auto sets the style unlike bgcolor (see above)

        localStorage.clear();

        // or clear individual items
        // localStorage.removeItem("text");
        // localStorage.removeItem("bgcolor");
        // localStorage.removeItem("fgcolor");

    }
    
</script>

<svelte:head>
    <title>Local Storage Test</title>
    <style>
        body { background-color: darkblue }
    </style>
</svelte:head>
    
<div id="wrapper">
    <h1>Local Storage Test</h1>

    <b>Stored Text:</b> {storedText}
    
    <br><br>
    
    <form on:submit|preventDefault={saveText}>
        <label for="newText">New Stored Text:</label>
        <input bind:value={textFormValue} id="newText">
        <button type="submit">Save</button>
    </form>
    <br><br>
    
    <fieldset>
        <legend>Background Color</legend>
        <label>
            <input type="radio" name="bgcolor" value="black" bind:group={bgcolor} on:change={bgcolorChange}>
            Black
        </label>
        <br>
        <label>
            <input type="radio" name="bgcolor" value="blue" bind:group={bgcolor} on:change={bgcolorChange}>
            Blue
        </label>
        <br>
        <label>
            <input type="radio" name="bgcolor" value="red" bind:group={bgcolor} on:change={bgcolorChange}>
            Red
        </label>
    </fieldset>

    <br>

    <fieldset>
        <legend>Foreground Color</legend>
        <label>
            <input type="radio" name="fgcolor" value="white" bind:group={fgcolor}>
            White
        </label>
        <br>
        <label>
            <input type="radio" name="fgcolor" value="limegreen" bind:group={fgcolor}>
            Green
        </label>
        <br>
        <label>
            <input type="radio" name="fgcolor" value="orange" bind:group={fgcolor}>
            Orange
        </label>
    </fieldset>

    <br><br>

    <button on:click={clearStore}>Clear Local Storage</button>

</div>


<style>
    #wrapper {
        margin: 10px auto;
        padding: 20px;
        max-width: 500px;
        color: white;
        background-color: black;
        border: 5px solid yellow;
        font-weight: bold;
    }
</style>