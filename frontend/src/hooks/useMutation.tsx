import { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import { api } from "../modules/api.module";
interface IuseMutation {
  path: string;
  config?: AxiosRequestConfig;
}

interface useMutationResponse {
  isLoading: boolean;
  data: any;
  error: any;
  handleSubmit(data: any): Promise<void>;
}

interface callbackMutation<T> {
  onSuccess: (data: T) => void;
  onError: (error: any) => void;
}

const useMutation = <T extends unknown>(
  { path, config }: IuseMutation,
  { onSuccess, onError }: Partial<callbackMutation<T>>
): useMutationResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<any>({});

  const handleSubmit = useCallback(async (data: any) => {
    setIsLoading(true);
    try {
      const response = await api.post<T>(path, data, config);
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
  }, []);

  return {
    data,
    isLoading,
    error,
    handleSubmit,
  };
};

export default useMutation;
