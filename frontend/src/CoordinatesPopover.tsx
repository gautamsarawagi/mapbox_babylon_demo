import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

function CoordinatesPopover({
  handleDrawer,
  setOpen,
  coordinates,
  setCordinates,
  setCam
}: {
  handleDrawer: any;
  setOpen: any;
  coordinates: any;
  setCordinates: any;
  setCam:any
}) {

  const [coordinatesClone, setCordinatesClone] = useState({
    latitude: "",
    longitude: "",
  });
  
  const handleInputs = (e: { target: { name: any; value: any } }) => {
    setCordinatesClone({ ...coordinatesClone, [e.target.name]: e.target.value });
  };

  const showOnMap = () => {
    setCordinates({ ...coordinates, latitude:coordinatesClone.latitude,longitude:coordinatesClone.longitude })
    setOpen(false);
    setCam(true)
  };

  return (
    <>
      <Box sx={{ background: "#202126", width: "500px", pb: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: "13px",
            px: 3,
            paddingTop: "19px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleDrawer}
        >
          <KeyboardBackspaceIcon />
          <Typography
            fontFamily={"Poppins"}
            fontStyle={"Regular"}
            fontSize={"24px"}
            lineHeight={"36px"}
            color={"#FFFFFF"}
          >
            Back
          </Typography>
        </Box>

        <Box
          sx={{
            background: "#34353A",
            width: "100%",
            height: "80px",
            display: "flex",
            alignItems: "center",
            px: 3,
            marginTop: "31px",
            paddingBottom: "80px",
          }}
        >
          <Typography
            fontFamily={"Poppins"}
            fontStyle={"SemiBold"}
            fontSize={"32px"}
            lineHeight={"48px"}
            color={"#FFFFFF"}
          >
            Fill the Form to get the Location
          </Typography>
        </Box>

        {/* theft */}
        <Box sx={{ marginTop: "27px", px: 3 }}>
          <Typography
            fontFamily={"Poppins"}
            fontStyle={"Medium"}
            fontSize={"24px"}
            lineHeight={"36px"}
            color={"#FFFFFF"}
            fontWeight={"500"}
          >
            Enter the longitude here
          </Typography>

          <TextField
            id="margin-none"
            fullWidth
            multiline
            inputProps={{ style: { color: "#FFFFFF" } }}
            name={"longitude"}
            value={coordinatesClone.longitude}
            onChange={handleInputs}
            sx={{
              background: "#34353A",
              border: "0.2px solid #34353A",
              borderRadius: "8px",
              marginTop: "8px",
            }}
            placeholder="Eg- 81.05089"
          />
        </Box>

        <Box sx={{ marginTop: "27px", px: 3 }}>
          <Typography
            fontFamily={"Poppins"}
            fontStyle={"Medium"}
            fontSize={"24px"}
            lineHeight={"36px"}
            color={"#FFFFFF"}
            fontWeight={"500"}
          >
            Enter the latitude here
          </Typography>

          <TextField
            id="margin-none"
            fullWidth
            multiline
            inputProps={{ style: { color: "#FFFFFF" } }}
            name={"latitude"}
            value={coordinatesClone.latitude}
            onChange={handleInputs}
            sx={{
              background: "#34353A",
              border: "0.2px solid #34353A",
              borderRadius: "8px",
              marginTop: "8px",
            }}
            placeholder="Eg- 23.9512"
          />
        </Box>

        <Box sx={{ px: 3 }}>
          <Button
            sx={{
              border: "1px solid #008DFF",
              borderRadius: "5px",
              background: "#008DFF",
              height: "48px",
              marginTop: "46px",
            }}
            fullWidth
            onClick={showOnMap}
          >
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontWeight={"600"}
              fontSize={"20px"}
              lineHeight={"24px"}
              color={"#FFFFFF"}
            >
              Display the Region
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CoordinatesPopover;
