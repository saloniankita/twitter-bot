// https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids
const axios = require("axios");

export const getFollowerList = async (userName) => {
  const baseUrl = "https://api.twitter.com/1.1/followers/ids.json";
  const params = {
    cursor: -1,
    screen_name: userName,
    skip_status: true,
    include_user_entities: false,
  };

  const response = await axios.get(baseUrl, params);
  return response.data;
};

//array of ids
export const getTweetHistoryOfIds = async (listOfIds) => {
  const baseUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json";
  const response = await Promise.all(
    listOfIds.map((val, idx) => {
      const params = {
        user_ids: val,
      };

      return axios.get(baseUrl, params);
    })
  );

  let finalOutput = {};
  response.forEach((val, idx) => {
    finalOutput[listOfIds[idx]] = val;
  });

  return finalOutput;
};