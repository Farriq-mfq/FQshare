import { Box, HStack, IconButton } from "@chakra-ui/react";
import React from "react";
import { HiX } from "react-icons/hi";
interface IListFile {
  file: File;
  onDelete(): void;
  loading: boolean;
}
export default function ListFile({ file, onDelete, loading }: IListFile) {
  const handleDelete = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    onDelete();
  }, []);
  return (
    <Box
      border={"1px"}
      borderColor={"gray.200"}
      rounded={"lg"}
      p={"3"}
      w={"full"}
    >
      <HStack>
        <Box flex={"1"}>{file.name}</Box>
        <IconButton
          variant={"ghost"}
          aria-label="delete-file"
          icon={<HiX />}
          onClick={handleDelete}
          isLoading={loading}
        />
      </HStack>
    </Box>
  );
}
