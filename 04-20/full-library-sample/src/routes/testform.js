// @ts-nocheck
import { getValuesFromRequest } from '$lib/utils/forms';
import { StoredMap } from 'stored-map';

export async function get({ request }) {
  return {
    status: 200,
    body: {
      values: {},
      errors: {}
    }
  };
}

// Use an object to store results from the remote API so that I don't have to
// keep calling it for the same zip code.
const zipCodeCache = new StoredMap('./zipCodeCache');

export async function post({ request }) {
  console.debug('DEBUG: IN POST');

  // Retrieve the values from the request. This little gem of code I wrote
  // (see lib/utils/forms) takes all of the form data fields from the reqest
  // and places them into a simple values object.
  let values = await getValuesFromRequest(request);
  console.debug(JSON.stringify(values, null, 2));

  // NOW, validate the fields. This is a VERY incomplete set of validation
  // rules. YOU SHOULD REVALIDATE all of your client validated date. I won't
  // expect it for your projects, but DO NOT TELL ANYONE THAT I DIDN'T TELL
  // YOU TO REVALIDATE YOUR CLIENT-VALIDATED DATA.

  let isValid = true;
  let errors = {};

  // Check that both the city and state match the supplied zip code
  let zipCodeObject;                      // will store the results of API call
  let shortZip = values.zip.slice(0,5);   // just want the first 5 digits if 5+4 zip for API
  
  // FIRST, check to see if the user's zip code is in the cache
  if (await zipCodeCache.has(shortZip)) {
    // IF SO, we can proceed to validation
    zipCodeObject = await zipCodeCache.get(shortZip);
  
  } else {
    // IF NOT, we need to pull the zip code down from the API

    // I need a key for the URL, so grab the SUPER-SECRET key (see the readme.md)
    let apiKey = process.env.ZIPWISE_KEY;

    // Construct the required URL
    let url = `https://www.zipwise.com/webservices/zipinfo.php?key=${apiKey}&zip=${shortZip}&format=json`;

    // NOW, call the API...enclose in try/catch since this is an external call, which
    // is always a potentially flaky thing.
    try {
      // make the call
      let response = await fetch(url);
      // pull the JSON from the response
      jsonResult = await response.json();
      /* RESULT LOOKS LIKE THIS
        {"results":{
          "zip":"12345",
          "cities":[
            {"city":"Schenectady","preferred":"P"},
            {"city":"General Electric","preferred":"N"},
            {"city":"Schdy","preferred":"N"}
          ],
          "county":"Schenectady",
          "state":"NY",
          "country":"U",
          "area_code":"518",
          "fips":"36093",
          "time_zone":"EST",
          "daylight_savings":"Y",
          "latitude":"42.8140",
          "longitude":"-73.9815",
          "type":"U",
          "population":"30007"
        }}
        OR
        {"results":{
          "error": ERROR_MESSAGE
        }}
      */

      // we just want the results property...which is the only one...wonder why?
      zipCodeObject = jsonResult.results;

      // FINALLY, cache the results...zip codes don't change all that often. I probably
      // would set some kind of expiration date on the object to make sure I purged it
      // every so often, but I won't for this simple demo.
      await zipCodeCache.set(shortZip, zipCodeObject);

    } catch (ex) {
      console.error(ex);
    }
  }

  console.debug(zipCodeObject);
  
  if (!zipCodeObject) {
    // If we get here and don't have a valid zipCodeObject, then bad stuff happened.
    errors.zip = "Unable to retrieve zip code from API";
    isValid = false;

  } else if (zipCodeObject.error) {
    // If the API returns an error, then that's not good, either. Report it.
    errors.zip = zipCodeObject.error;
    isValid = false;

  } else {
    // The object is VALID, but are the city and state valid?
    let validCity = false;
    let allCities = []
    for (let cityObj of zipCodeObject.cities) {
      if (cityObj.city.toLowerCase() == values.city.toLowerCase()) {
        validCity = true;
      } else {
        allCities.push(cityObj.city);
      }
    }
    if (!validCity) {
      errors.city = `${values.zip} is not in ${values.city}. Should be one of ${allCities}.`;
      isValid = false;
    }
    if (values.state != zipCodeObject.state) {
      errors.state = `${values.zip} is not in ${values.state}. Should be ${zipCodeObject.state}.`
      isValid = false;
    }
  }
  
  if (!isValid) {
    return {
      status: 200,
      body: {
        values,
        errors
      }
    };
  }

  // PROCESS THE VALID FORM DATA

  // FOR EXAMPLE, SAVE TO THE DATABASE, ETC.



  // ONCE DONE YOU ALWAYS WANT TO REDIRECT SOMEWHERE TO AVOID
  // ISSUES WITH "FORM REPLAY" (I.E., ACCIDENTALLY RESUBMITTING
  // THE FORM AGAIN BY HITTING REFRESH)
  return {
    status: 302,
    headers: {
      location: "/"
    }
  }
  
}