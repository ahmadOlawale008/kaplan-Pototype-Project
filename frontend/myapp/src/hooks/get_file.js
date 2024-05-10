import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

const GetFile = ({ path, pageNumber }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadNew, setLoadNew] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setLoadNew(true);
    axiosInstance
      .get(
        pageNumber
          ? `scan_datasets/${path}?page=${pageNumber}`
          : `scan_datasets/${path}`
      )
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          setData(res.data);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(
          error?.response?.data && error?.response?.data.error
            ? error.response?.data.error
            : error.message
        );
      })
      .finally(() => {
        setLoading(false);
        setLoadNew(false);
      });
  }, [pageNumber]);

  return {
    data: data,
    loading: loading,
    errorMessage: errorMessage,
    error,
    loadNew,
  };
};

export default GetFile;
