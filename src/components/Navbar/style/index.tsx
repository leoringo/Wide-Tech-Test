import { Box, styled } from "@mui/material";
import Colors from "../../../constant/colors";

export const NavBarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  border: `1px solid ${Colors.orange.light}`,
  borderRadius: "20px",
  background: Colors.white,
  padding: "1rem",
  [theme.breakpoints.down("md")]: {
    justifyContent: "flex-start",
  },
}));
