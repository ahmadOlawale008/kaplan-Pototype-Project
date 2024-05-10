import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  colors,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import NavbarLayoutPage from "./components/navbar/navbarLayout";
import "./index.css";
import { useEffect, useState } from "react";
import Loading from "./components/Loading/loading";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: colors.orange[800],
      light: colors.orange[700],
      dark: colors.orange[900],
      contrastText: colors.common.white,
    },
    secondary: {
      main: "#040D12",
      light: "#040D12",
      dark: colors.common.black,
      contrastText: colors.common.white,
    },
    navbar: {
      main: colors.common.white,
      dark: colors.common.black,
      contrastText: colors.common.black,
    },
    // tab:{
    //   main: "#e1e1e1",
    //   dark: "#e1e1e1",
    //   light: "#e1e1e1",
    //   contrastText: colors.common.black,

    // }
  },
  typography: {
    fontFamily: "Raleway",
  },
});

function App() {
  const [pageLoading, setPageLoading] = useState(true);
  const loaderFunction = () => {
    setPageLoading(false);
  };
  useEffect(() => {
    loaderFunction();
    window.addEventListener("load", loaderFunction);
    return () => {
      window.removeEventListener("load", loaderFunction);
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Outlet />
        {pageLoading && <Loading />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
