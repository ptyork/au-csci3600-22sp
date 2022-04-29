
export async function getValuesFromRequest(request: Request) {
  let formData = await request.formData();
  let values = {};
  for (let entry of formData.entries()) {
    let key = entry[0] as string;
    let value = entry[1];
    values[key] = value;
  }
  return values;
}

