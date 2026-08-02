import axios from "axios";
export const getUserDetails = async (tokens) => {
  const { data } = await axios.get(process.env.USER_INFO_GOOGLE, {
    headers: {
      Authorization: `Bearer ${tokens}`,
    },
  });

  return data;
};
