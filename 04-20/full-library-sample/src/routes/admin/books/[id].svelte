<script>
  export let book, errorMessage;

  // bookId      Int        @id @default(autoincrement())
  // title       String     @db.VarChar(200)
  // yearWritten Int?
  // edition     String?    @db.VarChar(50)
  // price       Float?
  // picURL      String?    @db.VarChar(200)
  // author      Author     @relation(references: [authorId], fields: [authorId])
  // authorId    Int
  // copies      BookCopy[]

  let title = book?.title ?? "";
  let yearWritten = book?.yearWritten ?? "";
  let edition = book?.edition ?? "";
  let price = book?.price ?? "";
  let picURL = book?.picURL ?? "";

  let authorName = book.author.firstName + " " + book.author.lastName;
  let authorId = book.authorId;

  function confirm(event) {
    if (!window.confirm("You sure you want to delete this book")) {
      event.preventDefault();
    }
  }

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/admin/authors">Book Inventory</a></li>
    <li class="breadcrumb-item"><a href="/admin/books?authorId={authorId}">{authorName}</a></li>
    <li class="breadcrumb-item">Edit Book</li>
  </ol>
</nav>

<h1>Book Information</h1>

{#if errorMessage}
<div class="alert alert-danger" role="alert">
  {errorMessage}
</div>
{/if}

<form method="post">

  <div class="row g-3">

    <div class="col-md-6">
      <label for="title">Title</label>
      <input name="title" id="firstName" type="text" class="form-control"
              placeholder="Book Title" required maxlength="200"
              bind:value={title} />
    </div>
    <div class="col-md-6">
      <label for="edition">Description of Edition</label>
      <input name="edition" id="edition" type="text" class="form-control"
              placeholder="Description of Edition" maxlength="50"
              bind:value={edition} />
    </div>
    <div class="col-md-3">
      <label for="yearWritten" class="form-label">Year Written</label>
      <input name="yearWritten" id="yearWritten" type="number" class="form-control"
              placeholder="####" min="0" max="2100"
              bind:value={yearWritten}>
    </div>
    <div class="col-md-3">
      <label for="price" class="form-label">Purchase Price</label>
      <input name="price" id="price" type="tel" class="form-control"
              placeholder="00000.00" title="00000.00"
              pattern={"\\d{1,6}(\\.\\d{1,2})?"} maxlength="9"
              bind:value={price}>
    </div>
    <div class="col-md-6">
      <label for="picURL" class="form-label">URL of Picture</label>
      <input name="picURL" id="picURL" type="url" class="form-control"
              placeholder="https://domain.com/location" maxlength="200"
              bind:value={picURL} />
    </div>
  
  </div>
  
  <br>

  <!-- 
    BY GIVING BUTTONS A NAME AND VALUE, THE CLICKED BUTTON WILL BE PASSED
    ALONG WITH THE REST OF THE FORM DATA AS name=value. IN THIS CASE EITHER
    action=update OR action=delete.
    IF NO BUTTON IS PRESSED, THE FIRST BUTTON IS CONSIDERED THE "DEFAULT".

    https://stackoverflow.com/questions/925334
   -->

  <button type="submit" class="btn btn-primary" name="action" value="update">Update Book</button>
  <button type="submit" class="btn btn-danger" name="action" value="delete" on:click={confirm}>Delete Book</button>

</form>

