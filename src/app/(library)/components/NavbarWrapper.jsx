"use client";
import Navbar from "./navbar";
import NavBottom from "./navbottom";
import Footer from "./footer";

export default function NavbarWrapper({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <NavBottom />
      <Footer />
    </>
  );
}