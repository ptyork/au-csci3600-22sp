# full-library-sample

This is a basic but complete app example using:

* SvelteKit
* Bootstrap 5
* Prisma ORM
* CockroachDB (hosted PostgreSQL)
* Auth0 Authentication
* SvelteKit + Forms

# Setup

These are the steps I performed to start out.

## SvelteKit

Normal installation:
  ```
  npm init svelte@next full-library-sample
  cs full-library-sample
  ```

## Bootstrap 5

I just used the most basic method of importing Bootstrap into the SvelteKit project. Specifically I added this to the `<head>` section of app.html:
```
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```
BUT, I wanted dark mode (and a switch), so I instead followed these [dark mode directions](https://github.com/vinorodrigues/bootstrap-dark-5/blob/main/docs/bootstrap-nightshade.md). See both app.html AND __layout.svelte to see how I integrated the cool toggle switch.


## Prisma ORM

Adapted from the [Prisma instructions](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgres):
  ```
  npm install prisma --save-dev
  npx prisma init
  ```
Added the appropriate `DATABASE_URL` entry for Cockroach as mentioned below. Changed `prisma/schema.prisma` to reflect the Postgres/Cockroach client and added entities. Then ran:
  ```
  npx migrate dev
  npm install @prisma/client
  npx prisma generate
  ```

## CockroachDB

Signed in to [CockroachLabs](https://cockroachlabs.cloud/) using my GitHub credentials. Added a new "free tier" cluster. Made sure to copy my connection string into my .env (and made a note with my "only show this one time" password).

## Auth0

Adapted from this [blog post](https://chrisellis.dev/writing/sveltekit-boilerplate-auth0).

Started by using my GitHub credentials to create a personal account at the [Auth0 Website](https://auth0.com/). Added a new "Singele Page Web Application". Added `http://localhost:3000` to my list of Allowed Callback URLs, Allowed Logout URLs, and Allowed Web Origins.

Back in this code, I installed the Auth0 SPA client:
  ```
  npm install auth0-spa-js
  ```
Because I think storing ANY configurable client secrets in source code is a terrible idea, I deviated from the example to read the Auth0 config data from the `.env` file. Followed this [Blog post](https://timdeschryver.dev/blog/environment-variables-with-sveltekit). Specifically I added this to `.env` (putting my values in place of `[VALUE HERE]`):
  ```
  VITE_AUTH0_DOMAIN='[VALUE HERE]'
  VITE_AUTH0_CLIENTID='[VALUE HERE]'
  ```
and in `$lib/config/auth.ts` I import the environment variables to set the config values.
  ```
  const config = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENTID
  };
  export default config;
  ```

## Miscellaneous NPM Libraries

### cookie & js-cookie

I used cookies on both client and server. So I installed two libraries: `cookie` for server-side parsing and `js-cookie` for client-side parsing.

  ```
  npm install cookie
  npm install js-cookie
  ```

### env-cmd

For SUPER SECRET keys I had to follow [these instructions](https://scottspence.com/posts/sveltekit-env-secrets) to install `env-cmd` and configure my `package.json` accordingly. Specifically I had run:
  ```
  npm install env-cmd --save-dev
  ```
and then modify two of the `scripts` entries in `package.json` as follows:
  ```
    ...
    "dev": "env-cmd svelte-kit dev",
    ...
    "preview": "env-cmd svelte-kit preview",
    ...
  ```
Then in my SERVER SIDE ONLY scripts, I can use `process.env.SECRETNAME` (where SECRETNAME is one of the entries in `.env` that is NOT prefixed with `VITE_`) to get access to the string. DO NOT USE process.env to get secrets in your `.svelte` files as this will end up including the secrets in the javascript that ends up getting downloaded to web browsers. Anyone with a brain can then use view source to get them. Bad joo joo.


### stored-map

I wanted to utilize a simple, persistent disk cache to store the results of calls to "expensive" Web API's. In other words, I'm cheap and wanted to make sure I didn't exceed my quote and have to fork out cash money. So I installed [stored-map](https://github.com/cbenriquez/stored-map-js).
  ```
  npm install stored-map
  ```
You can see it in use in `testform.js`.


## Miscellaneous TypeScript

To get TypeScript to include the ability to iterate over the submitted FormData collection, I had to modify `tsconfig.json` slightly to instruct it to include `DOM.iterable` libraries:
```
		"lib": ["es2020", "DOM"],
```
became:
```
		"lib": ["es2020", "DOM", "DOM.Iterable"],
```
Also, because there's a TS warning that pops up in a LOT of situations where you really do want to treat a DOM (or similar) object as a JS object (with keyed, untyped properties), I had to add another compiler option to turn off the "noImplicitAny" rules:
```
		"noImplicitAny": false
```

# Additional Notes

The majority of this is documented in the code. Here are some specific notes regarding "persnickety" aspect of the example.




## Auth0

Per the instructions in the [blog post](https://chrisellis.dev/writing/sveltekit-boilerplate-auth0), I added three files:

  * `$lib/config/auth.ts`
  * `$lib/services/auth.ts`
  * `$lib/stores/auth.ts`

Because I wanted to "remember" the logged-in state between pages (remember, Svelte is designed as a SINGLE-PAGE application framework), I created a `$lib/stores/sessionStore.ts` store subclass that saves store values in the browser's sessionState object instead of page-level variables. Followed this [MDN tutorial](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores) to accomplish this.

Next I learned about [Auth0's Role Based Access Control](https://auth0.com/docs/manage-users/access-control). In the User Management/Roles dashboard, I added a `library_employee` role.

I then spent a ***week*** in a rabbit hole trying to figure out how to properly integrate Auth0 into SvelteKit both on the client and the server, including how to properly authenticate JWT tokens from Auth0 and how to get roles and permissions from Auth0, and I just gave up.

In the end, I just hacked together a solution to passing Auth0 data from the client to the server using cookies. This required that I add a "handle" hook in a `hooks.js` file, a "magic" SvelteKit file+function used to intercept and inspect/modify requests which is [documented here](https://kit.svelte.dev/docs/hooks). I commented on the how, what and why of this "hack" in `$lib/services/auth.ts` and the `hooks.js` file in the root.




