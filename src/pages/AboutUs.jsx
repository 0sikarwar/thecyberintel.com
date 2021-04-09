import TimelineContainer from "../components/TimelineContainer";
import { timelineData } from "../utils/data";

export default function AboutUs() {
  const sortedTimeLine = timelineData.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  return (
    <>
      <div className="title">
        <h2>About us</h2>
      </div>
      <div className="timeline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="timeline-container">
                <div className="timeline-end">
                  <p>Now</p>
                </div>
                <div className="timeline-continue">
                  <TimelineContainer data={sortedTimeLine} />
                </div>
                <div className="timeline-start">
                  <p>Launch</p>
                </div>
                <div className="timeline-launch">
                  <div className="timeline-box">
                    <div className="timeline-text">
                      <h3>Launched our company on 01 Jan 2019</h3>
                      <p>Lorem ipsum dolor sit amet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
