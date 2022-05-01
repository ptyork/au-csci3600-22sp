<script>
  export let patron;

  // patronId         String       @id @default(cuid())
  // userName         String       @unique
  // firstName        String       @db.VarChar(50)
  // lastName         String       @db.VarChar(50)
  // emailAddress     String       @db.VarChar(100)
  // mobileNumber     String?      @db.VarChar(20)
  // preferredContact ContactType  @default(EMAIL)
  // isActive         Boolean      @default(true)
  // canBorrow        Boolean      @default(true)
  // borrows          BookBorrow[]

  let userName = patron?.userName ?? "";
  let firstName = patron?.firstName ?? "";
  let lastName = patron?.lastName ?? "";
  let emailAddress = patron?.emailAddress ?? "";
  let mobileNumber = patron?.mobileNumber ?? "";
  let preferredContact = patron?.preferredContact ?? "";
  let canBorrow = patron?.canBorrow ?? true;

</script>

<h1>User Profile</h1>

<form method="post">

  <div class="row g-3">

    <div class="col-md-6">
      <label for="firstName" class="form-label">First Name</label>
      <input name="firstName" id="firstName" type="text" class="form-control"
             placeholder="First Name" required maxlength="50"
             bind:value={firstName} />
    </div>
    <div class="col-md-6">
      <label for="lastName" class="form-label">Last Name</label>
      <input name="lastName" id="lastName" type="text" class="form-control"
             placeholder="Last Name" required maxlength="50"
             bind:value={lastName} />
    </div>
    <div class="col-md-4">
      <label for="emailAddress" class="form-label">Email Address</label>
      <input name="emailAddress" id="emailAddress" type="email" class="form-control"
             placeholder="user@domain.ext" required maxlength="100"
             bind:value={emailAddress}>
    </div>
    <div class="col-md-4">
      <label for="mobileNumber" class="form-label">Mobile Number</label>
      <input name="mobileNumber" id="mobileNumber" type="tel" class="form-control"
             placeholder="###-###-####" title="###-###-####"
             pattern={"\\d{3}[- ]?\\d{3}[- ]?\\d{4}"} maxlength="12"
             bind:value={mobileNumber}>
    </div>
    <div class="col-md-4">
      <fieldset>
        <legend>Preferred Contact</legend> 
        <div class="form-check">
          <input bind:group={preferredContact} name="preferredContact" value={"EMAIL"} id="pc-email" type="radio" class="form-check-input" />
          <label for="pc-email" class="form-check-label">Send Me Emails</label>
        </div>
        <div class="form-check">
          <input bind:group={preferredContact} name="preferredContact" value={"MOBILE"} id="pc-phone" type="radio" class="form-check-input" />
          <label for="pc-phone" class="form-check-label">Call or Text Me</label>
        </div>
      </fieldset> 
    </div>

  </div>

  <button type="submit" class="btn btn-primary">Update Profile</button>
</form>

<hr>

<h2>For Your Information</h2>

<table class="info">
  <tr>
    <th scope="row">Login UserName:</th>
    <td>{userName}</td>
  </tr>
  <tr>
    <th scope="row">Borrowing Priviledges:</th>
    <td>{canBorrow ? "ACTIVE" : "SUSPENDED" }</td>
  </tr>
</table>

<style>
  .info {
    font-size: 1.1rem
  }
  .info th, .info td {
    padding: 0.2rem 0.5rem;
  }
</style>
