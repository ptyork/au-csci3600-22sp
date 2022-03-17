<script>
    import '../styles.css';

    // import the heading value from the store
    import { heading } from "$lib/pageStore.js";

    // now "subscribe" to changes to this value. Whenever the value
    // changes, the arrow function is called, which will change the
    // headingValue to the new value of the heading store.
    // That value is used in the <h2>...</h2> below.
	let headingValue = "CAN'T READ HEADING FROM STORE";
	heading.subscribe((value) => {
		headingValue = value;
	});
</script>

<div id="wrapper">
    <header id="top">
        <h1>My Site!!</h1>
        <h2>{headingValue}</h2>
    </header>
    <nav>
        <a href="#top">LINK 1</a>
        &nbsp;&nbsp;
        <a href="#top">LINK 2</a>
        &nbsp;&nbsp;
        <a href="#top">LINK 3</a>
    </nav>
    <main>
        <slot></slot>
    </main>
    <footer>
        Copyright &copy; 2022, My Left Footer
    </footer>
</div>
