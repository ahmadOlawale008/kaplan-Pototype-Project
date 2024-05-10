import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Search, TrendingUp } from "react-feather";

const SearchComponent = ({ on, setDisplayState }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Dialog
      TransitionProps={{ style: { backdropFilter: "blur(6px)" } }}
      PaperProps={{ style: { borderRadius: 18 } }}
      fullWidth
      open={on}
      onClose={() => setDisplayState(false)}
    >
      <Box>
        <DialogContent sx={{ p: 0 }}>
          <Box>
            <form>
              <TextField
                name="query"
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                InputProps={{
                  startAdornment: searchValue ? (
                    <CircularProgress
                      sx={{ width: "20px!important", height: "20px!important" }}
                    />
                  ) : (
                    <Search
                      style={{ marginRight: 13 }}
                      color="#ef6c00"
                      fontSize={"1em"}
                    />
                  ),
                  disableUnderline: true,
                }}
                type="search"
                placeholder="Search datasets, models, topics..."
                fullWidth
                variant="standard"
                size="large"
                sx={{ border: "none", p: 1.9 }}
              ></TextField>
            </form>
          </Box>
          {!searchValue ? (
            <Box>
              <Box></Box>
              <Divider sx={{ bgcolor: "#F4F9F9" }} orientation="horizontal" />
              <Stack spacing={2} my={3} mx={2}>
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Trending searches
                  </Typography>
                  <List>
                    <ListItemButton href="/datasets/search?query=Trend1">
                      <ListItemIcon>
                        <TrendingUp
                          width={"1em"}
                          height={"1em"}
                          fontSize={"1.225em"}
                        />
                      </ListItemIcon>
                      <ListItemText>Trend 1</ListItemText>
                    </ListItemButton>
                    <ListItemButton href="/datasets/search?query=Trend1">
                      <ListItemIcon>
                        <TrendingUp
                          width={"1em"}
                          height={"1em"}
                          fontSize={"1.225em"}
                        />
                      </ListItemIcon>
                      <ListItemText>Trend 1</ListItemText>
                    </ListItemButton>
                    <ListItemButton href="/datasets/search?query=Trend1">
                      <ListItemIcon>
                        <TrendingUp
                          width={"1em"}
                          height={"1em"}
                          fontSize={"1.225em"}
                        />
                      </ListItemIcon>
                      <ListItemText>Trend 1</ListItemText>
                    </ListItemButton>
                  </List>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Popular tags
                  </Typography>
                  <Box my={2} mx={1} gap={3}>
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Dataset 120"
                    />
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Analyze model 120"
                    />
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Startup 120"
                    />
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Startup 120"
                    />
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Startup 120"
                    />
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Startup 120"
                    />
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Startup 120"
                    />
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Startup 120"
                    />
                    <Chip
                      sx={{ m: 0.4, fontSize: 12, cursor: "pointer" }}
                      variant="body1"
                      component={Button}
                      label="Startup 120"
                    />
                  </Box>
                </Box>
                <Divider sx={{ bgcolor: "#F4F9F9" }} />
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    <Button
                      sx={{
                        color: "rgba(0, 0, 0, 0.87)",
                        fontWeight: 600,
                        textTransform: "none",
                      }}
                      disableFocusRipple
                      disableRipple
                      disableElevation
                      disableTouchRipple
                      component={Link}
                      href="/search"
                      endIcon={<CallMadeIcon />}
                    >
                      Explore all popular searches
                    </Button>
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ) : (
            <Box my={2} mx={1}>
              <Typography>Searching...</Typography>
              <Box>
                <Typography fontWeight={600}>Datasets</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
};
export default SearchComponent;
