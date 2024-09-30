import { globalStyle, style } from "@vanilla-extract/css";

const bottomBtn = style({
  position: "fixed",
  zIndex: 2,
  width: "100%",
  padding: "12px",
  bottom: 0,
});

const container = style({
  display: "flex",
  padding: "1rem",
  flexDirection: "column",
  gap: "1rem",
});

const radioTextContainer = style({});

globalStyle(`${radioTextContainer} > p:nth-of-type(1)`, {
  fontWeight: "500",
});

export const appSt = {
  bottomBtn,
  container,
  radioTextContainer,
};
