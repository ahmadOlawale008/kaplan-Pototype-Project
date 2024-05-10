import React, { createContext, useState } from "react";
import { Box, Divider, Tab, useTheme } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import UserDataset from "../../components/homePageProfile/homePageuserDatasets/userDataset";
import UserProfile from "../../components/homePageProfile/homePageUserProfile/userProfile";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { GetFiles } from "../../hooks/get_all_files";
export const DatasetContext = createContext(null);

export default function HomePageMainProfileTab() {
  const location = useLocation();
  const locationName = location.pathname;
  let userDatasets = GetFiles()
  const [tab, setTab] = useState("1");
  const theme = useTheme();
  const changetab = (e, i) => {
    setTab(i);
  };

  return (
    <div
      style={{ marginBottom: 70, marginTop: 20, position: "sticky", top: 0 }}
    >
      <TabContext
        value={
          locationName == "/profile"
            ? "1"
            : location.pathname == "/profile/notifications"
            ? "2"
            : location.pathname == "/profile/datasets"
            ? "3"
            : location.pathname == "profile/others"
            ? "4"
            : "1"
        }
      >
        <Box
          sx={{
            position: "sticky",
            background: "#F9F9F9",
            top: "0px",
            zIndex: 3,
          }}
          width={"100%"}
        >
          <TabList onChange={(e, i) => changetab(e, i)} textColor={"secondary"}>
            <Tab
              sx={{ textTransform: "none" }}
              label="Your profile"
              LinkComponent={Link}
              to="/profile"
              value={"1"}
            />
            <Tab
              LinkComponent={Link}
              to="/profile/notifications"
              sx={{ textTransform: "none" }}
              label="Notifications"
              value={"2"}
            />
            <Tab
              LinkComponent={Link}
              to="/profile/datasets"
              sx={{ textTransform: "none" }}
              label="Datasets"
              value={"3"}
            />
            <Tab
              LinkComponent={Link}
              to="/profile/others"
              sx={{ textTransform: "none" }}
              label="Others"
              value={"4"}
            />
          </TabList>
          <Divider />
        </Box>
        <TabPanel
          value={
            locationName == "/profile"
              ? "1"
              : location.pathname == "/profile/notifications"
              ? "2"
              : location.pathname == "/profile/datasets"
              ? "3"
              : location.pathname == "profile/others"
              ? "4"
              : "1"
          }
        >
          <DatasetContext.Provider value={{"user_datasets": userDatasets}}>
            <Outlet  />
          </DatasetContext.Provider>
        </TabPanel>
      </TabContext>
    </div>
  );
}
