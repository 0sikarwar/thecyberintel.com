import history from "../history";
import ContactUsForm from "./ContactUsForm";

export default function SubPageTheme(props) {
  const handleSectionBtnClick = (url) => {
    const urlText = url.replace("#", "");
    const bookMarkedElement = document.getElementById(urlText);
    if (bookMarkedElement) {
      bookMarkedElement.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      history.push("/" + urlText);
      console.log(history);
    }
  };
  return (
    <>
      <div className="cover">
        <div className="cover-text flex flex-middle">
          <div className="cover-text-main">
            <p className="cover-heading">{props.cover.title}</p>
            <p className="fs-24 wt-70vw m-auto cover-sub-text1">{props.cover.text}</p>
          </div>
        </div>
        <div className="cover-image" style={{ backgroundImage: `url(${props.cover.imagePath})` }}></div>
      </div>
      {props.mainData.map((obj, index) => {
        const isOdd = index % 2;
        return (
          <div
            className={`flex w-100p flex-wrap horizontal-section ${isOdd ? "gradient-row" : "bg-white"}`}
            key="index"
          >
            <div className={`col-md-8 px-32 ${isOdd ? "c-white" : ""}`}>
              <h2 className="fw-bolder fs-40 pb-20">{obj.title}</h2>
              <div className="pb-32 fs-18">
                <p>
                  <span className="lh-36">{obj.desc}</span>
                </p>
              </div>
              {!isOdd && obj.buttonText && (
                <span
                  onClick={() => handleSectionBtnClick(obj.buttonUrl)}
                  className="br-100 gradient-row fw-bolder px-36 py-12 c-white c-pointer"
                >
                  {obj.buttonText}
                </span>
              )}
            </div>
            <div className="col-md-4 px-32">
              <img src={obj.imagePath} className="wt-100p" />
            </div>
          </div>
        );
      })}
      <div className="flex flex-center w-100p gradient-row" id="contact-block">
        <div className="col-lg-6">
          <ContactUsForm />
        </div>
      </div>
    </>
  );
}
