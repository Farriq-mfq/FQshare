import {
  Box,
  Button,
  Container,
  Input,
  Skeleton,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../hooks/useMutation";
import useQuery from "../hooks/useQuery";
interface ResponseApi {
  status: number;
  share: Share | null;
}

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
  const [password, setPassword] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<ResponseApi>(
    { path: `/share/${id}`, config: { params: { password } } },
    {
      onError(error: { status: number; error: any; context: string }) {
        if (error.context) {
          switch (error.context) {
            case "UNAUTHORIZED":
              setNeedPassword(true);
              break;
          }
        }
      },
    }
  );

  const { handleSubmit, isLoading: loadingDownload } = useMutation<any>(
    { path: `/share/download/${id}` },
    {
      onError(error: { status: number; context?: string; error: any }) {
        if (error.context) {
          switch (error.context) {
            case "UNAUTHORIZED":
              toast({
                status: "error",
                title: "Error",
                description: "Password invalid",
                position: "top-right",
              });
              break;
            case "VALIDATION":
              toast({
                status: "error",
                title: "Error",
                description: error.error[0]["password"],
                position: "top-right",
              });
              break;
            default:
              toast({
                status: "error",
                title: "Error",
                description: JSON.stringify(error.error),
                position: "top-right",
              });
              break;
          }
        }
      },
      onSuccess(data) {
        setPassword(null);
        handleDownload(data.share.downloadUrl);
      },
    }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ password });
  };

  const handleDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "true");
    a.click();
    a.remove();
    toast({
      status: "success",
      title: "Success",
      description: "Cool your file has been downloaded",
      position: "top-right",
    });
    navigate("/", { replace: true });
  };

  return (
    <Container
      maxW={"8xl"}
      mt={"4"}
      display={"flex"}
      justifyContent={"center"}
      minH={"80vh"}
      alignItems={"center"}
    >
      <Box
        w={"xl"}
        shadow={"xl"}
        p={"5"}
        rounded={"lg"}
        border={"1px"}
        borderColor={"gray.300"}
      >
        {isLoading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="12" w={"28"} />
          </Stack>
        ) : data != null && data.share ? (
          <VStack alignItems={"start"}>
            <Text>{data.share.originalFileName}</Text>
            <Button
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                handleDownload(data.share.downloadUrl);
              }}
              colorScheme="blue"
            >
              Download
            </Button>
          </VStack>
        ) : needPassword ? (
          <>
            <form onSubmit={onSubmit}>
              <VStack alignItems={"start"}>
                <Input
                  disabled={loadingDownload}
                  type="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length) {
                      setPassword(e.target.value);
                    } else {
                      setPassword(null);
                    }
                  }}
                  placeholder="File need password"
                />
                <Button
                  isLoading={loadingDownload}
                  type="submit"
                  colorScheme="blue"
                  loadingText={"Checking..."}
                >
                  Download
                </Button>
              </VStack>
            </form>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Container>
  );
}
