import { Box, Container } from "@chakra-ui/react";
import Upload from "../components/Upload";

export default function Home() {
  return (
    <Container
      maxW={"8xl"}
      mt={"4"}
      display={"flex"}
      justifyContent={"center"}
      minH={"80vh"}
      alignItems={"center"}
    >
      <Box w={"xl"} shadow={"xl"} p={"5"} rounded={"lg"} border={'1px'} borderColor={'gray.300'}>
        <Upload />
      </Box>
    </Container>
  );
}
