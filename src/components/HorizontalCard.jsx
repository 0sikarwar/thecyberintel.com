import React from "react";
export default function HorizontalCard(props) {
  return (
    <div className="container py-3">
      <div className="card shadow">
        <div className={`row m-0 ${props.reverseDir ? "flex-row-reverse" : ""}`}>
          <div className="col-md-7 p-0">
            <div className="card-block flex flex-column flex-middle px-32 py-24 ht-100p flex-around">
              <h4 className="card-title">{props.title}</h4>
              <p className="card-text mb-28">{props.discription}</p>
              <div className="wt-100p">
                {props.readMoreLink && (
                  <a href={props.readMoreLink} className="mt-auto btn btn-primary  ">
                    Read More
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5 p-0">
            <img className="d-block wt-100p ht-310" src={props.imagePath} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
