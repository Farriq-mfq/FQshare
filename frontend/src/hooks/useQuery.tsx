import { useEffect, useState } from "react";
import { api } from "../modules/api.module";
import { AxiosRequestConfig } from "axios";
import { useMemo } from "react";
interface IuseQuery {
  path: string;
  config?: AxiosRequestConfig;
}

interface useQueryResponse {
  isLoading: boolean;
  data: any;
  error: any;
  refetch(): Promise<void>;
}

const useQuery = <T extends unknown>({ path, config }: IuseQuery) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<any>({});

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<T>(path, config);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchData();
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  const memoData = useMemo(() => data, [data]);

  return { data: memoData };
};

export default useQuery;
