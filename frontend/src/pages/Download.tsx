import { useState } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../hooks/useQuery";
interface Share {
  id: string;
  FileName: string;
  originalFileName: string;
  downloadUrl: string;
  fileSize: string;
  Password: null;
  createdAt: Date;
  updatedAt: Date;
}
export default function Download() {
  const { id } = useParams() as { id: string };
  const [needPassword, setNeedPassword] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery<Share | null>(
    { path: `/share/${id}` },
    {
      onSuccess(data) {
        console.log(data);
      },
      onError(error: { status: number; error: any; context: string }) {
        if (error.context) {
          switch (error.context) {
            case "VALIDATION":
              setNeedPassword(true);
              break;
          }
        }
      },
    }
  );
  return isLoading ? "loading" : data != null && data.share ? <></>:<>tidak ada data</>;
}
