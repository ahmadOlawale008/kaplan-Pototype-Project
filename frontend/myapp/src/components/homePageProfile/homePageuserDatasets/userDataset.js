import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  Grid,
  CardContent,
  Button,
  CardHeader,
  colors,
  Divider,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import DatasetIcon from "@mui/icons-material/Dataset";
import { ArrowRight, Plus, Search } from "react-feather";

import Example from "../../../views/examples/sampleA";
import DatasetsTable from "./datasetsTable";
import { useOutletContext } from "react-router-dom";
import UploadFile from "../../UploadImage/upload";
import { DatasetContext } from "../../../views/homepage/homePageMainProfileTab";
export default function UserDataset() {
  const [displayUploadDataset, setDisplayUploadDataset] = useState(false);
  const [expandMore, setExpandMore] = useState(undefined);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedName, setSelectedName] = useState([]);
  const selectedItem = Boolean(selectedName);
  const openMenu = Boolean(expandMore);
  const {user_datasets} = useContext(DatasetContext);
  const handleSearchChange = (e) => {};

  return (
    <Stack spacing={2}>
      <Grid
        maxWidth={"100%"}
        alignItems={"stretch"}
        m={0}
        spacing={2}
        container
      >
        <Grid pl={"0!important"} item md={3} lg={3} xl={3}>
          <Stack height={"100%"} spacing={2}>
            <div
              style={{ height: "100%", maxHeight: "50%" }}
              className="cardMainprofile-01"
            >
              <Card
                elevation={2}
                sx={{ height: "100%" }}
                className="homePageProfileCard-02  homepageProfileDetailCard"
              >
                <CardHeader
                  title={
                    <Typography
                      display={"flex"}
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      Dataset <DatasetIcon />
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography
                    textAlign={"center"}
                    variant="h2"
                    fontWeight={700}
                    color={"primary.dark"}
                  >
                    13
                  </Typography>
                  <Divider sx={{ my: 0.6 }} />
                  <Box>
                    <Button
                      disableTouchRipple
                      fullWidth
                      sx={{
                        textTransform: "none",
                        justifyContent: "start",
                        "&:hover": { background: "transparent" },
                      }}
                      size="small"
                      color="secondary"
                      endIcon={
                        <ArrowRight
                          fontSize={"1.5rem"}
                          style={{ width: 14, height: 14 }}
                        />
                      }
                    >
                      View report
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </div>
            <div
              style={{ height: "100%", maxHeight: "50%" }}
              className="cardMainprofile-02"
            >
              <Card
                onClick={() => setDisplayUploadDataset(true)}
                component={Stack}
                elevation={1}
                sx={{
                  height: "100%",
                  maxHeight: 200,
                  minHeight: 150,
                  margin: "0 auto",
                  width: "100%",
                  cursor: "pointer",
                  justifyContent: "center",
                }}
                className="homePageProfileCard-03 background-upload homepageProfileDetailCard"
              >
                <Box
                  width={40}
                  height={40}
                  borderRadius={"50%"}
                  display={"flex"}
                  margin={"1rem auto"}
                  bgcolor={"primary.dark"}
                >
                  <Plus
                    style={{
                      margin: "auto",
                      display: "block",
                      color: colors.common.white,
                    }}
                    width={20}
                    height={20}
                  />
                </Box>
                <Typography textAlign={"center"} fontWeight={500}>
                  Add dataset
                </Typography>
              </Card>
              {displayUploadDataset && (
                <UploadFile
                  display={displayUploadDataset}
                  setDisplay={setDisplayUploadDataset}
                />
              )}
            </div>
          </Stack>
        </Grid>
        <Grid item md={9} lg={9} xl={9}>
          <Stack height={"100%"}>
            <Card
              sx={{ height: "100%", maxHeight: "100%" }}
              className="homePageProfileCard-02  homepageProfileDetailCard"
            >
              <CardHeader
                title={
                  <Stack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    direction={"row"}
                  >
                    <Typography
                      fontWeight={600}
                      display={"flex"}
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      Your analysis on recent dataset
                    </Typography>
                    <Box>
                      <Typography fontSize={"small"}>
                        Since last 7 days
                      </Typography>
                    </Box>
                  </Stack>
                }
              />
              <CardContent>
                <Example />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Box my={2}></Box>
      <Box>
        <Paper sx={{ p: 2 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mx={1}
          >
            <Typography variant={"h5"} fontWeight={700}>
              Your Datasets
            </Typography>
            <Stack
              spacing={3}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack alignItems={"center"}>
                <Typography variant="h5" fontWeight={600}>
                  {user_datasets.data.length}
                </Typography>
                <Typography fontSize={"small"}>total</Typography>
              </Stack>
              <Divider orientation="vertical"></Divider>
              <Stack alignItems={"center"}>
                <Typography variant="h5" fontWeight={600}>
                  1
                </Typography>
                <Typography fontSize={"small"}>CSV</Typography>
              </Stack>
            </Stack>
          </Stack>
          <DatasetsTable data={user_datasets} />
        </Paper>
      </Box>
    </Stack>
  );
}
