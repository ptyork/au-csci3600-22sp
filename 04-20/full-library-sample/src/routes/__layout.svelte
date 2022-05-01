<script>
  // @ts-nocheck
  import "../app.css";

  import { onMount } from 'svelte';
  import auth from '$lib/services/auth';
  import { isAuthenticated, user } from '$lib/stores/auth';
  import md5 from 'crypto-js/md5';

  //////////////////////////////////////////////////////////////////////////////
  // AUTHENTICATION STUFF
  //////////////////////////////////////////////////////////////////////////////

  let auth0Client;
  let avatarUrl;

  $: {
    console.debug($user);

    // Get the URL for hte avatar image whenver the isAuthenticated store value
    // changes. The whole process of generating the "Gravatar" url is very likely
    // unnecessary since I think Auth0 actually just gives it to you. But it is
    // a good demonstration of HOW to do "calculated" values when another,
    // related field changes.
    // UPDATE: Removed since it wasn't needed. Replaced with a call to
    // an online avatar generator.
    if ($isAuthenticated) {
      console.debug($user);
      avatarUrl = $user.picture;

      if (!avatarUrl && $user.given_name) {
        // const address = $user.email.trim().toLowerCase();
        // const hash = md5(address);
        // avatarUrl = `https://www.gravatar.com/avatar/${ hash }`;
        let name = encodeURI($user.given_name + ' ' + $user.family_name);
        avatarUrl = `https://ui-avatars.com/api/?name=${name}`;
      }
      console.debug('avatarUrl: ', avatarUrl);
    }
  }

  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }

  //////////////////////////////////////////////////////////////////////////////
  // FUN BOOTSTRAP DARKMODE STUFF
  //////////////////////////////////////////////////////////////////////////////

  let inDarkMode;

  function setDarkMode() {
    darkmode.setDarkMode(inDarkMode);
  }

  //////////////////////////////////////////////////////////////////////////////
  // NOT FUN ADMIN MODE SWITCH (since I couldn't figure out Auth0 Roles)
  //////////////////////////////////////////////////////////////////////////////

  let adminMode = true;

  //////////////////////////////////////////////////////////////////////////////
  // SVELTE ONMOUNT
  //////////////////////////////////////////////////////////////////////////////

  onMount(async () => {
    // Happens on the client ONLY (not during server-based prerender)
    auth0Client = await auth.createClient();
    inDarkMode = darkmode.inDarkMode;
  });

</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand logo" href="/">
      <img src="https://icons.iconarchive.com/icons/alecive/flatwoken/256/Apps-Library-icon.png" alt="logo" height="40">
      OLD YORK LIBRARY
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <!--
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        -->
        <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="/testform">Test</a></li>
        <li class="nav-item"><a class="nav-link" href="/authors">Browse</a></li>
        {#if $isAuthenticated && adminMode}
        <li class="nav-item bg-secondary"><a class="nav-link" href="/admin/authors">Book Inventory</a></li>
        {:else if !$isAuthenticated}
        <li class="nav-item"><span class="nav-link" role="button" on:click={login}>Login</span></li>
        {/if}
      </ul>
      {#if $isAuthenticated}
      <div class="dropdown d-flex" style="margin-left:1rem;">
        <span class="dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={avatarUrl} alt={$user.name} height="45" referrerpolicy="no-referrer" />
        </span>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li class="dropdown-item"><a class="nav-link" href="/mybooks">Borrowed Books</a></li>
          <li class="dropdown-item"><a class="nav-link" href="/profile">User Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <div class="user-mode-toggle">
              <label for="userMode" class="form-check-label">PATRON</label>
              <div class="form-check form-check-inline form-switch">
                <input id="userMode" type="checkbox" role="switch" class="form-check-input"
                      bind:checked={adminMode}>
                <label for="userMode" class="form-check-label">ADMIN</label>
              </div>
            </div>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <div class="dark-mode-toggle">
              <label for="darkMode" class="form-check-label">LIGHT</label>
              <div class="form-check form-check-inline form-switch">
                <input id="darkMode" type="checkbox" role="switch" class="form-check-input"
                      bind:checked={inDarkMode} on:change={setDarkMode}>
                <label for="darkMode" class="form-check-label">DARK</label>
              </div>
            </div>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li class="dropdown-item"><span class="nav-link" role="button" on:click={logout}>Logout</span></li>
        </ul>
      </div>
      {/if}
    </div>
  </div>
</nav>

<main class="bg-body">
  <div class="container">
    <slot />
  </div>
</main>

<footer>
  <div class="container">
    Footer stuff
  </div>
</footer>

<style>
  .logo {
    font-size: 18pt;
    font-family: 'Times New Roman', Times, serif;
    display: flex;
    align-items: center;
  }
  .logo img {
    margin-right:.5rem;
  }
  footer {
    margin-top: 2rem;
  }
  footer > div {
    border-top: 1px solid;
    padding-top: 1rem;
  }
  .dark-mode-toggle {
    display: inline-block;
    padding: .25rem 1rem;
    white-space: nowrap;
  }
  .dark-mode-toggle * {
    cursor: pointer;
  }
</style>