import { Box, Container, Grid } from "@chakra-ui/react";
import Upload from "../components/Upload";
import Welcome from "../components/Welcome";

export default function Home() {
  return (
    <Container maxW={"8xl"} mt={"4"}>
      <Grid
        gridTemplateColumns={{ lg: "repeat(2,1fr)", base: "repeat(1,1fr)" }}
        gap={"4"}
        w={"full"}
        minH={"80vh"}
        alignItems={"center"}
      >
        <Box order={{ base: "2", lg: "1" }}>
          <Upload />
        </Box>
        <Box order={{ base: "1", lg: "2" }}>
          <Welcome />
        </Box>
      </Grid>
    </Container>
  );
}
