import { useEffect, useState } from "react";
import api from "../../axios";

const useFetchList = (path, query, config = {}) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fechApi = async () => {
      const skip = (query.page - 1) * query.limit;
      query.skip = skip;
      //   delete query.page;
      const queryString = new URLSearchParams(query).toString();
      const res = await api.get(`${path}/search?${queryString}`, config);
      console.log(res);
      setdata(res.data[path]);
    };

    fechApi();
  }, [path, JSON.stringify(query), JSON.stringify(config)]);

  return [data];
};
export default useFetchList;
