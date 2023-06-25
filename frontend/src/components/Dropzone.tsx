import { Box, Center, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function Dropzone({ setFile }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
  });

  return (
    <Box
      h={"60"}
      w={"full"}
      border={"1px"}
      borderColor={"gray.200"}
      rounded={"lg"}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Center h={'full'}>
          <Text fontSize={'sm'}>Drop the files here ...</Text>
        </Center>
      ) : (
        <Center h={'full'}>
          <Text fontSize={'sm'}>Drag 'n' drop some files here, or click to select files</Text>
        </Center>
      )}
    </Box>
  );
}
