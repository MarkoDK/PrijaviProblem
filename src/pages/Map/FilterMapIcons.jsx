import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import pinCarCrash from "../../pages/Map/PinIcons/CarCrash.png";
import pinTrafficJam from "../../pages/Map/PinIcons/TrafficJam.png";
import pinRoadWarning from "../../pages/Map/PinIcons/RoadWarning.png";
import pinMegaphoneAttention from "../../pages/Map/PinIcons/MegaphoneAttention.png";
import pinGoodParty from "../../pages/Map/PinIcons/GoodParty.png";
import pinAlertSiren from "../../pages/Map/PinIcons/RedSiren.png";

const iconMap = {
  "Car Wreck": pinCarCrash,
  "Traffic Jam": pinTrafficJam,
  Repair: pinRoadWarning,
  Megaphone: pinMegaphoneAttention,
  "Good party": pinGoodParty,
  Alert: pinAlertSiren,
};

const FilterDropdown = ({ allTypes, activeFilters, onApply }) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const toggleRef = useRef(null);

  const handleToggle = (type) => {
    setLocalFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    onApply(localFilters);
    setOpen(false);
  };

  const handleCancel = () => {
    setLocalFilters(activeFilters);
    setOpen(false);
  };

  const handleClickAway = (e) => {
    if (toggleRef.current && !toggleRef.current.contains(e.target)) {
      setOpen(false);
      setLocalFilters(activeFilters);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickAway);
    } else {
      document.removeEventListener("mousedown", handleClickAway);
    }
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [open]);

  return (
    <Box ref={toggleRef} sx={{ position: "relative", display: "inline-block" }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setOpen(!open)}
        sx={{ fontSize: "0.8rem", px: 1.5, py: 0.5 }}
      >
        Filtriraj Mapu
      </Button>

      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "100%",
            mt: 1,
            width: 240,
            zIndex: 10,
            p: 1.5,
            borderRadius: 2,
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2" sx={{ fontSize: "0.9rem" }}>
              Filteri
            </Typography>
            <IconButton onClick={handleCancel} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box>
            {allTypes.map((type) => (
              <Box
                key={type}
                display="flex"
                alignItems="center"
                // mb={0.75}
                sx={{ gap: 1 }}
              >
                <Checkbox
                  checked={localFilters.includes(type)}
                  onChange={() => handleToggle(type)}
                  size="small"
                />
                {iconMap[type] && (
                  <img src={iconMap[type]} alt={type} width={16} height={16} />
                )}
                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                  {type}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleCancel} color="secondary" size="small">
              Otkaži
            </Button>
            <Button onClick={handleApply} variant="contained" size="small">
              Sačuvaj
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FilterDropdown;
