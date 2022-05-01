<script>
  function clearData() {
    window.location.href = '/clearData';
  }
  function resetData() {
    window.location.href = '/resetData';
  }
</script>


<h1>Welcome to the Old York Library</h1>
<h2>We Lend Good Book</h2>

<p>
  Thanks for visting. Feel free to browse. However, if you want to borrow
  or return books, you'll need to login using the link in the upper-right
  hand corner of the page.
</p>

<aside>
  <button on:click={clearData}>Click to Clear the Database</button>
  <button on:click={resetData}>Click to Clear and Seed the Database</button>
</aside>
