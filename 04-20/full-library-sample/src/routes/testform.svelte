<script>
  // @ts-nocheck

  // errors and values are provided by get() and post() in the js/ts file.
  // These are used to "reconstruct" the form WITH user input in them if
  // there is an error on the server during final validation.
  export let errors;
  export let values;

  /*
  OPTIONAL CHAINING (?.) AND NULL COALESCING (??)
  ===============================================

  let firstName = values.firstName would throw an exception if values is null.
  So, "optional chaining" can be used:

    let firstName = values?.firstName;
  
  This will make calls to object properties and methods safe from null reference
  exceptions. It is equivalent to:
      
    let firstName = null;
    if (values != null) {
      firstName = values.firstName;
    }

  BUT the above could result in a firstName of null. So, we can potentially use
  the "null coalescing" operator:
  
    let firstName = values?.firstName ?? "";
    
  This is equivalent to:

    let firstName = null;
    if (values != null) {
      if (values.firstName == null) {
        firstName = "";
      } else {
        firstName = values.firstName;
      }
    }

  Though it's obviously much shorter. And yes I know the code on lines 9-12
  could be rewritten to do the same as 17-24 with a single change, but that's
  not the way the code below is interpreted.
  */

  // Create variables to bind to the form fields.
  // Prefil with defaults OR the value passed back from the server by the post() method.

  let firstName = values?.firstName ?? "";
  let lastName = values?.lastName ?? "";
  let address1 = values?.address1 ?? "";
  let address2 = values?.address2 ?? "";
  let city = values?.city ?? "";
  let state = values?.state ?? "";
  let zip = values?.zip ?? "";
  let email = values?.email ?? "";
  let password = values?.password ?? "";
  let dateOfBirth = values?.dateOfBirth; // allow null
  let isCool = values?.isCool ?? false;
  let likesCake = values?.likesCake ?? true;
  let numSiblings = values?.numSiblings ?? 0;
  let numKids = values?.numKids ?? 0;
  let favoriteTeacher = values?.favoriteTeacher ?? "york1";
  let favoriteClass = values?.favoriteClass ?? "CSCI3600";

  let confirmPassword = ""; // rogue "unsubmitted" form field

  // Convenient list of state object stolen from somewhere on the web.
  // Used to fill in the <option> elements on the state select.
  let usStates = [{name:"Alabama",abbreviation:"AL"},{name:"Alaska",abbreviation:"AK"},{name:"Arizona",abbreviation:"AZ"},{name:"Arkansas",abbreviation:"AR"},{name:"California",abbreviation:"CA"},{name:"Colorado",abbreviation:"CO"},{name:"Connecticut",abbreviation:"CT"},{name:"Delaware",abbreviation:"DE"},{name:"Florida",abbreviation:"FL"},{name:"Georgia",abbreviation:"GA"},{name:"Hawaii",abbreviation:"HI"},{name:"Idaho",abbreviation:"ID"},{name:"Illinois",abbreviation:"IL"},{name:"Indiana",abbreviation:"IN"},{name:"Iowa",abbreviation:"IA"},{name:"Kansas",abbreviation:"KS"},{name:"Kentucky",abbreviation:"KY"},{name:"Louisiana",abbreviation:"LA"},{name:"Maine",abbreviation:"ME"},{name:"Maryland",abbreviation:"MD"},{name:"Massachusetts",abbreviation:"MA"},{name:"Michigan",abbreviation:"MI"},{name:"Minnesota",abbreviation:"MN"},{name:"Mississippi",abbreviation:"MS"},{name:"Missouri",abbreviation:"MO"},{name:"Montana",abbreviation:"MT"},{name:"Nebraska",abbreviation:"NE"},{name:"Nevada",abbreviation:"NV"},{name:"New Hampshire",abbreviation:"NH"},{name:"New Jersey",abbreviation:"NJ"},{name:"New Mexico",abbreviation:"NM"},{name:"New York",abbreviation:"NY"},{name:"North Carolina",abbreviation:"NC"},{name:"North Dakota",abbreviation:"ND"},{name:"Ohio",abbreviation:"OH"},{name:"Oklahoma",abbreviation:"OK"},{name:"Oregon",abbreviation:"OR"},{name:"Pennsylvania",abbreviation:"PA"},{name:"Rhode Island",abbreviation:"RI"},{name:"South Carolina",abbreviation:"SC"},{name:"South Dakota",abbreviation:"SD"},{name:"Tennessee",abbreviation:"TN"},{name:"Texas",abbreviation:"TX"},{name:"Utah",abbreviation:"UT"},{name:"Vermont",abbreviation:"VT"},{name:"Virginia",abbreviation:"VA"},{name:"Washington",abbreviation:"WA"},{name:"West Virginia",abbreviation:"WV"},{name:"Wisconsin",abbreviation:"WI"},{name:"Wyoming",abbreviation:"WY"}];

  /*
    This will be called when the submit button is pressed.
    As with all javascript event handler methods, they can "accept" an event
    object, which all will have target properties and preventDefault() methods.
    Here the target is the form element and calling preventDefault() will stop
    the form from being submitted. It's one of the ways we can do form
    validation BEFORE submitting it to the server.

    Form validation is a huge topic with many different possible solutions.
    In general there are two categories: client-side validation and server-side
    validation. Within client-side, there are also two categories: browswer default and
    custom. See:
    
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#client-side_validation

    Browser default validation involves setting attributes on form elements. Specifically
    you can set:

    required
    minlength=[value]         (string len)
    maxlength=[value]         (string len)
    min=[value]               (numeric value)
    max=[value]               (numeric value)
    pattern=[value]           (regular expression to test string)

    ALSO, the input type is used for some more browser default checking.
    "Special"types that actually do validation checks include:

    type="date"       (usually also includes date picker)
    type="color"      (usually also includes color picker)
    type="email"
    type="time"       (usually also includes time picker)
    type="url"

    Some other types like "week" are inconsistently supported. And types
    like "tel" don't do validation, but just trigger the numeric keyboard
    on mobile phones.

    Custom validation is useful for more complex validation challenges not
    handled natively and involves manually checking values BEFORE submitting
    a form. Either in a <form onsubmit=...> event or another event such
    as a button click or a control "blur" (losing focus). Use the
    control.setCustomValidation() method and the form.reportValidity()
    methods to manually add validation messages to a form.

    Server based validation is required for values that need to check
    things only available on to the server. For example, if a user tries
    to create an account using an email address that already has an account,
    the client won't know this. This will require a database lookup, which
    can only happen on the server.

    Server based validation thus requires the form to be submitted. And
    at least in the "simple" method I'm demonstrating, the form is 
    redrawn with error messages shown for specific validaiton errors.

    NOTE: It is VERY OFTEN a good practice to REPEAT the client side
    validation on the server. This will help to insure that a malicious
    user can't "spoof" the system by submitting a request that bypasses
    client validation (super-easy to do) or if a user simply has
    JavaScript disabled (rare these days).
  */
  function onSubmit(event) {
    console.log(event);
    let form = event.target;
    console.log(form);


    let isValid = true;

    isValid = isValid && checkPassword(form);

    if (!isValid) {
      form.reportValidity();
      event.preventDefault();
    }
  }

  
  function jsSubmit(event) {
    // target is the button
    console.log(event.target);
    // so get the form
    let form = document.querySelector('form'); // many ways to do this
    console.log(form);


    let isValid = form.checkValidity();
    isValid = isValid && checkPassword(form);

    if (!isValid) {
      form.reportValidity();
    } else {
      form.submit();
    }
  }

  // SAMPLE custom validation function
  function checkPassword(form) {
    // if not supplied, then it's not chaning, so we're good
    if (password.length == 0) return true;

    // use a try block to "throw" custom validation errors so that we exit as soon as
    // we know it is invalid.
    try {
      if (password.length < 8 || password.length > 20) {
        throw("Password must be between 8 and 20 characters");
      }

      let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if (!passwordRegex.test(password)) {
        throw("Password must contain lowercase, uppercase, numeric AND special characters");
      }

      if (password != confirmPassword) {
        throw("Password and Confirm Password do not match");
      }

    } catch (ex) {
      form.password.setCustomValidity(ex.toString());
      return false;
    }

    form.password.setCustomValidity('');
    return true;
  }

</script>

<div class="container">
  <h1>A Form To Test Stuff</h1>

  <p>Yep. A super cool form. No doubt about it!</p>

  <!-- 
    IF YOU LEAVE OFF THE ACTION="" ATTRIBUTE, YOU SUBMIT THE FORM TO THE
    CURRENT ENDPOINT. THIS JUST SO HAPPENS TO BE WHAT WE WANT TO DO...
   -->
  <!-- <form> -->
  <!-- <form method="post"> -->
  <form method="post" on:submit={onSubmit}>

    <h2>Contact Info</h2>
  
    <!-- 
      The majority of the markup below is just Bootstrap classes and suggested
      layout "containers" (divs, spans, etc.). The "working" parts are inputs
      and labels.
    -->
    
    <div class="row g-3">
      <div class="col-md-6 form-floating">
        <input name="firstName" id="firstName" type="text" class="form-control"
               placeholder="First Name" required maxlength="50"
               bind:value={firstName} />
        <label for="firstName">First Name</label>
      </div>
      <div class="col-md-6 form-floating">
        <input name="lastName" id="lastName" type="text" class="form-control"
               placeholder="Last Name" required maxlength="50"
               bind:value={lastName}>
        <label for="lastName">Last Name</label>
      </div>
      <div class="col-12 form-floating">
        <input name="address1" id="address1" type="text" class="form-control"
               placeholder="1234 Main St" required maxlength="100"
               bind:value={address1}>
        <label for="address1">Address Line 1</label>
      </div>
      <div class="col-12 form-floating">
        <input name="address2" id="address2" type="text" class="form-control"
               placeholder="Apartment, studio, or floor" maxlength="100"
               bind:value={address2}>
        <label for="address2">Address Line 2</label>
      </div>
      <!-- 
        EXAMPLE OF SERVER SIDE VALIDATION
        ADD A BOOTSTRAP CLASS IF THE CITY, STATE OR ZIP IS INVALID
        ALSO ADD A DIV WITH THE SERVER-SUPPLIED ERROR MESSAGE
      -->
      <div class="col-md-6 form-floating">
        <input name="city" id="city" type="text" class="form-control {"city" in errors ? 'is-invalid' : ''}"
               placeholder="City Name" required maxlength="50"
               bind:value={city}>
        <label for="city">City</label>
        {#if "city" in errors}
          <div class="invalid-feedback">
            {errors.city}
          </div>
        {/if}
      </div>
      <div class="col-md-4 form-floating">
        <select name="state" id="state" class="form-select {"state" in errors ? 'is-invalid' : ''}"
          aria-label="select state" bind:value={state} required>
          <option value="" selected disabled>Choose...</option>
          {#each usStates as usState}
          <option value={usState.abbreviation}>{usState.name} ({usState.abbreviation})</option>
          {/each}
        </select>
        <label for="state">State</label>
        {#if "state" in errors}
          <div class="invalid-feedback">
            {errors.state}
          </div>
        {/if}
      </div>
      <!--
        Note the use of the Svelte { and } around the pattern. This is because
        the brackets are used in the pattern, and Svelte was treating them as 
        "reactive" expressions instead of just being part of the string. This ALSO
        necessitated escaping the back-slashes since the Svelte expression is a
        string. What a pain in the ...butt now I know.
       -->
      <div class="col-md-2 form-floating">
        <input name="zip" id="zip" type="text"
               class="form-control {"zip" in errors ? 'is-invalid' : ''}"
               placeholder="00000" title="5-digit or 5-plus-4 zip code"
               required pattern={"\\d{5}(-\\d{4})?"} bind:value={zip}>
        <label for="zip">Zip</label>
        {#if "zip" in errors}
          <div class="invalid-feedback">
            {errors.zip}
          </div>
        {/if}
      </div>
    </div>

    <div class="btn-group btn-group-sm mt-3 mb-3">
      <button type="submit" class="btn btn-primary">STANDARD SUBMIT</button>
      <button class="btn btn-secondary" on:click={jsSubmit}>JAVASCRIPT SUBMIT</button>
    </div>
  
    <h2>Login Details</h2>
  
    <div class="row g-3">
      <div class="col-md-4">
        <label for="email" class="form-label">Email Address</label>
        <input name="email" id="email" type="email" class="form-control"
               placeholder="user@domain.ext" maxlength="50"
               bind:value={email}>
      </div>
      <div class="col-md-4">
        <label for="password" class="form-label">Password</label>
        <input name="password" id="email" type="password" class="form-control"
               maxlength="20"
               bind:value={password}>
      </div>
      <div class="col-md-4">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <!-- NO NAME ATTRIBUTE SINCE THIS WILL NOT BE SUBMITTED TO THE SEVER -->
        <input id="email" type="password" class="form-control"
               maxlength="20"
               bind:value={confirmPassword}>
      </div>
    </div>
  
    <div class="btn-group btn-group-md mt-3 mb-3">
      <button type="submit" class="btn btn-primary">STANDARD SUBMIT</button>
      <button class="btn btn-secondary" on:click={jsSubmit}>JAVASCRIPT SUBMIT</button>
    </div>
  
    <h2>Miscellaneous Crap</h2>
  
    <div class="row g-3">
      <div class="col-lg-4 col-md-6">
        <label for="dateOfBirth" class="form-label">Date of Birth</label>
        <input name="dateOfBirth" id="dateOfBirth" type="date" class="form-input"
               bind:value={dateOfBirth}>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="form-check">
          <input name="isCool" id="isCool" type="checkbox" class="form-check-input"
                 bind:checked={isCool}>
          <label for="isCool" class="form-check-label">I'm A Cool Cat</label>
        </div>
        <div class="form-check form-switch">
          <input name="likesCake" id="likesCake" type="checkbox" role="switch" class="form-check-input"
                 bind:checked={likesCake}>
          <label for="likesCake" class="form-check-label">I Like Cake</label>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="row g-3">
          <label for="numSiblings" class="col-sm-6 col-form-label">Num Siblings:</label>
          <div class="col-sm-6">
            <input name="numSiblings" id="numSiblings" type="number" class="form-control" min="0" max="20"
                   bind:value={numSiblings}>
          </div>
        </div>
        <div class="row g-3">
          <label for="numKids" class="col-sm-6 col-form-label">Num Kids:</label>
          <div class="col-sm-6">
            <input name="numKids" id="numKids" type="range" class="form-range" min="0" max="20"
                   bind:value={numKids}>
            <div style="text-align: center;">{numKids}</div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="row g-3">
          <label for="numSiblings" class="col-sm-6 col-form-label">Num Siblings:</label>
          <div class="col-sm-6">
            <input name="numSiblings" id="numSiblings" type="number" class="form-control" min="0" max="20"
                   bind:value={numSiblings}>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <fieldset>
          <legend>Favorite Teacher</legend> 
          <div class="form-check">
            <input bind:group={favoriteTeacher} name="favoriteTeacher" value={"york1"} id="ftyork1" type="radio" class="form-check-input" />
            <label for="ftyork1" class="form-check-label">Professor York</label>
          </div>
          <div class="form-check">
            <input bind:group={favoriteTeacher} name="favoriteTeacher" value={"york2"} id="ftyork2" type="radio" class="form-check-input" />
            <label for="ftyork2" class="form-check-label">Dr. Paul York</label>
          </div>
          <div class="form-check">
            <input bind:group={favoriteTeacher} name="favoriteTeacher" value={"york3"} id="ftyork3" type="radio" class="form-check-input" />
            <label for="ftyork3" class="form-check-label">Paul York, Ph.D.</label>
          </div>
        </fieldset>
      </div>
      <div class="col-md-4">
        <label for="favoriteClass">Favorite Class</label>
        <select name="favoriteClass" id="facoriteClass" class="form-select" aria-label="select favorite class"
                size="3" bind:value={favoriteClass}>
          <option value="AIST2220">AIST 2220 - Introduction to Web Development (York)</option>
          <option value="AIST3410">AIST 3410 - Database Management Systems (York)</option>
          <option value="CSCI3600">CSCI 3600 - Internet Programming (York)</option>
        </select>
      </div>
    </div>
    
    <div class="btn-group btn-group-lg mt-3 mb-3">
      <button type="submit" class="btn btn-primary">STANDARD SUBMIT</button>
      <button class="btn btn-secondary" on:click={jsSubmit}>JAVASCRIPT SUBMIT</button>
    </div>
  
  </form>
</div>
