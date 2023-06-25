import {
  Button,
  Flex,
  HStack,
  Input,
  VStack,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { api } from "../modules/api.module";
import Dropzone from "./Dropzone";
import ListFile from "./ListFile";
type Props = {};

export default function Upload({}: Props) {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    if (password != null) {
      formdata.append("password", password!);
    }
    if (file != null) {
      formdata.append("file", file);
    }

    setLoading(true);
    setTimeout(() => {
      api
        .post<{ status: number; id: string }>("/share/upload", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setPercent(percent);
          },
        })
        .then((response) => {
          setPassword(null);
          setFile(null);
          setPercent(0);
          toast({
            status: "success",
            title: "Success",
            description: "Cool successfully linked",
            position: "top-right",
          });
          setResult(`${window.location.href}${response.data.id}`);
        })
        .catch((err) => {
          toast({
            status: "error",
            title: "Error",
            description: "Somthing error with your request",
            position: "top-right",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  };

  const onDeleteFile = () => {
    setFile(null);
  };

  const { onCopy, value, setValue, hasCopied } = useClipboard(result!);

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
            <Button colorScheme="teal" onClick={onCopy}>
              {hasCopied ? "Copied!" : "Copy"}
            </Button>
          </Flex>
          <Button
            colorScheme="teal"
            onClick={(e) => {
              e.preventDefault();
              setResult(null);
            }}
          >
            Link File Again
          </Button>
        </VStack>
      ) : (
        <form onSubmit={handleSubmit}>
          <VStack spacing={"4"} alignItems={"start"}>
            {file ? (
              <ListFile file={file} onDelete={onDeleteFile} loading={loading} />
            ) : (
              <Dropzone setFile={setFile} />
            )}
            <Input
              disabled={loading}
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              placeholder="your file password"
            />
            <Button
              isLoading={loading}
              loadingText={`${percent}%`}
              type="submit"
              colorScheme="teal"
            >
              Submit
            </Button>
          </VStack>
        </form>
      )}
    </>
  );
}
