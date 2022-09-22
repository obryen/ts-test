import { httpGet } from './mock-http-interface';

// TODO define this type properly

export type TResult = {
  "Arnie Quote"?: string;
  "FAILURE"?: string;
}

export type TResponse = {
  status: number;
  body: string;
}
export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {

  return await resolveQuoteFromUrl(urls);
};

async function resolveQuoteFromUrl(urls: string[]): Promise<TResult[]> {

  let requestPromises = [];
  let responses: TResponse[];
  for (let singleUrl of urls) {
    requestPromises.push(httpGet(singleUrl));
  }
  responses = await Promise.all(requestPromises);
  let finalResults: TResult[] = [];
  for (let res of responses) {
    const message = JSON.parse(res.body).message;
    if (res.status === 200) {
      finalResults.push({ "Arnie Quote": message });
    } else {
      finalResults.push({
        "FAILURE": message
      });
    }
  }
  return finalResults;
}

