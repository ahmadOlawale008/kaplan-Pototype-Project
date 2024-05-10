import {
    Paper,
    Box,
    FormControl,
    Typography,
    TextField,
    Stack,
    FormHelperText,
    Button,
    Divider,
    IconButton,
    Grid,
    FormControlLabel,
  } from "@mui/material";
  import { useReducer, useState } from "react";
  import { Link } from "react-router-dom";
  import Checkbox from "@mui/material/Checkbox";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
  import GooglePng from "../../../../src/styles/icons/search.png";
  import Apple from "../../../styles/icons/icons8-apple-100.png"

  const reducer = () => {};
  const initializer = Object.freeze({
    username: "",
    password: "",
  });
  
const RegisterCard = ()=>{
    const [state, action] = useReducer(reducer, initializer);
    const [passwordDisplay, setPasswordDisplay] = useState(false);
    return(
        <Box
        sx={{
          mt: 4,
          mx: 5,
          mb:2,
          maxWidth: "md",
          mx: "auto",
        }}
      >
        <Grid overflow={"hidden"} component={Paper} container>
          <Grid md={7} lg={7} xl={7} sm={12} xs={12} item>
            <Box
              maxWidth={"md"}
              mx={"auto"}
              component={Paper}
              elevation={0}
              sx={{
                  px: 3,
                  py: 2,
                }}
            >
              <Typography
                mb={5}
                fontSize={30}
                fontWeight={800}
                textAlign={"center"}
                sx={{ display: "block" }}
              >
                Create an account
              </Typography>
  
              <FormControl component={"form"} method="post" fullWidth>
                  <Stack spacing={3}>
                  <Stack spacing={2} direction={"row"} alignItems={"center"}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="First name"
                    size="small"
                    required
                  />
                                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Last name"
                    size="small"
                    required
                  />
                  </Stack>
                  <Stack spacing={2} direction={"row"} alignItems={"center"}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="email"
                    label="Email"
                    size="small"
                    required
                  />
                                    <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Phone number(not required)"
                    size="small"
                  />
                  </Stack>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Username"
                    size="small"
                    required
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type={passwordDisplay ? "text" : "password"}
                    label="Password"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setPasswordDisplay(!passwordDisplay)}
                        >
                          {passwordDisplay ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      ),
                    }}
                    required
                  />
                  <FormControlLabel
                    label="Remember me"
                    control={<Checkbox size="small" />}
                  />
  
                  <FormHelperText
                    sx={{
                      color: "blue",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                    component={Link}
                  >
                    Forgot your password?
                  </FormHelperText>
                  <Button
                    variant="contained"
                    // size="large"
                    size="small"
                    sx={{ borderRadius: 40, textTransform: "none" }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </FormControl>
              <Divider sx={{ my: 3 }}>
                <Typography>or</Typography>
              </Divider>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<img width={20} height={20} src={GooglePng}></img>}
                color="secondary"
                sx={{ borderRadius: 40, textTransform: "none" }}
              >
                Sign up with google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<img width={20} height={20} src={Apple}></img>}
                color="secondary"
                sx={{ borderRadius: 40, textTransform: "none", mt: 2 }}
              >
                Sign up with google
              </Button>
            </Box>
          </Grid>
          <Grid
            sx={{
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            bgcolor={"primary.dark"}
            item
            md={5}
            lg={5}
            xl={5}
          >
            <Box mx={2}  sx={{ color: "#fff", height: "100%" }}>
              <Stack spacing={4} mx={2} my={"auto"} alignItems={"center"} direction={"column"}>
              <Typography fontSize={40}>👋</Typography>
              <Typography fontSize={40} fontWeight={800}>Hello there !</Typography>
              <Typography fontWeight={700}>Do you have an account already?</Typography>
                <Typography textAlign={"center"} fontSize={15}>
                  With the help of our cutting-edge scanning technology, explore
                  and find hidden patterns inside datasets.
                </Typography>
                <Divider></Divider>
                <Button component={Link}  color="secondary" to="/login" fullWidth variant="contained" sx={{borderRadius: 12}}>
                  Sign in
                </Button>
                <Typography></Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
}
export default RegisterCard