<script>
  export let author, errorMessage;

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

  function confirm(event) {
    if (!window.confirm("You sure you want to delete this author")) {
      event.preventDefault();
    }
  }

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/admin/authors">Book Inventory</a></li>
    <li class="breadcrumb-item">Edit Author</li>
  </ol>
</nav>

<h1>Author Information</h1>

{#if errorMessage}
<div class="alert alert-danger" role="alert">
  {errorMessage}
</div>
{/if}

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

  <!-- 
    BY GIVING BUTTONS A NAME AND VALUE, THE CLICKED BUTTON WILL BE PASSED
    ALONG WITH THE REST OF THE FORM DATA AS name=value. IN THIS CASE EITHER
    action=update OR action=delete.
    IF NO BUTTON IS PRESSED, THE FIRST BUTTON IS CONSIDERED THE "DEFAULT".

    https://stackoverflow.com/questions/925334
   -->

  <button type="submit" class="btn btn-primary" name="action" value="update">Update Author</button>
  <button type="submit" class="btn btn-danger" name="action" value="delete" on:click={confirm}>Delete Author</button>

</form>

