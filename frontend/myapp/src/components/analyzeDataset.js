import {
  Dialog,
  Typography,
  Box,
  DialogContent,
  Card,
  CardContent,
  Stack,
  IconButton,
  Tab,
} from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { TabContext, TabList } from "@mui/lab";

const AnalyzeDataset = () => {
  const data = useOutletContext();
  return (
    <>
      <Dialog open fullScreen>
        <DialogContent>
          <Stack>
            <Box ml={"auto"}>
              <IconButton
                LinkComponent={Link}
                to=".."
                color="secondary"
                size="large"
              >
                <CloseRoundedIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Stack>
          <Stack>
            <TabContext>
            <TabList>
                    <Tab label="Report"/>
                    <Tab label="Report"/>
                    <Tab label="Report"/>

                </TabList>
            </TabContext>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AnalyzeDataset;
