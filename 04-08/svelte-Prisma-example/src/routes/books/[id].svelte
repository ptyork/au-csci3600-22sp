<script>
  export let book;
</script>

<a href="/">&lt; Back</a>

<h1>{book.title}</h1>

<h2>{book.author.firstName} {book.author.lastName}</h2>

<table>
  <tr>
    <th>Year Written</th>
    <td>{book.yearWritten}</td>
  </tr>
  <tr>
    <th>Edition</th>
    <td>{book.edition}</td>
  </tr>
  <tr>
    <th>Price</th>
    <td>$ {book.price.toFixed(2)}</td>
  </tr>
</table>

<style>
  table {
    border-collapse: collapse;
  }
  td, th {
    border: 1px solid black;
    padding: 10px 20px;
  }
  th {
    text-align: right;
    background-color: black;
    color: white;
  }
</style>