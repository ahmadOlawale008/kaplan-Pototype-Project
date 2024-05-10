import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Dialog,
  Tab,
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  Stack,
  colors,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { Check, Link, Send, UploadCloud } from "react-feather";
import dataUploadIcon from "../../styles/icons/file (1).png";
import axiosInstance from "../../hooks/axiosInstance";
import { DatasetContext } from "../../views/homepage/homePageMainProfileTab";
export const get_sizes = (bytes) => {
  if (bytes == 0) return "0 bytes";
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return (
    " " + Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  );
};
export default function UploadFile({ display, setDisplay }) {
  // In the real app i would be using reducers instead os states
  // States
  const [activeTab, setActiveTab] = useState("1");
  const [fileEntering, setFileEntering] = useState(false);
  const [fileHasEntered, setFilehasEntered] = useState(false);
  const [fileDetails, setFileDetails] = useState({});
  const [formDetails, setFormDetails] = useState({ file: "", title: "" });
  const [fileErrorState, setFileErrorState] = useState(false);
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [fileSuccessfull, setFileSentSuccesfully] = useState(false);
  const [sendingFileStateLoading, setSendingFileStateLoading] = useState(false);
  const [errors, setErrors] = useState({ title: [], file: [] });
  const formRef = useRef(null);
  const upload_btn_ref = useRef(null);
  const submitBtn = useRef(null);
  const input_submit_ref = useRef(null);
  const form_data = new FormData();

  const {user_datasets} = useContext(DatasetContext);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileEntering(true);
  };
  console.log(errors,user_datasets, "i am errors");

  const handleCancel = (e) => {
    setFileErrorMessage(null);
    setFileErrorState(false);
    setFilehasEntered(false);
    setFileDetails({});
    setFormDetails({ file: "", title: "" });
    upload_btn_ref.current.files = null;
    upload_btn_ref.current.value = "";
    console.log(upload_btn_ref.current);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileEntering(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileEntering(false);

    const { files } = e.dataTransfer;
    if (files.length !== 1) {
      setFileErrorMessage(
        "Please hold off till an updated version is available Since this website is only a prototype, it cannot access the scanning of numerous datasets."
      );
      setFileErrorState(true);
    } else {
      const { ...file } = files;
      if (file[0].name.toLowerCase().endsWith(".csv")) {
        setFileErrorMessage(null);
        setFileErrorState(false);
        setFilehasEntered(true);
        setFileDetails(files);
        setFormDetails({ ...formDetails, file: files });
        upload_btn_ref.current.files = files;
      } else {
        setFileErrorState(true);
        setFileErrorMessage(
          "Please hold off till an updated version is available Since this website is only a prototype, only csv files can be analyzed for now."
        );
      }
    }
  };
  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFileEntering(false);
  };

  const clickSubmit = (e) => {
    input_submit_ref.current.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    form_data.append("file", formDetails.file[0]);
    form_data.append("title", formDetails.title);
    axiosInstance
      .post("file", form_data)
      .then((res) => {
        setSendingFileStateLoading(true);
        if (res.status >= 200 && res.status < 400) {
          setFileSentSuccesfully(true);
          setErrors({ file: [], title: [] });
          user_datasets.setData((prev) => [{ ...res.data }, ...prev]);
          console.log("i am user_d", user_datasets);
        } else {
          console.log(res, "i am res");
        }
      })
      .catch((e) => {
        setErrors({ ...errors, ...e.response.data.message });
        console.log(e, "i am e");
      })
      .then(() => setSendingFileStateLoading(false));
  };
  return (
    <>
      <Dialog
        open={display}
        onClose={() => setDisplay(false)}
        sx={{ backdropFilter: "blur(2px)" }}
        PaperProps={{
          sx: { borderRadius: 3 },
          elevation: 9,
        }}
        fullWidth
      >
        <TabContext value={activeTab}>
          <TabList textColor="secondary">
            <Tab
              onClick={() => setActiveTab("1")}
              sx={{ textTransform: "none" }}
              value={"1"}
              label="Upload file"
            ></Tab>
            <Tab
              onClick={() => setActiveTab("2")}
              sx={{ textTransform: "none" }}
              value={"2"}
              label="Link"
            ></Tab>
          </TabList>
          <Divider />
          <TabPanel value="1">
            {fileSuccessfull ? (
              <Box className="homepageNav-left" height={"70vh"}>
                <Box
                  className={`background-upload ${
                    fileEntering && "active-fileEntered"
                  } ${fileErrorState && "background_error_upload"}`}
                  borderRadius={9}
                  width={"100%"}
                  height={fileHasEntered ? "100%" : "100%"}
                  overflow={"auto"}
                  display={"flex"}
                  m={"auto"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDrop={handleDrop}
                  onDragLeave={handleLeave}
                  sx={
                    (fileHasEntered && { scale: "0.96" }) || {
                      transition: "all .4s ease",
                    }
                  }
                >
                  <Stack gap={2}>
                    <Typography
                      variant="h5"
                      color={colors.green[400]}
                      fontWeight={600}
                    >
                      File sent succesfully
                    </Typography>
                    <Check
                      strokeWidth={3}
                      width={50}
                      color={colors.green[700]}
                      style={{ margin: "auto" }}
                      height={50}
                    />
                  </Stack>
                </Box>
              </Box>
            ) : (
              <Box className="homepageNav-left" height={"70vh"}>
                <Box
                  className={`background-upload ${
                    fileEntering && "active-fileEntered"
                  } ${fileErrorState && "background_error_upload"}`}
                  borderRadius={9}
                  width={"100%"}
                  height={fileHasEntered ? "100%" : "100%"}
                  overflow={"auto"}
                  display={"flex"}
                  m={"auto"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDrop={handleDrop}
                  onDragLeave={handleLeave}
                  sx={
                    (fileHasEntered && { scale: "0.96" }) || {
                      transition: "all .4s ease",
                    }
                  }
                >
                  <Stack
                    component={"form"}
                    method="post"
                    ref={formRef}
                    alignContent={"center"}
                    justifyContent={"center"}
                    spacing={2}
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <img
                      src={dataUploadIcon}
                      width={50}
                      height={50}
                      style={{
                        margin: "12px auto",
                        display: "flex",
                        alignItems: "center",
                        opacity: 0.9,
                      }}
                    />

                    <Typography variant="h6" fontWeight={500}>
                      Drag and Upload files here
                    </Typography>
                    <Divider sx={{ my: 3 }}>
                      <Typography>or</Typography>
                    </Divider>
                    <input
                      className="fileUploader"
                      name="uploader"
                      ref={upload_btn_ref}
                      id="uploader"
                      type="file"
                      hidden
                      sx={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target.files.length !== 1) {
                          setFileErrorMessage(
                            "Please hold off till an updated version is available Since this website is only a prototype, it cannot access the scanning of numerous datasets."
                          );
                          setFileErrorState(true);
                        } else {
                          const file = e.target.files[0];
                          if (file.name.toLowerCase().endsWith(".csv")) {
                            setFileErrorMessage(null);
                            setFileErrorState(false);
                            setFilehasEntered(true);
                            setFileDetails(e.target.files);
                            setFormDetails({
                              ...formDetails,
                              file: e.target.files,
                            });
                          } else {
                            setFileErrorState(true);
                            setFileErrorMessage(
                              "Please hold off till an updated version is available Since this website is only a prototype, only csv files can be analyzed for now."
                            );
                          }
                        }
                      }}
                      label="Upload file"
                      accept=".csv"
                    />
                    <Button
                      onClick={(e) => {
                        const fileInput =
                          document.querySelector(".fileUploader");
                        fileInput.click();
                      }}
                      size="small"
                      sx={{ textTransform: "none" }}
                      fullWidth
                      variant="contained"
                      startIcon={<UploadCloud />}
                    >
                      Upload file
                    </Button>
                    <input
                      hidden
                      sx={{ display: "none" }}
                      ref={input_submit_ref}
                      type="submit"
                      value={formDetails.title}
                      placeholder="Submit"
                    />
                  </Stack>
                </Box>
                {fileHasEntered && (
                  <Stack mx={2} py={2} spacing={2}>
                    <Typography fontSize={16} fontWeight={600}>
                      Dataset title
                    </Typography>
                    <TextField
                      size="large"
                      fullWidth
                      variant="standard"
                      type="text"
                      placeholder="Type your title"
                      value={formDetails.title}
                      error={errors?.title[0]}
                      helperText={errors?.title[0]}
                      onChange={(e) =>
                        setFormDetails({
                          ...formDetails,
                          title: e.target.value,
                        })
                      }
                    ></TextField>
                  </Stack>
                )}
                {fileErrorState && (
                  <Typography
                    pb={4}
                    pt={2}
                    mx={1}
                    fontWeight={600}
                    color={colors.red[500]}
                  >
                    {fileErrorMessage}
                  </Typography>
                )}
                {fileHasEntered && (
                  <Box>
                    <Stack my={2} px={2}>
                      <Typography fontWeight={600} mb={1} fontSize={17}>
                        File details:
                      </Typography>
                      <Typography fontWeight={400} fontSize={15}>
                        name:
                        <span style={{ fontSize: 14 }}>
                          {" " + fileDetails[0]?.name}
                        </span>
                      </Typography>
                      <Typography fontWeight={400} fontSize={15}>
                        size:
                        <span style={{ fontSize: 14 }}>
                          {fileDetails.converted_size}
                        </span>
                      </Typography>
                      <Typography fontWeight={400} fontSize={15}>
                        type:
                        <span style={{ fontSize: 14 }}>
                          {" " + fileDetails[0]?.type}
                        </span>
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 1 }} />
                    <Stack
                      py={2}
                      direction={"row"}
                      spacing={3}
                      justifyContent={"right"}
                    >
                      <Button
                        className="btn-transform-none"
                        sx={{ borderRadius: 25 }}
                        color="secondary"
                        onClick={() => input_submit_ref.current.click()}
                        variant="contained"
                        disabled={!formDetails?.title.trim()}
                      >
                        Add to your datasets
                      </Button>
                      <Button
                        onClick={handleCancel}
                        className="btn-transform-none"
                        sx={{ borderRadius: 25 }}
                        color="secondary"
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Box>
            )}
          </TabPanel>
          <TabPanel value="2">
            <Box width={"100%"} height={"70vh"}>
              <TextField
                defaultValue={"http://"}
                label="Upload url"
                name="url"
                autoComplete="off"
                fullWidth
                type="url"
              ></TextField>
              <Button
                sx={{ textTransform: "none", mt: 2 }}
                color="primary"
                variant="contained"
                endIcon={<Link width={15} />}
              >
                Scan dataset
              </Button>
            </Box>
          </TabPanel>
        </TabContext>
      </Dialog>
    </>
  );
}
