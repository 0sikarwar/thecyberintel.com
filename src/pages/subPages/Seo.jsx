import React from "react";
import SubPageTheme from "../../components/SubPageTheme";
import { seoData } from "../../utils/data";

export default function Seo(props) {
  return <SubPageTheme {...seoData} />;
}
