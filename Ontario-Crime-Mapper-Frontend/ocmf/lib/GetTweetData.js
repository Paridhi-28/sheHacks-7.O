import axios from "./axios";

export default async function GetTweetData(req) {
  const getTweetsURL = "/api/data/getTweets"
  // console.log(req);
  const cookies = req.cookies.refresh_jwt;

  try {
    const response = await axios.get(
      getTweetsURL,
      {
        withCredentials: true,
        headers: {
          cookies: cookies,
        }
      }
    );
    // console.log(response);
    return response;
  } catch (err) {
    console.log(`Get Tweet Data: ${err.response.data}`);
  }
}
