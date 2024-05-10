import { useTheme } from "@emotion/react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchComponent from "./searchComponent";
import { Bell, ChevronDown, Edit2, Search, Settings } from "react-feather";

const NavbarLayoutPage = () => {
  const [expandMore, setExpandMore] = useState(null);
  const [authMenu, setAuthMenu] = useState(null);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [scrollYPosition, setScrollYPosition] = useState(null);
  const openAuthMenu = Boolean(authMenu);
  const openMenu = Boolean(expandMore);
  const setScrollPosition = () => {
    setScrollYPosition(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", setScrollPosition);
    return () => window.removeEventListener("scroll", setScrollPosition);
  }, [scrollYPosition]);
  const animatedMenu = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0.3,
    },
  };
  const animatedMenuChildren = {
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        stiffness: 300,
        damping: 24,
      },
    },
    hidden: {
      x: -100,
      opacity: 0.4,
    },
  };
  return (
    <>
      <AppBar
        color="navbar"
        elevation={0}
        sx={scrollYPosition != 0 && { borderBottom: "1px solid  #f8f8f8" }}
        position="fixed"
        id="navbar-menu"
      >
        <Toolbar sx={{ mx: 1 }}>
          <Typography
            component={RouterLink}
            to={"/"}
            sx={{ textDecoration: "none", color: "primary.main" }}
            underline="none"
            fontWeight={700}
            fontSize={19}
          >
            A-Notebook
          </Typography>
          <Stack
            flex={1}
            alignItems={"baseline"}
            mx={2}
            direction={"row"}
            spacing={2}
          >
            <Typography>
              <Link
                fontFamily={"inherit"}
                fontSize={15}
                underline="none"
                color={"initial"}
                component={RouterLink}
              >
                Trend
              </Link>
            </Typography>
            <Typography>
              <Link
                fontFamily={"inherit"}
                fontSize={15}
                underline="none"
                color={"initial"}
                to={"/profile/datasets"}
                component={RouterLink}
              >
                Your datasets
              </Link>
            </Typography>
            <Typography>
              <Link
                fontFamily={"inherit"}
                fontSize={15}
                underline="none"
                color={"initial"}
                component={RouterLink}
              >
                About
              </Link>
            </Typography>
            <Button
              id="menu-btn01"
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                bgcolor: "transparent",
                color: "#000",
                textTransform: "none",
                fontWeight: 400,
              }}
              onClick={(e) => setExpandMore(e.currentTarget)}
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              disableElevation
              disableFocusRipple
              disableTouchRipple
              disableRipple
              focusRipple={false}
              centerRipple={true}
            >
              More
            </Button>
            <Menu
              elevation={0}
              component={motion.div}
              variants={animatedMenu}
              animate={openMenu ? "visible" : "hidden"}
              initial="hidden"
              id="basic-menu"
              open={openMenu}
              anchorEl={expandMore}
              onClose={() => setExpandMore(null)}
              MenuListProps={{
                "aria-labelledby": "menu-btn01",
                style: {
                  border: "1px solid #f8f8f8",
                },
              }}
            >
              <MenuItem
                component={motion.li}
                variants={animatedMenuChildren}
                sx={{ pr: 8, fontSize: 14 }}
              >
                About
              </MenuItem>
              <MenuItem
                component={motion.li}
                variants={animatedMenuChildren}
                sx={{ pr: 8, fontSize: 14 }}
              >
                Popular
              </MenuItem>
              <Divider />
              <MenuItem
                component={motion.li}
                variants={animatedMenuChildren}
                sx={{ pr: 8, fontSize: 14 }}
              >
                Item 4
              </MenuItem>
              <MenuItem
                component={motion.li}
                variants={animatedMenuChildren}
                sx={{ pr: 8, fontSize: 14 }}
              >
                Item 5
              </MenuItem>
            </Menu>
          </Stack>
          <Stack
            flex={1}
            justifyContent={"end"}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            <IconButton
              color="primary"
              onClick={() => setDisplaySearch(true)}
              size="small"
            >
              <Search strokeWidth={1.3} width={"1em"} height={"1em"} fontSize={"1.225em"} />
            </IconButton>
            <IconButton component={Link} href="/settings" color="primary" size="small">
              <Settings strokeWidth={1.3} fontSize="1em" />
            </IconButton>
            <IconButton size="small" color="primary">
              <Badge color="secondary" variant="dot" badgeContent={1}>
                <Bell strokeWidth={1.3} width={"1em"} height={"1em"} fontSize={"1.225em"} />
              </Badge>
            </IconButton>
            {/* <IconButton
              id="menu-btn02"
              onClick={(e) => setAuthMenu(e.currentTarget)}
              aria-controls={openAuthMenu ? "basic-menu02" : undefined}
              aria-expanded={openAuthMenu ? "true" : undefined}
              aria-haspopup={"true"}
              size="small"
              sx={{ borderRadius: 2, border: "1px solid " }}
            >
              <PersonOutlinedIcon fontSize={"1em"} />
            </IconButton> */}
            <Stack
              id="menu-btn02"
              onClick={(e) => setAuthMenu(e.currentTarget)}
              aria-controls={openAuthMenu ? "basic-menu02" : undefined}
              aria-expanded={openAuthMenu ? "true" : undefined}
              aria-haspopup={"true"}
              direction={"row"}
              alignItems={"center"}
              sx={{ cursor: "pointer" }}
            >
              <Avatar
                sx={{ width: 30, height: 30, bgcolor: "secondary.main" }}
                // size="small"
                disableFocusRipple
                disableRipple
                disableTouchRipple
                component={IconButton}
              >
                {/* <PersonOutlinedIcon  width={"1em"} height={"1em"} fontSize={"1.225em"} /> */}
                <Typography fontSize={"smaller"}>AN</Typography>
              </Avatar>
              <ChevronDown strokeWidth={1.3} fontSize={"1.5rem"} style={{ width: 15, height: 15 }} />
            </Stack>
            <Menu
              id="basic-menu02"
              open={openAuthMenu}
              onClose={() => setAuthMenu(null)}
              anchorEl={authMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              MenuListProps={{
                "aria-labelledby": "menu-btn02",
                sx: {
                  p: 2,
                  my: 0,
                },
              }}
              TransitionProps={{
                style: {
                  width: "100%",
                  borderRadius: 5,
                  maxWidth: 350,
                },
              }}
            >
              <Stack spacing={2}>
                <Box
                  alignItems={"center"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  display={"flex"}
                >
                  <Badge
                    size="large"
                    color="primary"
                    overlap="circular"
                    badgeContent={<Edit2 strokeWidth={2} fontSize={"1rem"} style={{ width: 14, height: 14 }}  />}
                  >
                    <Avatar sx={{ bgcolor: "secondary.main" }}><Typography>AN</Typography></Avatar>
                  </Badge>
                  <Typography fontWeight={500}>Hello, user</Typography>
                  <Typography fontSize={"smaller"}>
                    user_email@gmail.com
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight={500} fontSize={"small"}>
                    <Typography
                      variant={"b"}
                      fontSize={"inherit"}
                      component={"b"}
                      mr={"2px"}
                    >
                      Not signed in yet?
                    </Typography>
                    Set up an account with us. It is free, as are scanning
                    datasets and querying datasets.
                  </Typography>
                  <Stack
                    flexWrap={"wrap"}
                    alignItems={"center"}
                    justifyContent={"baseline"}
                    direction={"row"}
                    mt={1}
                    spacing={2}
                  >
                    <Button
                      startIcon={<AccountCircleIcon />}
                      component={Link}
                      href="/register"
                      sx={{ textTransform: "none" }}
                      variant="contained"
                    >
                      Create an account
                    </Button>
                    <Button
                      component={Link}
                      href="/login"
                      sx={{ textTransform: "none" }}
                      variant="outlined"
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Link
                    sx={{ cursor: "pointer" }}
                    underline="hover"
                    fontSize={"small"}
                    color={"secondary"}
                  >
                    Admin Login
                  </Link>
                </Box>
              </Stack>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
      <SearchComponent on={displaySearch} setDisplayState={setDisplaySearch} />
    </>
  );
};
export default NavbarLayoutPage;
