import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import SearchMainPage from "./components/navbar/mainSearchPage";
import HomePage from "./views/homepage/homepage";
import LoginPage from "./views/authentication/loginpage/login";
import RegisterPage from "./views/authentication/registrationpage/registerpage";
import HomePageProfile from "./views/homepage/homePageMainProfile";
import HomePageDatasets from "./views/homepage/homePageDatasets";
import HomePageSettings from "./views/homepage/homePageSettings";
import Example from "./views/examples/sampleA";
import UserProfile from "./components/homePageProfile/homePageUserProfile/userProfile";
import UserDataset from "./components/homePageProfile/homePageuserDatasets/userDataset";
import DatasetsComponent from "./components/datasetsComponent";
import NotFoundPage from "./views/notound/notFoundPage";
import DatasetPage from "./components/datasetPage";
import AnalyzeDataset from "./components/analyzeDataset";

const root = ReactDOM.createRoot(document.getElementById("root"));
const a = {"a": 2}
const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<HomePage />}>
        <Route element={<HomePageProfile />} path="profile">
          <Route index element={<UserProfile />} />
          <Route path="datasets" element={<UserDataset />} />
        </Route>
        <Route element={<HomePageDatasets />} path="datasets">
          <Route index element={<DatasetsComponent />} />
          <Route element={<DatasetPage />} path=":name">
            <Route path="analyze-dataset" element={<AnalyzeDataset />} />
          </Route>
        </Route>
        <Route element={<HomePageSettings />} path="settings" />
        <Route path="sample/:id/" element={<Example />} />
      </Route>
      <Route path="search" element={<SearchMainPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
root.render(<RouterProvider router={routers} />);
