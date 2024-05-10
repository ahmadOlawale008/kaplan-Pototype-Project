import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  Divider,
  Radio,
  RadioGroup,
  CardHeader,
  CardContent,
  Pagination,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import { Search, X } from "react-feather";
const SearchMainPage = () => {
  return (
    <>
      <div className="main-searchpage" style={{ paddingTop: 6, margin: 19 }}>
        <Box m={"0 auto"} justifyContent={"end"} display={"flex"}><IconButton color="secondary"><X  width={30} height={30}/></IconButton></Box>
        <Box>
          <Typography fontSize={40} fontWeight={600} textAlign={"center"}>
            Search Topics, datasets, models...
          </Typography>
          <Box sx={{ m: "80px auto" }}>
            <form>
              <TextField
                name="query"
                fullWidth
                type="search"
                placeholder="Search..."
                InputProps={{
                  style: {
                    borderRadius: "90rem",
                  },
                  endAdornment: <Search style={{ opacity: 0.5 }} />,
                }}
              ></TextField>
            </form>
            <Box>
              <Typography sx={{ my: 2 }} fontWeight={700}>
                Trending
              </Typography>
              <Stack my={1} spacing={2} direction={"row"}>
                <Chip clickable label="label 1" />
                <Chip clickable label="label 1" />
                <Chip clickable label="label 1" />
                <Chip clickable label="label 1" />
                <Chip clickable label="label 1" />
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box>
          <Grid spacing={3} container>
            <Grid md={2} lg={2} xl={2} item>
              <Box>
                <Typography display={"flex"} alignItems={"center"} fontWeight={600}>
                  <FilterListRoundedIcon fontSize="small" sx={{mr:.7}} />
                  Filter by</Typography>
                <Divider />
                <FormControl sx={{ mt: 2 }}>
                  <FormLabel>Date</FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      value={"last 7 days"}
                      label="last 7 days"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                    <FormControlLabel
                      value={"last month"}
                      label="last 7 days"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                    <FormControlLabel
                      value={"last 3 months"}
                      label="last 7 days"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                  </RadioGroup>
                </FormControl>
                <Divider />
                <FormControl sx={{ mt: 2 }}>
                  <FormLabel>Dataset type</FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      value={"type 1"}
                      label="type 1"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                    <FormControlLabel
                      value={"type 2"}
                      label="type 2"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                    <FormControlLabel
                      value={"type 3"}
                      label="type 3"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                  </RadioGroup>
                </FormControl>
                <Divider />
                <FormControl sx={{ mt: 2 }}>
                  <FormLabel>Dataset type</FormLabel>
                  <RadioGroup>
                    <FormControlLabel
                      value={"type 1"}
                      label="type 1"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                    <FormControlLabel
                      value={"type 2"}
                      label="type 2"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                    <FormControlLabel
                      value={"type 3"}
                      label="type 3"
                      control={<Radio size="small" />}
                    ></FormControlLabel>
                  </RadioGroup>
                </FormControl>
                <Divider />
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: 60, mt: 2, textTransform: "none" }}
                >
                  Clear filters
                </Button>
              </Box>
            </Grid>
            <Grid md={6} lg={6} xl={6} item>
              <Box>
                <Typography>8 results</Typography>
              </Box>
              <Divider />
              {[1, 2, 3, 4, 5, 6, 7, 8].map((d) => {
                return (
                  <Box sx={{ cursor: "pointer" }} key={d} my={2}>
                    <Card elevation={1} square>
                      {/* <CardMedia sx={{width: 70, height: 70}} image="https://www.analyticsvidhya.com/wp-content/uploads/2016/08/Artificial-Intelligence-Neural-Network-Nodes-670x440.jpg"></CardMedia> */}
                      <Box>
                        <CardHeader
                          titleTypographyProps={{
                            fontWeight: 600,
                            fontSize: 18,
                          }}
                          title="Neural network: Diagonising diseases from medical images, predicting outcomes and drug discovery"
                        ></CardHeader>
                        <CardContent sx={{ px: 2, py: 0 }}>
                          <Typography variant="body2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Delectus eum neque corrupti esse ex eius
                            sequi. Ipsa, amet error.
                          </Typography>
                          <Stack
                            flexWrap={"wrap"}
                            direction={"row"}
                            alignItems={"baseline"}
                            spacing={2}
                            my={0.3}
                          >
                            <Stack direction={"row"} alignItems={"baseline"}>
                              <Typography mr={1} fontSize={13} fontWeight={600}>
                                Type:
                              </Typography>
                              <Chip label="Dataset" />
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <Typography mr={1} fontSize={13} fontWeight={600}>
                                by:
                              </Typography>
                              <Chip
                                component={Link}
                                to={"/"}
                                clickable
                                label="David Adetoyin"
                                avatar={<Avatar src="" />}
                              />
                            </Stack>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              spacing={1}
                            >
                              <Stack
                                bgcolor={"navbar.dark"}
                                width={8}
                                height={8}
                                borderRadius={20}
                              ></Stack>
                              <Typography fontSize={15}>1GB</Typography>
                            </Stack>
                          </Stack>
                          <Stack
                            direction={"row"}
                            alignItems={"baseline"}
                            spacing={1}
                            my={0.3}
                          >
                            <Typography fontSize={13}>
                              Uploaded 3 mins ago
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Box>
                    </Card>
                  </Box>
                );
              })}
              <Divider sx={{ my: 2 }} />
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Pagination count={100}></Pagination>
              </Box>
            </Grid>
            <Grid item md={4} lg={4} xl={4}>
              <Box>
                <Typography fontSize={18} fontWeight={600}>
                  Summary
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SearchMainPage;
