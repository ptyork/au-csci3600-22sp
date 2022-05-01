<script>
  // @ts-nocheck

  export let book;

  let availableCopies = 0;
  let modalMessage = "";

  $: {
    availableCopies = 0;
    for (let copy of book.copies) {
      if (copy.isAvailable) {
        availableCopies++;
      }
    }
  }

  let imageURL = book.picURL;
  if (!imageURL) {
    imageURL = "/book-icon.webp"
  }

  async function borrowBook() {
    let url = `/api/borrowBook?bookId=${book.bookId}`;
    console.debug(url);
    let response = await fetch(url);
    if (response.ok) {
      let jsonResponse = await response.json();
      // console.debug(JSON.stringify(jsonResponse))

      // Update the book variable...this is "bound" to the  UI below,
      // and will thus cause the entire UI to update to reflect the new value(s)
      
      book = jsonResponse.book;

      // We'll also show a confirmation message that will include the due
      // date. This is stored in the bookBorrow object, which is also
      // returned from the API. Retrieve it. BUT, JSON doesn't do dates.
      // The date string in the JSON object must be converted to a JS date.
      
      let bookBorrow = jsonResponse.bookBorrow;
      bookBorrow.dueDate = new Date(bookBorrow.dueDate);

      // Finally, let's show a confirmation message. This is using Bootstrap's
      // built-in Modal component. modalMessage is a variable embedded in the
      // modal <div> below. So setting it and then calling the appropraite
      // Bootstrap methods to show the Modal component does some magic.

      modalMessage = `
Enjoy reading ${book.title}!! It is due back in the library
on ${bookBorrow.dueDate.toDateString()}.
      `;
      let elem = document.getElementById('borrowModal');
      let modl = new bootstrap.Modal(elem);
      modl.show();

    } else {
      let value = await response.json();
      modalMessage = value.message;
      let elem = document.getElementById('borrowModal');
      let modl = new bootstrap.Modal(elem);
      modl.show();
    }
  }

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/authors">Browse</a></li>
    <li class="breadcrumb-item"><a href="/authors/{book.author.authorId}">{book.author.firstName} {book.author.lastName}</a></li>
    <li class="breadcrumb-item active" aria-current="page">{book.title}</li>
  </ol>
</nav>

<div class="row">
  <div class="col-xs-6 col-sm-4 col-md-3">
    <img src={imageURL} alt={book.title} style="width:100%" />
  </div>
  <div class="col">
    <h1>{book.title}</h1>

    <table class="info">
      <tr>
        <th scope="row">Author:</th>
        <td><a href="/authors/{book.author.authorId}">{book.author.firstName} {book.author.lastName}</a></td>
      </tr>
      <tr>
        <th scope="row">Year Written:</th>
        <td>{book.yearWritten}</td>
      </tr>
      <tr>
        <th scope="row">Edition:</th>
        <td>{book.edition}</td>
      </tr>
      <tr>
        <th scope="row">Purchase Price:</th>
        <td>{book.price}</td>
      </tr>
      <tr>
        <th scope="row">Copies Available:</th>
        <td>{availableCopies}</td>
      </tr>
    </table>
  </div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-4 col-md-3 text-center">
    {#if availableCopies > 0}
    <button class="btn btn-primary" on:click={borrowBook}>Borrow a Copy</button>
    {:else}
    <button class="btn btn-primary" disabled>No Copies Available</button>
    {/if}
  </div>
</div>


<!-- BOOTSTRAP MODAL -->

<div class="modal fade" id="borrowModal" tabindex="-1" aria-labelledby="borrowModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="borrowModalLabel">Borrow Results</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {modalMessage}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<style>
  .info a {
    text-decoration: none;
    color: inherit;
  }
  .info {
    font-size: 1.1rem
  }
  .info th, .info td {
    padding: 0.2rem 0.5rem;
  }
</style>