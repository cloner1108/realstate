"use client";

import React from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import rtlCache from "src/theme/rtlCache";
import theme from "src/theme/theme";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <div>{children}</div>
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Layout;
