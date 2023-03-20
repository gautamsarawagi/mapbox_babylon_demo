import React, { useState, MouseEvent, useEffect, useRef } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CoordinatesPopover from "./CoordinatesPopover";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationMap from "./LocationMap";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HomeIcon from "@mui/icons-material/Home";
import { ListItemButton, ListItemIcon } from "@mui/material";
import html2canvas from "html2canvas";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const drawerWidth = 550;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#34353A",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `90px`,
  background: "#34353A",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  // background:"#34353A",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// --------------------------------------------NavbarDrawer function starts here------------------------------------------------------------------------------

function NavbarDrawer() {
  const [open, setOpen] = useState(false);
  const [cam, setCam] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
    setCam(false);
  };

  // values

  const [coordinates, setCordinates] = useState({
    latitude: null,
    longitude: null,
  });

  // screenshot

  const mapContainer = useRef(null);

  const navigate = useNavigate();

  const handleScreenshot = async () => {
    try {
      const canvas = await html2canvas(document.body);
      const imgData = canvas.toDataURL("image/png");

      const blobData = await (await fetch(imgData)).blob();

      const formData = new FormData();
      formData.append("image", blobData, "screenshot.png");

      const response = await axios.post(
        "http://localhost:8000/api/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.image.filepath) {
        navigate("cuboid", {
          state: {
              image: response.data.image.filepath,
          },
      });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <List sx={{ marginTop: "15px" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              aria-label="open drawer"
              onClick={() => handleDrawer()}
              sx={{
                justifyContent: "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem>
            {!open ? (
              <Box sx={{ position: "relative", height: "90vh" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: "13px",
                    px: 3,
                    py: 2,
                    color: "white",
                    cursor: "pointer",
                    background: "#202126",
                    position: "absolute",
                    top: "40%",
                  }}
                >
                  {!cam ? (
                    <div onClick={handleDrawer}>
                      <ArrowForwardIcon />
                    </div>
                  ) : (
                    <div onClick={handleScreenshot}>
                      <CameraAltIcon />
                    </div>
                  )}
                </Box>
              </Box>
            ) : (
              <CoordinatesPopover
                handleDrawer={handleDrawer}
                setOpen={setOpen}
                coordinates={coordinates}
                setCordinates={setCordinates}
                setCam={setCam}
              />
            )}
          </ListItem>
        </List>
      </Drawer>

      <Box>
        <LocationMap lat={coordinates.latitude} lng={coordinates.longitude} mapContainer={mapContainer}/>
      </Box>
    </>
  );
}

export default NavbarDrawer;
