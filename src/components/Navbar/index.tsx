import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IconButton, Drawer, Box, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomButton";
import { route } from "../../router";
import Colors from "../../constant/colors";
import { useTheme } from "@mui/material/styles";
import { NavBarContainer } from "./style";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const routes = route[0].children;

  const handleLogout = () => {
    localStorage.clear();
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderLinks = () =>
    routes?.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <NavLink
          key={item.path}
          to={item.path ?? "/"}
          style={{ textDecoration: "none" }}
          onClick={() => setOpen(false)}
        >
          <CustomButton
            color={isActive ? "primary" : "inherit"}
            sx={
              isActive
                ? {
                    fontWeight: "bold",
                    textDecoration: "underline",
                    color: Colors.orange.default,
                  }
                : { color: Colors.orange.default }
            }
          >
            {item.handle.label}
          </CustomButton>
        </NavLink>
      );
    });

  return (
    <NavBarContainer>
      {isMobile ? (
        <>
          <IconButton
            onClick={toggleDrawer}
            sx={{ color: Colors.orange.default }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={open} onClose={toggleDrawer}>
            <Box
              sx={{
                width: 250,
                display: "flex",
                flexDirection: "column",
                padding: 2,
                gap: 1,
              }}
            >
              <IconButton onClick={toggleDrawer} sx={{ alignSelf: "flex-end" }}>
                <CloseIcon />
              </IconButton>
              {renderLinks()}
              <NavLink
                to="/login"
                onClick={handleLogout}
                style={{ textDecoration: "none" }}
              >
                <CustomButton variant="text">Logout</CustomButton>
              </NavLink>
            </Box>
          </Drawer>
        </>
      ) : (
        <>
          {renderLinks()}
          <NavLink
            to="/login"
            onClick={handleLogout}
            style={{ textDecoration: "none" }}
          >
            <CustomButton variant="text">Logout</CustomButton>
          </NavLink>
        </>
      )}
    </NavBarContainer>
  );
};

export default Navbar;
