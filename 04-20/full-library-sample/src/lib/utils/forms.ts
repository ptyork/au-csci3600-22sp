/*
  getValuesFromRequest()
  Simple utility function to retrieve ALL of the values from the formData
  collection and store them in an easy-to-access POJO.
    ( POJO == Plain ol' Javascript Object )
*/
export async function getValuesFromRequest(request: Request) : Promise<any> {
  let formData = await request.formData();
  let values = {};
  for (let entry of formData.entries()) {
    let key = entry[0] as string;
    let value = entry[1];
    values[key] = value;
  }
  return values;
}

/*
  getErrorResponse()
  Simple utility function to log an error message and to construct an
  appropriate HTTP Response object.
*/
export function getErrorResponse(status: Number, message: any) : any {
  console.warn(message);
  return {
    status,
    body: {
      message
    }
  }
}
