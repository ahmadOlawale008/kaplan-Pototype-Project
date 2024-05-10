import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Paper,
  Typography,
  Grid,
  Link,
  colors,
  Stack,
  CardContent,
  CardHeader,
  Divider,
  CardActions,
  Button,
  Tooltip,
} from "@mui/material";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import imageA from "../../styles/icons/undraw_personal_info_re_ur1n.svg";
import HomePageMainProfileTab from "./homePageMainProfileTab";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import "swiper/css";

import { FileText, Link2 } from "react-feather";

export default function HomePageProfile() {
  return (
    <Box
      sx={{
        px: 2,
        my: 1,
        border: "none",
        boxShadow: "none",
        height: "100vh",
        maxHeight: "100%",
        overflow: "scroll",
        scrollBehavior: "smooth",
        bgcolor: "transparent",
      }}
      className="homepageNav-left"
    >
      <Card
        elevation={2}
        className="homePageProfileCard-02 mainProfileIntroDisplay  homepageProfileDetailCard"
      >
        <Grid container direction={"row"} alignItems={"center"}>
          <Grid item md={7} xl={7} lg={7}>
            <Typography
              p={3}
              component={"header"}
              variant="h4"
              fontWeight={700}
            >
              Welcome back,
              <Typography
                variant="span"
                sx={{
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextFillColor: "#ced1d1",
                  WebkitTextStrokeColor: "#cccdcd",
                  ml: 1,
                }}
              >
                Louis Vuitton
              </Typography>
              <Typography my={2}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
                distinctio iure necessitatibus voluptatum, repellat sed
                reprehenderit dicta, eos ut laudantium repellendus porro non!
              </Typography>
              <Typography fontSize={"small"}>
                You have
                <Link sx={{ color: "initial", cursor: "pointer", ml: "2px" }}>
                  0 notifications
                </Link>
              </Typography>
            </Typography>
          </Grid>
          <Grid item md={5} lg={5}>
            <CardMedia
              sx={{ width: "60%", height: 200, backgroundSize: "contain" }}
              image={imageA}
            ></CardMedia>
          </Grid>
        </Grid>
      </Card>
      <Box my={4}>
        <Typography variant="h5" mb={2} fontWeight={600}>
          Recent analysis
        </Typography>
        <Stack
          component={Swiper}
          py={2}
          spaceBetween={10}
          slidesPerView={2.5}
          keyboard
          modules={[Keyboard]}
          onSlideChange={() => console.log("Changed")}
          onSwiper={() => console.log("swiped")}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((d) => (
            <SwiperSlide key={d}>
              <Card
                className="mainProfileCard"
                sx={{
                  borderRadius: 3,
                  bgcolor: "none",
                  border: "1px solid #a7a7a7",
                }}
              >
                <CardHeader
                  title={
                    <Stack spacing={1}>
                      <FileText
                        width={30}
                        color={colors.grey[400]}
                        height={30}
                      />
                      <Typography variant="h5" fontWeight={600}>
                        Neural network
                      </Typography>
                    </Stack>
                  }
                ></CardHeader>
                <CardContent sx={{ py: 0 }}>
                  <Typography fontSize={15}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae, nihil!
                  </Typography>
                  <CardActions>
                    <Button
                      href="/datasets/louis-vuitton-Neural network"
                      startIcon={<Link2 opacity={0.6} width={17} height={17} />}
                      endIcon={
                        <ArrowForwardIosRoundedIcon
                          sx={{ fontSize: "1rem!important" }}
                        />
                      }
                      className="btn-transform-none"
                      color="secondary"
                      variant="outlined"
                    >
                      Visit site
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Stack>
      </Box>
      <Box>
        <HomePageMainProfileTab />
      </Box>
    </Box>
  );
}
