import HorizontalCard from "../components/HorizontalCard";
import { cardData } from "../utils/data";
import coverPic from "../assets/cyberintelCover.jpg";
import { useEffect } from "react";
export default function Home(props) {
  useEffect(() => {
    // props.setAddMargin(false);
  }, []);
  return (
    <>
      <div className="cover mb-28">
        <div className="cover-text flex flex-middle">
          <div className="cover-text-main">
            <p className="fs-24 cover-sub-text1">The world is a different place today and you need to adapt</p>
            <p className="cover-heading">Build your brand with The Cyberintel</p>
            <p className="fs-18 wt-70vw m-auto cover-sub-text2">
              We’re a team of young & professional, expertise in Web Development and Technical Support. We help
              businesses fully grasp the fast-developing Digital Age through creative innovation, intelligent design and
              project delivery.
            </p>
          </div>
        </div>
        <div className="cover-image" style={{ backgroundImage: `url(${coverPic})` }}></div>
      </div>
      {cardData.map((data, index) => (
        <HorizontalCard key={index} reverseDir={index % 2} {...data} />
      ))}
    </>
  );
}
