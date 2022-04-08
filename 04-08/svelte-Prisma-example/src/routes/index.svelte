<script>
  export let authors;

  function resetData() {
    window.location.href = '/resetData';
  }
</script>

<h1>Super-Simple Library</h1>

<h2>Authors and Books</h2>

<table>
  <tr>
    <th><a href="?sort=name">Name</a></th>
    <th><a href="?sort=yearOfBirth">Born</a></th>
    <th><a href="?sort=yearfOfDeath">Died</a></th>
    <th>Books</th>
  </tr>
  {#each authors as author}
    <tr>
      <td>{author.lastName}, {author.firstName}</td>
      <td>{author.yearOfBirth}</td>
      <td>{author.yearOfDeath ?? ""}</td>
      <td>
        {#each author.books as book}
          <a href="/books/{book.id}">{book.title} ({book.yearWritten})</a><br>
        {/each}
      </td>
    </tr>
  {/each}
</table>

<aside>
  <button on:click={resetData}>Click to Clear and Seed the Database</button>
</aside>

<style>
  table {
    border-collapse: collapse;
  }
  td, th {
    border: 1px solid black;
    padding: 5px;
  }
  td {
    vertical-align: top;
  }
  button {
    background-color: red;
    color: white;
    font-weight: bold;
    padding: 5px;
    margin: 10px 0;
  }
</style>