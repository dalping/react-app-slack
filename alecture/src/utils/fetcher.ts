import axios from "axios";

const fetcher = async (url: string) =>
  await axios
    .get(url, {
      withCredentials: true,
    })
    .then((res) => res.data);

export default fetcher;
