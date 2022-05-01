<script>
  // @ts-nocheck

  export let patron;
  let fullName = patron.firstName + ' ' + patron.lastName;
  let modalMessage = "";
  let filtered = true;

  // JSON (and thus SvelteKit) doesn't do dates. The date string in
  // each JSON object must be converted to a JS date.

  for (let bookBorrow of patron.borrows) {
    bookBorrow.borrowDate = new Date(bookBorrow.borrowDate);
    bookBorrow.dueDate = new Date(bookBorrow.dueDate);
  }

  async function returnBook({ event }) {
    let borrowId = this.dataset.borrowId;
    let url = `/api/returnBook?borrowId=${borrowId}`;
    console.debug(url);
    let response = await fetch(url);
    if (response.ok) {
      let jsonResponse = await response.json();
      // console.debug(JSON.stringify(jsonResponse))

      // Update the patron.borrows variable...this is "bound" to the  UI below,
      // and will thus cause the entire UI to update to reflect the new value(s)
      
      let returnedBook = jsonResponse.returnedBook;
      patron.borrows = jsonResponse.borrows;

      // We'll also show a confirmation message.
      
      console.debug(returnedBook);
      modalMessage = `
Thank you for returning ${returnedBook.bookCopy.book.title}!!
      `;
      let elem = document.getElementById('returnModal');
      let modl = new bootstrap.Modal(elem);
      modl.show();

    } else {
      let value = await response.json();
      modalMessage = value.message;
      let elem = document.getElementById('returnModal');
      let modl = new bootstrap.Modal(elem);
      modl.show();

    }
  }
</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item">Borrowed Books</li>
  </ol>
</nav>

<h1>Borrowed Books</h1>
<h2>{fullName}</h2>

<div class="form-check form-switch">
  <input id="filterList" type="checkbox" role="switch" class="form-check-input"
         bind:checked={filtered}>
  <label for="filterList" class="form-check-label">Show Only Unreturned Books</label>
</div>

<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Date Borrowed</th>
      <th scope="col">Date Due</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {#each patron.borrows as bookBorrow}
  {#if !filtered || !bookBorrow.returnDate}
    <tr>
      <td>{bookBorrow.bookCopy.book.title}</td>
      <td>{bookBorrow.bookCopy.book.author.firstName} {bookBorrow.bookCopy.book.author.lastName}</td>
      <td>{bookBorrow.borrowDate.toLocaleString()}</td>
      <td>{bookBorrow.dueDate.toLocaleString()}</td>
      <td>
        {#if !bookBorrow.returnDate}
        <button class="btn btn-sm btn-primary" on:click={returnBook} data-borrow-id={bookBorrow.borrowId}>Return</button>
        {/if}
      </td>
    </tr>
  {/if}
  {/each}
  <tbody>
</table>

<!-- BOOTSTRAP MODAL -->

<div class="modal fade" id="returnModal" tabindex="-1" aria-labelledby="returnModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="returnModalLabel">Return Results</h5>
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
