import React from "react";
const Shimmer = (props) => {
  return (
    <div class="shimmerContainer">
      <div class="shimmerWrapper flex flex-middle flex-column">
        <div class="headerShimmer shimmerAnimate din br-8"></div>
        <CardShimmer />
        <CardShimmer />
      </div>
    </div>
  );
};

const CardShimmer = () => {
  return (
    <>
      <div class="wt-80p">
        <div class="boxShimmer ht-30 wt-30p br-8 shimmerAnimate mt-40"></div>
      </div>
      <div class="boxShimmer ht-100 wt-80p br-8 shimmerAnimate mt-8"></div>
    </>
  );
};

export default Shimmer;
