import createAuth0Client, {Auth0Client, User} from '@auth0/auth0-spa-js';
import { isAuthenticated, user, popupOpen } from '$lib/stores/auth';
import config from '$lib/config/auth';
import Cookies from 'js-cookie';

async function createClient() : Promise<Auth0Client|null> {
    try {
        let auth0Client = await createAuth0Client({
            domain: config.domain,
            client_id: config.clientId
        });
        // await setStores(auth0Client);
        return auth0Client;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function loginWithPopup(auth0Client: Auth0Client, options: any) {
    popupOpen.set(true);
    try {
        await auth0Client.loginWithPopup(options);
    } catch (e) {
        console.error(e);
    } finally {
        await setStores(auth0Client);
        popupOpen.set(false);
    }
}

async function logout(auth0Client: Auth0Client) {
    await auth0Client.logout();
    await setStores(auth0Client);
}

async function setStores(client: Auth0Client) {
    let isAuth = await client.isAuthenticated();
    console.log("isAuth:", isAuth);
    isAuthenticated.set(isAuth);
    if (isAuth) {

        /*
        THIS DOESN'T WORK. SPENT LITERALLY 30 HOURS TRYING. I HATE THIS
        UNDOCUMENTED, UNOPINIONATED MESS OF AN OPEN-SOURCE ECOSYSTEM SO
        BADLY IT MAKES ME PHYSICALLY ILL.
        let token = Cookies.get('auth0.token');
        */
        // if (!token) {
        //     token = await client.getTokenSilently();
        //     Cookies.set('auth0.token', token);
        //     console.log(document.cookie);
        // }
        // console.log("token:", token);

        let auth0User = user.get() as User;

        // SvelteKit stores cannot store a "null" value and there's no good
        // way to check if an an object is empty, so this is a hack.
        if (Object.keys(auth0User).length == 0) {
            console.log("RETRIEVE USER");
            auth0User = await client.getUser() as User;
            user.set(auth0User);
            // SET THE USER IN A COOKIE. THIS IS INSANELY STUPID!!!
            Cookies.set('auth0.user', JSON.stringify(auth0User), { sameSite: 'lax' });
        }
        console.log("user:", auth0User);
    } else {
        user.set({});
        // Cookies.remove('auth0.token');
        Cookies.remove('auth0.user');
        console.log(document.cookie);
    }
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;
