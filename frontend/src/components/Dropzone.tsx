import { Box, Center, Text, keyframes } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdFileUpload } from "react-icons/md";
import { motion } from "framer-motion";
type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};
const animationKeyframes = keyframes`
  0% { transform: scale(1); ; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); ; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;
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
        <Center h={"full"}>
          <Box
            as={motion.div}
            h={"20"}
            w={"20"}
            rounded={"full"}
            border={"2px"}
            borderColor={"gray.300"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"blue.500"}
            animate={{
              scale: "1.2",
            }}
          >
            <MdFileUpload size="34" />
          </Box>
        </Center>
      ) : (
        <Center h={"full"}>
          <Box
            as={motion.div}
            animation={animation}
            h={"20"}
            w={"20"}
            rounded={"full"}
            border={"2px"}
            borderColor={"gray.300"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"blue.500"}
          >
            <MdFileUpload size="34" />
          </Box>
        </Center>
      )}
    </Box>
  );
}
