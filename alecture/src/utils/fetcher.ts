import axios from "axios";

const fecther = (url: string) => {
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data);
};

export default fecther;
