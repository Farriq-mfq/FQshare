import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { api } from "../modules/api.module";
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

interface callbackQuery<T> {
  onSuccess: (data: T) => void;
  onError: (error: any) => void;
}
const useQuery = <T extends unknown>(
  { path, config }: IuseQuery,
  { onSuccess, onError }: Partial<callbackQuery<T>>
): useQueryResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>({});

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<T>(path, config);
      setData(response.data);
      if (onSuccess != undefined) {
        onSuccess(response.data);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data);
        if (onError != undefined) {
          onError(err.response?.data);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, refetch };
};

export default useQuery;
