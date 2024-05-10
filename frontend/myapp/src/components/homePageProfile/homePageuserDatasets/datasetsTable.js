import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Stack,
  TextField,
  ListItemButton,
  Button,
  Grid,
} from "@mui/material";

import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

import {
  Download,
  Edit,
  Link2,
  MoreVertical,
  Trash2,
  Search,
} from "react-feather";
import { Link as RouterLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { DatasetContext } from "../../../views/homepage/homePageMainProfileTab";
export default function DatasetsTable({ data }) {
  const [expandMore, setExpandMore] = useState(undefined);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedName, setSelectedName] = useState([]);
  console.log(expandMore);
  const openMenu = Boolean(expandMore);
  const handleCheckBoxChanges = (e, i) => {
    console.log("checkers", i);
  };
  const { user_datasets } = useContext(DatasetContext);
  console.log(user_datasets, "My page");
  const handleSearchChange = (e) => {};
  let boxesRef = useRef([]);

  const parseValue = (e, i) => {
    if (i) {
      setSelectedName((prev) => [...prev, e.target.name]);
    } else {
      setSelectedName((prev) => prev.filter((d) => d !== e.target.name));
    }
  };
  let ds = openMenu ?  user_datasets.data.find(d=>`menuProfileTablebtn-${d.id}` === expandMore.getAttribute("id")) : null
  
  return (
    <div>
      <Box my={3}>
        <Stack direction={"row"} spacing={2}>
          <TextField
            sx={{ flexBasis: "20%" }}
            fullWidth
            size="small"
            select
            label="3 items selected"
          >
            <MenuItem>Delete selected items</MenuItem>
          </TextField>
          <form style={{ flexBasis: "80%" }}>
            <TextField
              type="search"
              placeholder="Search your datasets"
              size="small"
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <Search
                    style={{ marginRight: 13 }}
                    opacity={0.7}
                    width={20}
                    height={20}
                  />
                ),
                endAdornment: (
                  <div>
                    <Button
                      size="small"
                      color="secondary"
                      sx={{
                        textTransform: "none",
                        borderRadius: 1000,
                        fontWeight: 600,
                      }}
                      startIcon={<FilterListRoundedIcon />}
                    >
                      Filters
                    </Button>
                  </div>
                ),
              }}
              fullWidth
            />
          </form>
        </Stack>
      </Box>
      <Table stickyHeader={true}>
        <TableHead sx={{ border: "1px solid red" }}>
          <TableRow>
            <TableCell style={{ top: "48px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    onChange={(e, i) =>
                      i
                        ? setSelectedName(boxesRef.current.map((d) => d.name))
                        : setSelectedName([])
                    }
                  />
                }
              />
            </TableCell>
            <TableCell style={{ top: "48px" }}>Updated</TableCell>
            <TableCell style={{ top: "48px" }}>Dataset name</TableCell>
            <TableCell style={{ top: "48px" }}>Date</TableCell>
            <TableCell style={{ top: "48px" }}>Size</TableCell>
            <TableCell style={{ top: "48px" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user_datasets.data.map((d, i) => (
            <TableRow key={"item " + d.id} hover underline="none">
              <TableCell>
                <FormControlLabel
                  value={d.id}
                  name={`item ${i}`}
                  checked={selectedName.includes(`item ${i}`)}
                  onChange={(e, i) => parseValue(e, i)}
                  control={
                    <Checkbox
                      key={i}
                      color="secondary"
                      inputProps={{
                        className: "checkBoxes",
                        ref: (el) => (boxesRef.current[i] = el),
                      }}
                      // onChange={(e, i)=> i ? e.currentTarget.checked = false : e.currentTarget.checked=true}
                      size="small"
                    />
                  }
                ></FormControlLabel>
              </TableCell>
              <TableCell>{d.updated}</TableCell>
              <TableCell>{d.title}</TableCell>
              <TableCell>{d.created}</TableCell>
              <TableCell>{d.converted_size}</TableCell>
              <TableCell>
                <IconButton
                  aria-controls={openMenu ? "basicProfile-menu" : undefined}
                  aria-haspopup="true"
                  id={"menuProfileTable" + `btn-${d.id}`}
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={(e) => setExpandMore(e.currentTarget)}
                >
                  <MoreVertical width={20} height={20} />
                </IconButton>
                {openMenu &&                     <Menu
                      id="basicProfile-menu"
                      open={openMenu}
                      anchorEl={expandMore}
                      onClose={() => setExpandMore(null)}
                      PaperProps={{ style: { boxShadow: "none" } }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <MenuList>
                        <ListItemButton
                          // component={RouterLink}
                          href={"/datasets/" + ds?.slug}
                        >
                          <ListItemIcon>
                            <Link2 width={19} height={19} />
                          </ListItemIcon>
                          <ListItemText sx={{ fontSize: 13 }}>
                            Go to link
                          </ListItemText>
                        </ListItemButton>
                        <ListItemButton
                          download={ds.file}
                          component={Link}
                          target="_blank"
                          href={ds?.file}
                        >
                          <ListItemIcon>
                            <Download width={19} height={19} />
                          </ListItemIcon>
                          <ListItemText sx={{ fontSize: 13 }}>
                            Download dataset
                          </ListItemText>
                        </ListItemButton>
                        <ListItemButton component={Link} href="/datasets">
                          <ListItemIcon>
                            <Edit width={19} height={19} />
                          </ListItemIcon>
                          <ListItemText sx={{ fontSize: 13 }}>
                            Edit
                          </ListItemText>
                        </ListItemButton>
                        <ListItemButton component={Link} href="/datasets">
                          <ListItemIcon>
                            <Trash2 width={19} height={19} />
                          </ListItemIcon>
                          <ListItemText sx={{ fontSize: 13 }}>
                            Delete
                          </ListItemText>
                        </ListItemButton>
                      </MenuList>
                    </Menu>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
