import React from "react";

export default function TimelineContainer({ data }) {
  return data.map((obj, index) => {
    const isRight = !!(index % 2);
    const currentYear = new Date(obj.date).getFullYear();
    const prevYear = data[index + 1] ? new Date(data[index + 1].date).getFullYear() : currentYear;
    return (
      <React.Fragment key={index}>
        <div className={`row ${isRight ? "timeline-right" : "timeline-left"}`}>
          <div className={`col-md-6 ${isRight ? "" : "d-md-none d-block"}`}>
            <p className="timeline-date">{obj.date}</p>
          </div>
          <div className="col-md-6">
            <div className="timeline-box">
              <div className={`timeline-icon ${isRight ? "" : "d-md-none d-block"}`}>
                <i className="fa fa-gift"></i>
              </div>
              <div className="timeline-text">
                <h3>{obj.heading}</h3>
                <p>{obj.desc}</p>
              </div>
              {!isRight && (
                <div className="timeline-icon d-md-block d-none">
                  <i className="fa fa-business-time"></i>
                </div>
              )}
            </div>
          </div>
          {!isRight && (
            <div className="col-md-6 d-md-block d-none">
              <p className="timeline-date">{obj.date}</p>
            </div>
          )}
        </div>
        {currentYear !== prevYear && (
          <div className="row">
            <div className="col-12">
              <div className="timeline-year">
                <p>{currentYear}</p>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  });
}
