// import boom from '@hapi/boom';
const _importDynamic = new Function('modulePath', 'return import(modulePath)');

async function fetch(...args: any) {
  const {default: fetch} = await _importDynamic('node-fetch');
  return fetch(...args);
}

export default async function request<T>(url: string) : Promise<T> {
  try {
    const response = await fetch(url);
    const data =  await response.json() as Promise<T>;
    return data;
  } catch (err) {
    throw err
		// throw boom.boomify(err as Error);
  }
}