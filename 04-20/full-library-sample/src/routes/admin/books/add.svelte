<script>
  export let author, book;

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

  let authorName = author.firstName + " " + author.lastName;
  let authorId = author.authorId;

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/admin/authors">Book Inventory</a></li>
    <li class="breadcrumb-item"><a href="/admin/books?authorId={authorId}">{authorName}</a></li>
    <li class="breadcrumb-item">Add New Book</li>
  </ol>
</nav>

<h1>Add New Book for {authorName}</h1>

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

  <button type="submit" class="btn btn-primary">Create Book</button>

</form>

