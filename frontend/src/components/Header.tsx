import { Box, Button, Container, Text } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
const Header = () => {
  return (
    <Box
      position={"sticky"}
      top={"0"}
      h={"16"}
      bg={"white"}
      borderBottom={"1px"}
      borderColor={"gray.300"}
      display={"flex"}
      alignItems={"center"}
    >
      <Container maxW={"8xl"} display={"flex"} justifyContent={"space-between"}>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="xl"
          fontWeight="extrabold"
        >
          Welcome to Fqshare
        </Text>
        <Button
          as={"a"}
          href="https://github.com/Farriq-mfq/FQshare"
          target="_blank"
          leftIcon={<AiFillGithub />}
          variant={"outline"}
        >
          Github
        </Button>
      </Container>
    </Box>
  );
};

export default Header;
