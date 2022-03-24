<script>
    import '../styles.css';
    // Import the heading value from the store (use it below)
    import { heading } from "$lib/pageStore.js";

    // NOTE: We are going to use the "auto-subscribe" capabilities to
    // avoid having to "subscribe" or "get" the value of the store.
    // Instead we reference the value with {$heading}. There's some
    // "magic code" behind the scenes that basically gets the value
    // stored in a store (STORENAME) and sets it automatically to a
    // $-prefixed variable of the same name ($STORENAME).
</script>

<div id="wrapper">
    <header id="top">
        <h1>My Site!!</h1>
        <!-- And here you just reference the value using the $ prefix. -->
        <h2>{$heading}</h2>
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
