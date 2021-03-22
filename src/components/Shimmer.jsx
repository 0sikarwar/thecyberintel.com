import React from "react";
const Shimmer = (props) => {
  return (
    <div className="shimmerContainer">
      <div className="shimmerWrapper flex flex-middle flex-column">
        <div className="headerShimmer shimmerAnimate din br-8"></div>
        <CardShimmer />
        <CardShimmer />
      </div>
    </div>
  );
};

const CardShimmer = () => {
  return (
    <>
      <div className="wt-80p">
        <div className="boxShimmer ht-30 wt-30p br-8 shimmerAnimate mt-40"></div>
      </div>
      <div className="boxShimmer ht-100 wt-80p br-8 shimmerAnimate mt-8"></div>
    </>
  );
};

export default Shimmer;
