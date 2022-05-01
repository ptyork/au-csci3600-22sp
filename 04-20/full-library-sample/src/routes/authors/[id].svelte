<script>
  export let author, books;

  for (let book of books) {
    let availableCopies = 0;
    for (let copy of book.copies) {
      if (copy.isAvailable) {
        availableCopies++;
      }
    }
    book.availableCopies = availableCopies;
  }

  let fullName = author.firstName + ' ' + author.lastName;

  console.log(author);

  let imageUrl = author.picURL;
  if (!imageUrl) {
    imageUrl = "/avatar.png"
  }

  function selectBook() {
    let bookId = this.dataset.bookId;
    window.location.href = `/books/${bookId}`;
  }

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/authors">Browse</a></li>
    <li class="breadcrumb-item active" aria-current="page">{fullName}</li>
  </ol>
</nav>

<div class="row">
  <div class="col-sm-6 col-md-4 col-lg-3">
    <img src={imageUrl} alt={fullName} style="width:100%" />
  </div>
  <div class="col">
    <h1>{fullName}</h1>

    <table class="info">
      <tr>
        <th scope="row">Year of Birth:</th>
        <td>{author.yearOfBirth}</td>
      </tr>
      <tr>
        <th scope="row">Year of Death:</th>
        <td>{author.yearOfDeath ?? "STILL KICKING"}</td>
      </tr>
    </table>
  </div>
</div>

<hr />

<h2>Books</h2>

<table class="table table-hover">
  <thead>
    <th scope="row">Year Written</th>
    <th scope="row">Title</th>
    <th scope="row">Edition</th>
    <th scope="row">Available</th>
  </thead>
  <tbody>
  {#each books as book}
    <tr role="button" data-book-id={book.bookId} on:click={selectBook}>
      <td>{book.yearWritten}</td>
      <td>{book.title}</td>
      <td>{book.edition}</td>
      <td>{book.availableCopies}</td>
    </tr>
  {/each}
  </tbody>
</table>

<style>
  .info {
    font-size: 1.1rem
  }
  .info th, .info td {
    padding: 0.2rem 0.5rem;
  }
</style>
