import {
  Box,
  Divider,
  Typography,
  Grid,
  colors,
  MenuItem,
  Avatar,
  Stack,
  ListItemAvatar,
  Badge,
  MenuList,
  Paper,
} from "@mui/material";
import DatasetOutlinedIcon from "@mui/icons-material/DatasetOutlined";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import {
  Settings,
  User,
  HelpCircle,
  MessageCircle,
  TrendingUp,
  LogOut,
} from "react-feather";
import styled from "@emotion/styled";
import { useState } from "react";
import { Link, useLocation, useOutletContext, useParams } from "react-router-dom";

export default function HomePageProfileNav() {
  const [displayMore, setDisplayMore] = useState(false);
  const location = useLocation();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#4daa57",
      color: "#ffefda",
      boxShadow: `0 0 0 2px ${colors.common.white}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(1.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <Box
      sx={{ borderRight: "1px solid #ebebeb" }}
      component="nav"
      width={"100%"}
      height={"100%"}
      bgcolor={colors.common.white}
    >
      <Box m={1} mt={0} py={0} px={1}>
        <Stack direction={"row"} alignItems={"center"}>
          <StyledBadge
            overlap="circular"
            badgeContent={2}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Avatar sx={{ bgcolor: colors.common.black }}>
              <Typography>AN</Typography>
            </Avatar>
          </StyledBadge>
          <Box py={2} ml={2}>
            <Typography fontWeight={600}>Louis Vuitton</Typography>
            <Typography fontWeight={400} fontSize={"smaller"}>
              user_email@gmail.com
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{ overflow: "hidden auto", scrollBehavior:"smooth" }}
        height={"100%"}
        maxHeight={"100vh"}
        px={1}
        mt={3}
        pb={19}
        className="homepageNav-left"
      >
        <MenuList
          subheader={
            <Typography sx={{ opacity: 0.8 }} fontSize={15} fontWeight={500}>
              General
            </Typography>
          }
        >
          <MenuItem
            // color="secondary.dark"
            selected={location.pathname.startsWith("/profile")}
            color="primary.dark"
            sx={{ borderRadius: 34, p: 2 }}
            component={Link}
            to="/profile"
          >
            <ListItemIcon>
              <User
                fontSize={"1.5rem"}
                style={
                  location.pathname.startsWith("/profile")
                    ? { strokeWidth: 2, width: 20, height: 20, color: "#000" }
                    : { width: 20, height: 20 }
                }
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                sx={
                  location.pathname.startsWith("/profile")
                    ? { fontWeight: 500 }
                    : { fontWeight: 500 }
                }
                fontSize={15}
              >
                Profile
              </Typography>
            </ListItemText>
            <ListItemAvatar>
              <Badge overlap="rectangular" badgeContent={2} color="secondary" />
            </ListItemAvatar>
          </MenuItem>
          <MenuItem
            component={Link}
            selected={location.pathname.startsWith("/datasets")}
            color="primary.dark"
            to="/datasets"
            sx={{ borderRadius: 34, p: 2 }}
          >
            <ListItemIcon>
              <DatasetOutlinedIcon
                fontSize={"1.5rem"}
                style={
                  location.pathname.startsWith("/datasets")
                    ? { strokeWidth: 2, width: 20, height: 20, color: "#000" }
                    : { width: 20, height: 20 }
                }
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                sx={
                  location.pathname.startsWith("/datasets")
                    ? { fontWeight: 500 }
                    : { fontWeight: 500 }
                }
                fontSize={15}
              >
                Datasets
              </Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem
            selected={location.pathname.includes("/trend")}
            component={Link}
            to="/trend"
            sx={{ borderRadius: 34, p: 2 }}
          >
            <ListItemIcon>
              <TrendingUp
                fontSize={"1.5rem"}
                style={
                  location.pathname.startsWith("/trend")
                    ? { strokeWidth: 2, width: 20, height: 20, color: "#000" }
                    : { width: 20, height: 20 }
                }
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                sx={
                  location.pathname.startsWith("/trend")
                    ? { fontWeight: 500 }
                    : { fontWeight: 500 }
                }
                fontSize={15}
              >
                Trend
              </Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem
            component={Link}
            selected={location.pathname.startsWith("/settings")}
            to="/settings"
            sx={{ borderRadius: 34, p: 2 }}
          >
            <ListItemIcon>
              <Settings
                fontSize={"1.5rem"}
                style={
                  location.pathname.startsWith("/settings")
                    ? { strokeWidth: 2, width: 20, height: 20, color: "#000" }
                    : { width: 20, height: 20 }
                }
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                sx={
                  location.pathname.startsWith("/settings")
                    ? { fontWeight: 600 }
                    : { fontWeight: 500 }
                }
                fontSize={15}
              >
                Settings
              </Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => setDisplayMore(!displayMore)}
            sx={{ borderRadius: 34, p: 2 }}
          >
            <ListItemIcon>
              {displayMore ? (
                <KeyboardArrowUpRoundedIcon />
              ) : (
                <KeyboardArrowDownRoundedIcon />
              )}
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={500} fontSize={14}>
                More
              </Typography>
            </ListItemText>
          </MenuItem>
          <MenuList
            sx={displayMore ? { ml: 4, display: "block" } : { display: "none" }}
          >
            <MenuItem sx={{ borderRadius: 34, p: 2 }}>
              <ListItemText>
                <Typography fontWeight={500} fontSize={14}>
                  Item 1
                </Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem sx={{ borderRadius: 34, p: 2 }}>
              <ListItemText>
                <Typography fontWeight={500} fontSize={14}>
                  Item 2
                </Typography>
              </ListItemText>
            </MenuItem>
            <MenuItem sx={{ borderRadius: 34, p: 2 }}>
              <ListItemText>
                <Typography fontWeight={500} fontSize={14}>
                  Item 3
                </Typography>
              </ListItemText>
            </MenuItem>
          </MenuList>
        </MenuList>
        <Divider sx={{ my: 2 }} />
        <MenuList
          subheader={
            <Typography sx={{ opacity: 0.8 }} fontSize={15} fontWeight={500}>
              Team
            </Typography>
          }
        >
          <MenuItem sx={{ borderRadius: 34, p: 2 }}>
            <ListItemIcon>
              <HelpCircle
                fontSize={"1.5rem"}
                style={{ width: 20, height: 20 }}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={500} fontSize={14}>
                Help
              </Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem sx={{ borderRadius: 34, p: 2 }}>
            <ListItemIcon>
              <MessageCircle
                fontSize={"1.5rem"}
                style={{ width: 20, height: 20 }}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={500} fontSize={14}>
                Contact Support
              </Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem sx={{ borderRadius: 34, p: 2 }}>
            <ListItemIcon>
              <LogOut fontSize={"1.5rem"} style={{ width: 20, height: 20 }} />
            </ListItemIcon>
            <ListItemText>
              <Typography fontWeight={500} fontSize={14}>
                Logout
              </Typography>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  );
}
