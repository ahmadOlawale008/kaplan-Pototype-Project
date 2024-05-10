import {
  Avatar,
  Box,
  CircularProgress,
  Fab,
  FormHelperText,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  colors,
} from "@mui/material";
import HomePageProfileNav from "./homePageNav";
import HomePageProfileMainPage from "./homePageMainProfile";
import { Outlet } from "react-router-dom";
import NavbarLayoutPage from "../../components/navbar/navbarLayout";
import AssistantIcon from "@mui/icons-material/Assistant";
import { createContext, useRef, useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import axiosInstance from "../../hooks/axiosInstance";
import { LoadingButton } from "@mui/lab";

const HomePage = () => {
  const [chatBotElement, setChatBotElement] = useState(null);
  const [message, setMessage] = useState("");
  const [response, setMessagResponse] = useState([
    "Hello, how may i help you ?",
  ]);
  const [loading, setLoading] = useState(false);
  const chat_bool = Boolean(chatBotElement);
  const [chat_error, setChat_error] = useState(false);

  const total_response = response.length;
  const [content, setContent] = useState([
    <Stack
      direction={"row"}
      alignItems={"normal"}
      spacing={1}
      className="chat-bot"
      width={"70%"}
    >
      <Avatar>
        <SmartToyIcon />
      </Avatar>
      <Box>
        <Typography fontWeight={600}>Bot</Typography>
        <Box
          borderRadius={"7px"}
          px={2}
          py={1}
          bgcolor={"primary.light"}
          width={"100%"}
        >
          <Typography color={colors.common.white}>{response[0]}</Typography>
        </Box>
      </Box>
    </Stack>,
  ]);
  const handleChatSubmit = (e) => {
    setContent((prev) => [
      ...prev,
      <Stack
      
        direction={"row-reverse"}
        alignItems={"normal"}
        spacing={1}
        className="chat-sender"
        width={"70%"}
        ml={"auto!important"}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>AN</Avatar>
        <Box>
          <Typography textAlign={"right"} fontWeight={600}>
            Louis Vuitton
          </Typography>
          <Box
            borderRadius={"7px"}
            px={2}
            py={1}
            bgcolor={colors.blueGrey[100]}
            width={"100%"}
          >
            <Typography color={"initial"}>{message}</Typography>
          </Box>
        </Box>
      </Stack>,
    ]);
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setChat_error(false);
    axiosInstance
      .post("chat", { message: message.trim() })
      .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          setMessagResponse((prev) => [
            ...prev,
            res.data.message != null && res.data?.message[0]?.content,
          ]);
          setContent((prev) => [
            ...prev,
            <Stack
              direction={"row"}
              alignItems={"normal"}
              spacing={1}
              className="chat-bot"
              width={"70%"}
            >
              <Avatar>
                <SmartToyIcon />
              </Avatar>
              <Box>
                <Typography fontWeight={600}>Bot</Typography>
                <Box
                  borderRadius={"7px"}
                  px={2}
                  py={1}
                  bgcolor={"primary.light"}
                  width={"100%"}
                >
                  <Typography color={colors.common.white}>
                    {res.data.message != null && res.data?.message[0]?.content}
                  </Typography>
                </Box>
              </Box>
            </Stack>,
          ]);
        } else {
          setChat_error(true);
        }
      })
      .catch((error) => {
        setChat_error(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    e.target.name === "message" && setMessage(e.target.value);
  };
  return (
    <div className="home-page">
      <Box mt={8}>
        <NavbarLayoutPage />
      </Box>
      <Box height={"calc(100vh - 64px)"} sx={{ overflowY: "hidden" }}>
        <Grid height={"100%"} container>
          <Grid item md={3} lg={3} xl={3}>
            <HomePageProfileNav />
          </Grid>
          <Grid item md={9} lg={9} xl={9}>
            <Outlet />
            <Tooltip title="Chat bot" placement="left-start">
              <Fab
                onClick={(e) => setChatBotElement(e.currentTarget)}
                aria-expanded={chat_bool ? "true" : undefined}
                id="chat_botBtn"
                aria-controls={chat_bool ? "chat-menu" : undefined}
                aria-haspopup="true"
                sx={{ position: "fixed", bottom: 35, right: 35 }}
                size="large"
                color="secondary"
                aria-label="add"
              >
                <AssistantIcon />
              </Fab>
            </Tooltip>
            <Menu
              onClose={() => setChatBotElement(null)}
              MenuListProps={{
                "aria-labelledby": "chat_botBtn",
              }}
              id="chat-menu"
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={chat_bool}
              anchorEl={chatBotElement}
            >
              <Box
                p={2}
                width={600}
                height={400}
                maxHeight={"100%"}
                sx={{ overflow: "hidden" }}
              >
                <Typography fontWeight={600} variant="h6">
                  ChatBot AI
                </Typography>
                <Typography fontSize={"smaller"}>
                  Powered with bard ai
                </Typography>
                <Box>
                  <div className="chat-boxwrapper">
                    <Stack
                      py={2}
                      height={250}
                      maxHeight={"100%"}
                      overflow={"hidden auto"}
                      className="chat-box homepageNav-lef"
                      spacing={2}
                      component={"div"}
                    >
                      {content.map((d, i)=><div key={i}>{d}</div>)}
                      {loading && (
                        <Stack
                          direction={"row"}
                          alignItems={"normal"}
                          spacing={1}
                          className="chat-bot"
                          width={"70%"}
                        >
                          <Avatar>
                            <SmartToyIcon />
                          </Avatar>
                          <Box>
                            <Typography fontWeight={600}>Bot</Typography>
                            <Box
                              borderRadius={"7px"}
                              px={2}
                              py={1}
                              bgcolor={"primary.light"}
                              width={"100%"}
                            >
                              <Typography color={colors.common.white}>
                                <CircularProgress color="secondary" />
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      )}
                    </Stack>
                    <form
                      onChange={handleChange}
                      onSubmit={handleChatSubmit}
                      method="post"
                    >
                      <FormHelperText>
                        {chat_error && "Error whilst fetching data"}
                      </FormHelperText>
                      <TextField
                        value={message}
                        name="message"
                        autoFocus
                        error={chat_error}
                        placeholder="Type a message here"
                        InputProps={{
                          endAdornment: (
                            <LoadingButton
                              loading={loading}
                              endIcon={<SendRoundedIcon />}
                            />
                          ),
                        }}
                        size="small"
                        fullWidth
                      ></TextField>
                    </form>
                  </div>
                </Box>
              </Box>
            </Menu>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default HomePage;
