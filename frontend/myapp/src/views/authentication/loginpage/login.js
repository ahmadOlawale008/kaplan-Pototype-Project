import {
  Box,
  Typography,
  IconButton,
  Container,
  colors,
  Dialog,
  Stack,
} from "@mui/material";
import { useReducer, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LoginCard from "./loginCard";
const reducer = () => {};
const initializer = Object.freeze({
  username: "",
  password: "",
});
const LoginPage = () => {
  return (
    <Dialog fullScreen open>
      <Stack mx={3} my={2} direction={'row'} alignItems={'center'} justifyContent={"space-between"}>
      <Box>
        <Typography
          color={colors.common.black}
          fontWeight={700}
          fontSize={25}
          textAlign={"left"}
        >
          A-Notebook
        </Typography>
      </Box>
      <Box ml={"auto"}>
        <IconButton href="/" color="secondary" size="large">
          <CloseRoundedIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
      </Stack>
      <Container maxWidth={"md"} bgcolor={"red"}>
        <Box>
          <LoginCard />
        </Box>
      </Container>
    </Dialog>
  );
};
export default LoginPage;
