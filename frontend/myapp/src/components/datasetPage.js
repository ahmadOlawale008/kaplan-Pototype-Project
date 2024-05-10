import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  colors,
  Stack,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Box,
  TableBody,
  TableContainer,
  Paper,
  Divider,
  Pagination,
  PaginationItem,
  CircularProgress,
  Tab,
  TablePagination,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";

import { ArrowDown, ArrowUp, Download, FileText, Link2 } from "react-feather";
import { Outlet, useParams, useSearchParams, Link } from "react-router-dom";
import GetFile from "../hooks/get_file";
// import { Bars, Circles, LineWave, TailSpin } from "react-loader-spinner";
import { get_sizes } from "./UploadImage/upload";
import styled from "@emotion/styled";
import Example from "../views/examples/sampleA";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const DatasetPage = () => {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState("1");

  const [params, setParams] = useSearchParams();
  const searchParams = params.get("page");
  const pageNumber = searchParams ? parseInt(searchParams) : 1;
  const { data, loading, errorMessage, error, loadNew } = GetFile({
    path: name,
    pageNumber,
  });
  console.log(data);

  let fetchedFile = data.file ? data.file : [];
  const headers = Object.keys(fetchedFile);

  const StyledCard = styled(Card)(({ theme }) => ({
    "& .MuiPaper-root": {
      height: "100%",
      background: "red",
    },
  }));

  return (
    <div>
      <Outlet context={{ data, loading, errorMessage, error, loadNew }} />
      <Card
        className="mainProfileCard-large"
        sx={{
          borderRadius: 3,
          bgcolor: "none",
          border: "1px solid #a7a7a7",
          px: 2,
          py: 1,
        }}
      >
        <CardHeader
          title={
            <Stack spacing={1}>
              <FileText width={30} color={colors.orange[900]} height={30} />
              <Typography variant="h5" fontWeight={600}>
                Analyze your dataset
              </Typography>
            </Stack>
          }
        ></CardHeader>
        <CardContent sx={{ py: 0 }}>
          <Typography fontSize={15}>
            Empower your data: Unleash the potential with our cutting-edge
            dataset analysis and training program !
          </Typography>
        </CardContent>
      </Card>
      {error ? (
        <Box
          m="auto"
          height={300}
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography color={colors.red[700]} fontSize={20} fontWeight={600}>
            {errorMessage}
          </Typography>
        </Box>
      ) : loading ? (
        <Box
          m="auto"
          height={300}
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* <LineWave color={colors.orange[600]} /> */}
        </Box>
      ) : (
        <>
          <Stack
            spacing={3}
            my={2}
            maxWidth={"100%"}
            sx={{ overflowX: "hidden" }}
          >
            <Grid
              maxWidth={"100%"}
              alignItems={"stretch"}
              columnSpacing={"20px"}
              container
            >
              <Grid pl={"0!important"} item md={6} lg={6}>
                <Stack sx={{ height: "100%" }}>
                  <Card sx={{ height: "100%", maxHeight: "100%" }}>
                    <CardHeader
                      title={
                        <Typography variant="h5" fontWeight={700}>
                          About your dataset
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Stack
                        sx={{ color: colors.grey[700], height: "100%" }}
                        spacing={2}
                      >
                        <Stack direction={"row"} spacing={1}>
                          <Typography fontSize={15} fontWeight={500}>
                            Name:
                          </Typography>
                          <Typography fontSize={15} fontWeight={500}>
                            {data.title}
                          </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={1}>
                          <Typography fontSize={15} fontWeight={500}>
                            Size:
                          </Typography>
                          <Typography fontSize={15} fontWeight={500}>
                            {data.converted_size}
                          </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={1}>
                          <Typography fontSize={15} fontWeight={500}>
                            Date created:
                          </Typography>
                          <Typography fontSize={15} fontWeight={500}>
                            {data.created}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button
                        LinkComponent={Link}
                        to={`../${name}/analyze-dataset`}
                        className="btn-transform-none"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        endIcon={<Download width={15} height={15} />}
                      >
                        Download dataset
                      </Button>
                    </CardActions>
                  </Card>
                </Stack>
              </Grid>
              <Grid pr={0} item md={6} lg={6}>
                <Stack sx={{ height: "100%" }}>
                  <Card sx={{ height: "100%", maxHeight: "100%" }}>
                    <CardHeader
                      title={
                        <Typography variant="h5" fontWeight={700}>
                          {data.title}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Stack sx={{ color: colors.grey[700] }} spacing={1}>
                        <div>
                          <Typography fontSize={15}>
                            Columns:{" "}
                            <span style={{ fontWeight: "600" }}>
                              {headers.length}
                            </span>
                          </Typography>
                          <Grid container spacing={1} alignItems={"baseline"}>
                            {headers.map((d) => (
                              <Grid key={d} md={3} sm={3} item>
                                <Typography
                                  fontSize={"small"}
                                  key={d}
                                  fontWeight={500}
                                >
                                  {d}
                                </Typography>
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                        <div>
                          <Stack direction={"row"} spacing={1}>
                            <Typography fontSize={15}>
                              Total rows:
                              <span
                                style={{ fontWeight: "600", marginLeft: 5 }}
                              >
                                {data.total_items_in_file}
                              </span>
                            </Typography>
                          </Stack>
                        </div>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Paper>
              <Example />
            </Paper>
            <Box>
              <TabContext value={activeTab}>
                <TabList
                  indicatorColor="secondary"
                  sx={{ py: 0 }}
                  textColor="secondary"
                >
                  <Tab
                    onClick={() => setActiveTab("1")}
                    color="secondary"
                    value={"1"}
                    label="Report"
                    sx={{ textTransform: "none" }}
                  />
                  <Tab
                    onClick={() => setActiveTab("2")}
                    color="secondary"
                    value={"2"}
                    sx={{ textTransform: "none" }}
                    label="Analyze"
                  />
                </TabList>
                <Divider sx={{ mx: 1, py: 0 }} />
                <TabPanel sx={{ px: 0 }} value="1">
                  <Box overflow={"auto"} maxHeight={"max(70vh, 74px)"}>
                    <TableContainer
                      component={Paper}
                      className="botttom-scrollbar"
                      elevation={0}
                      sx={{ maxWidth: "100%", overflow: "auto auto", mt: 2 }}
                    >
                      <Stack m={2}>
                        <Typography variant="h6" fontWeight={700}>
                          Preview your data
                        </Typography>
                        <Typography fontWeight={600} fontSize={"small"}>
                          {data?.name?.trim()} ({data?.converted_size})
                        </Typography>
                      </Stack>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableCell sx={{ fontWeight: 600 }} key={header}>
                                {header}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(data.file[headers[0]]).map((id) => (
                            <TableRow key={id}>
                              {headers.map((header) => (
                                <TableCell
                                  sx={{ textAlign: "center" }}
                                  key={header}
                                >
                                  {data.file[header][id]
                                    ? data.file[header][id]
                                    : "---"}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {loadNew && (
                        <CircularProgress
                          color="secondary"
                          size={20}
                          sx={{
                            m: "2rem auto",
                            display: "flex",
                            alignContent: "center",
                          }}
                        />
                      )}
                    </TableContainer>
                    <Stack
                      direction={"row"}
                      spacing={3}
                      flexWrap={"nowrap"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        mx: "auto",
                        display: "flex",
                        alignItems: "center",
                        my: 2,
                      }}
                    >
                      <Pagination
                        count={parseInt(data.total_pages)}
                        page={pageNumber}
                        renderItem={(item) => (
                          <PaginationItem
                            component={Link}
                            to={`?page=${item.page}`}
                            {...item}
                          />
                        )}
                      ></Pagination>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value="2">
                  <Stack
                    spacing={3}
                    mt={4}
                    px={2}
                    py={2}
                    component={Paper}
                    overflow={"auto"}
                    minHeight={"max(70vh, 74px)"}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        Analyze
                      </Typography>
                    </Box>
                    <Grid container rowSpacing={5}>
                      <Grid item md={5} lg={5}>
                        <Typography fontSize={17} fontWeight={600}>
                          Type of analysis:
                        </Typography>
                      </Grid>
                      <Grid item md={7} lg={7}>
                        <FormControl fullWidth>
                          <InputLabel>Analysis</InputLabel>
                          <Select fullWidth>
                            <MenuItem value={"Revenue"}>Revenue</MenuItem>
                            <MenuItem value={"Customer Segmentation"}>
                              Customer Segmentation
                            </MenuItem>
                            <MenuItem value={"Customer Chun"}>
                              Customer Chun
                            </MenuItem>
                            <MenuItem value={"Hidden Patterns"}>
                              Hidden Patterns
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container rowSpacing={5}>
                      <Grid item md={5} lg={5}>
                        <Typography fontSize={17} fontWeight={600}>
                          Analysis:
                        </Typography>
                      </Grid>
                      <Grid item md={7} lg={7}></Grid>
                    </Grid>
                    <Grid container rowSpacing={5}>
                      <Grid item md={5} lg={5}>
                        <Typography fontSize={17} fontWeight={600}>
                          Interpretation:
                        </Typography>
                      </Grid>
                      <Grid item md={7} lg={7}></Grid>
                    </Grid>
                  </Stack>
                </TabPanel>
              </TabContext>
            </Box>
          </Stack>
        </>
      )}
    </div>
  );
};

export default DatasetPage;
