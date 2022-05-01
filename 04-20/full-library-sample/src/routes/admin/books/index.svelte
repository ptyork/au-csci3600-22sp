<script>
  // @ts-nocheck

  export let author, books;
  let authorId = author?.authorId;
  let authorName = author?.firstName + ' ' + author?.lastName;

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/admin/authors">Book Inventory</a></li>
    <li class="breadcrumb-item">{authorName}</li>
  </ol>
</nav>

<h1>Books for {authorName}</h1>

<a role="button" class="btn btn-primary" href="/admin/books/add?authorId={authorId}">Add New Book</a>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Year Written</th>
      <th scope="col">Edition</th>
      <th scope="col">Price</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {#each books as book}
    <tr>
      <td>{book.title}</td>
      <td>{book.yearWritten}</td>
      <td>{book.edition}</td>
      <td>{book.price}</td>
      <td>
        <a role="button" class="btn btn-sm btn-primary" href="/admin/books/{book.bookId}">Edit Book</a>
        <a role="button" class="btn btn-sm btn-primary" href="/admin/bookCopies?bookId={book.bookId}">Manage Copies</a>
      </td>
    </tr>
  {/each}
  <tbody>
</table>
