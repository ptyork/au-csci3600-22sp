<script>
  // @ts-nocheck

  export let book, copies;
  let bookId = book?.bookId;
  let bookTitle = book?.title
  let authorId = book?.authorId;
  let authorName = book?.author?.firstName + ' ' + book?.author?.lastName;

  // convert JSON date string to JS Date object
  for (let copy of copies) {
    copy.dateAdded = new Date(copy.dateAdded);
    copy.borrowCount = copy.borrows.length;

    copy.isBorrowed = false;
    if (copy.borrowCount > 0) {
      for (let borrow of copy.borrows) {
        if (borrow.returnDate == null) {
          copy.isBorrowed = true;
          break;
        }
      }
    }
  }

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/admin/authors">Book Inventory</a></li>
    <li class="breadcrumb-item"><a href="/admin/books?authorId={authorId}">{authorName}</a></li>
    <li class="breadcrumb-item">{bookTitle}</li>
  </ol>
</nav>

<h1>Copies of {bookTitle}</h1>

<a role="button" class="btn btn-primary" href="/admin/bookCopies/add?bookId={bookId}">Add New Copy</a>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Date Added</th>
      <th scope="col">Borrow Count</th>
      <th scope="col">Is Borrowed</th>
      <th scope="col">Is Available</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {#each copies as copy}
    <tr>
      <td>{copy.dateAdded.toLocaleString()}</td>
      <td>{copy.borrowCount}</td>
      <td>{copy.isBorrowed}</td>
      <td>{copy.isAvailable}</td>
      <td>
        <a role="button" class="btn btn-sm btn-primary" href="/admin/bookCopies/toggle?copyId={copy.copyId}">Toggle Availability</a>
      </td>
    </tr>
  {/each}
  <tbody>
</table>
