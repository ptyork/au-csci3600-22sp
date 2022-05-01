/*
NOTE: This code is "okay", but NOT good enough for a production app.
The use of server-generated cookies makes it "okay" now. But things
still remain undone.

1) Need to sign the user cookie on the server using JWT.
2) Need to handle periodic reauthentication when the token "expires".
3) Need to figure out how to do authorization.
*/


import createAuth0Client, {Auth0Client, User} from '@auth0/auth0-spa-js';
import { isAuthenticated, user, popupOpen } from '$lib/stores/auth';
import config from '$lib/config/auth';
import Cookies from 'js-cookie';

let auth0options = {};

async function createClient() : Promise<Auth0Client|null> {
    try {
        let auth0Client = await createAuth0Client({
            domain: config.domain,
            client_id: config.clientId
        });
        return auth0Client;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function loginWithPopup(auth0Client: Auth0Client) {
    popupOpen.set(true);
    try {
        await auth0Client.loginWithPopup(auth0options);
        await _setStores(auth0Client);
        await _notifyServer(auth0Client);
    } catch (e) {
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

async function logout(auth0Client: Auth0Client) {
    await auth0Client.logout();
    await _setStores(auth0Client);
    await _notifyServer(auth0Client);
}

/*
  Big Change From Lecture
  Instead of setting the cookie on the client, which is inherently insecure, I
  now instead send a request to the server with the received credentials.
  The server then sends BACK and HttpOnly cookie that contains the more secure
  stuff. 
*/
async function _notifyServer(auth0Client: Auth0Client) {
    let isAuth = isAuthenticated.get();
    if (isAuth) {
        let id_token = await auth0Client.getTokenSilently(auth0options);
        console.log(id_token);
        let response = await fetch('/api/loggedIn', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${id_token}`
            }
        });
        console.log('loggedin response:', response);
    } else {
        let response = await fetch('/api/loggedOut');
        console.log('loggedout response:', response);
    }
}

async function _setStores(auth0Client: Auth0Client) {
    let isAuth = await auth0Client.isAuthenticated();
    console.log("isAuth:", isAuth);
    isAuthenticated.set(isAuth);
    if (isAuth) {
        if (!user.hasValue()) {
            let auth0User = await auth0Client.getUser(auth0options) as User;
            user.set(auth0User);

            // SO STUPID, IN FACT, THAT I MOVED IT TO THE SERVER
            // // SET THE USER IN A COOKIE. THIS IS INSANELY STUPID!!!
            // Cookies.set('auth0.user', JSON.stringify(auth0User), { sameSite: 'lax' });
            // console.log("user:", auth0User);
        }
    } else {
        user.clear();

        // // Cookies.remove('auth0.token');
        // Cookies.remove('auth0.user');
        // console.log(document.cookie);
    }
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;

// STUFF THAT DIDN'T WORK

// let options = {audience: 'full-library-sample-api'};

// let claims = await auth0Client.getIdTokenClaims(options);
// console.log("CLAIMS:", claims);

// let token = Cookies.get('auth0.token');
// if (!token) {
//     token = await client.getTokenSilently();
//     Cookies.set('auth0.token', token);
//     console.log(document.cookie);
// }
// console.log("token:", token);
