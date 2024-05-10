import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

export const GetFiles = () => {
  const [data, setData] = useState([{}]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axiosInstance
      .get("file")
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          setData(res.data);
        } else {
          setError(false);
        }
      })
      .catch((e) => {
        setError(true);
      });
  }, []);
  return { data, setData, error, loading };
};
