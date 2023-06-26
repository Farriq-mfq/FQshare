import {
  Button,
  Flex,
  Input,
  VStack,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useMutation from "../hooks/useMutation";
import Dropzone from "./Dropzone";
import ListFile from "./ListFile";
type Props = {};

interface uploadResponse {
  id: string;
}

export default function Upload({}: Props) {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [percent, setPercent] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);
  const { handleSubmit, isLoading } = useMutation<uploadResponse>(
    {
      path: "/share/upload",
      config: {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setPercent(percent);
        },
      },
    },
    {
      onSuccess(data: uploadResponse) {
        setPassword(null);
        setFile(null);
        setPercent(0);
        toast({
          status: "success",
          title: "Success",
          description: "Cool successfully linked",
          position: "top-right",
        });
        setResult(`${window.location.href}${data.id}`);
      },
      onError(error: {
        status: number;
        error: any;
        context: string | undefined;
      }) {
        if (error.context) {
          switch (error.context) {
            case "FILE_VALIDATION":
              toast({
                status: "error",
                title: "Error",
                description: error.error,
                position: "top-right",
              });
              break;
            case "FILE_TO_LARGE":
              toast({
                status: "error",
                title: "Error",
                description: error.error,
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
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    if (password != null) {
      formdata.append("password", password!);
    }
    if (file != null) {
      formdata.append("file", file);
    }
    await handleSubmit(formdata);
  };

  const onDeleteFile = () => {
    setFile(null);
  };

  const { onCopy, value, setValue, hasCopied } = useClipboard(
    result != null ? result : ""
  );

  return (
    <>
      {result ? (
        <VStack w={"full"} alignItems={"start"}>
          <Flex mb={2} w={"full"}>
            <Input
              value={value}
              mr={2}
              _focus={{ ring: "none" }}
              disabled
              _disabled={{ color: "black" }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Button colorScheme="blue" onClick={onCopy}>
              {hasCopied ? "Copied!" : "Copy"}
            </Button>
          </Flex>
          <Button
            colorScheme="blue"
            onClick={(e) => {
              e.preventDefault();
              setResult(null);
            }}
          >
            Link File Again
          </Button>
        </VStack>
      ) : (
        <form onSubmit={onSubmit}>
          <VStack spacing={"4"} alignItems={"start"}>
            {file ? (
              <ListFile
                file={file}
                onDelete={onDeleteFile}
                loading={isLoading}
              />
            ) : (
              <Dropzone setFile={setFile} />
            )}
            <Input
              disabled={isLoading}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.value.length) {
                  setPassword(e.target.value);
                } else {
                  setPassword(null);
                }
              }}
              placeholder="Your file password"
            />
            <Button
              isLoading={isLoading}
              loadingText={`${percent}%`}
              type="submit"
              colorScheme="blue"
            >
              Submit
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
}
