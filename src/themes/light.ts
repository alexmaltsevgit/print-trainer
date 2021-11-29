import { createTheme, responsiveFontSizes } from "@mui/material";

let lightTheme = createTheme();

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
