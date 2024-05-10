import {
  Box,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function HomePageDatasets() {
  return (
    <>
      <Box
        sx={{
          m: 2,
          px:1,
          pb: 7,
          border: "none",
          boxShadow: "none",
          height: "100vh",
          maxHeight: "100%",
          overflow: "scroll",
          scrollBehavior: "smooth",
          bgcolor: "transparent",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
