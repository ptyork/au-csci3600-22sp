<script>
  export let author;

  // authorId    Int     @id @default(autoincrement())
  // firstName   String? @db.VarChar(50)
  // lastName    String  @db.VarChar(50)
  // yearOfBirth Int
  // yearOfDeath Int?
  // picURL      String? @db.VarChar(200)
  // books       Book[]

  let firstName = author?.firstName ?? "";
  let lastName = author?.lastName ?? "";
  let yearOfBirth = author?.yearOfBirth ?? "";
  let yearOfDeath = author?.yearOfDeath ?? "";
  let picURL = author?.picURL ?? "";

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/admin/authors">Book Inventory</a></li>
    <li class="breadcrumb-item">Add New Author</li>
  </ol>
</nav>

<h1>Add New Author</h1>

<form method="post">

  <div class="row g-3">

    <div class="col-md-6">
      <label for="firstName">First Name</label>
      <input name="firstName" id="firstName" type="text" class="form-control"
             placeholder="First Name" required maxlength="50"
             bind:value={firstName} />
    </div>
    <div class="col-md-6">
      <label for="lastName">Last Name</label>
      <input name="lastName" id="lastName" type="text" class="form-control"
             placeholder="Last Name" required maxlength="50"
             bind:value={lastName} />
    </div>
    <div class="col-md-3">
      <label for="yearOfBirth" class="form-label">Year of Birth</label>
      <input name="yearOfBirth" id="yearOfBirth" type="number" class="form-control"
             placeholder="####" required min="0" max="2100"
             bind:value={yearOfBirth}>
    </div>
    <div class="col-md-3">
      <label for="yearOfDeath" class="form-label">Year of Death</label>
      <input name="yearOfDeath" id="yearOfDeath" type="number" class="form-control"
             placeholder="####" min="0" max="2100"
             bind:value={yearOfDeath}>
    </div>
    <div class="col-md-6">
      <label for="picURL" class="form-label">URL of Picture</label>
      <input name="picURL" id="picURL" type="url" class="form-control"
             placeholder="https://domain.com/location" maxlength="200"
             bind:value={picURL} />
    </div>

  </div>

  <br>

  <button type="submit" class="btn btn-primary">Create Author</button>

</form>

