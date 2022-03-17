<script>
    import '../styles.css';
</script>

<div id="wrapper">
    <header id="top">
        <h1>My Site!!</h1>
        <h2>Page Title</h2>
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
