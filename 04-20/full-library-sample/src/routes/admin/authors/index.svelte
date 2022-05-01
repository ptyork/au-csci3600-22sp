<script>
  // @ts-nocheck

  export let authors;

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item">Book Inventory</li>
  </ol>
</nav>

<h1>All Authors</h1>

<a role="button" class="btn btn-primary" href="/admin/authors/add">Add New Author</a>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Last Name</th>
      <th scope="col">First Name</th>
      <th scope="col">Born</th>
      <th scope="col">Died</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {#each authors as author}
    <tr>
      <td>{author.lastName}</td>
      <td>{author.firstName}</td>
      <td>{author.yearOfBirth}</td>
      <td>{author.yearOfDeath == 9999 ? "" : author.yearOfDeath}</td>
      <td>
        <a role="button" class="btn btn-sm btn-primary" href="/admin/authors/{author.authorId}">Edit Author</a>
        <a role="button" class="btn btn-sm btn-primary" href="/admin/books?authorId={author.authorId}">Books</a>
      </td>
    </tr>
  {/each}
  <tbody>
</table>
