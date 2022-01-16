import axios from "axios";

const fetcher = async (url: string) =>
  await axios
    .get(url, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      return "안녕";
    });

export default fetcher;
