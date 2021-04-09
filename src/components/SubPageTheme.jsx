import history from "../utils/history";
import Accordion from "./Accordian";
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
          <div className={`w-100p horizontal-section ${isOdd ? "gradient-row" : "bg-white"}`} key={index}>
            <div className="flex w-100p flex-wrap container">
              <div className={`col-md-8 px-32 main-data ${isOdd ? "c-white" : ""}`}>
                <h2 className="fw-bolder fs-40 pb-20">{obj.title}</h2>
                <div className="pb-32 fs-18">
                  <div className="lh-36 t-justify main-text" dangerouslySetInnerHTML={{ __html: obj.desc }} />
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
              <div className="col-md-4 px-32 flex flex-center pt-8">
                <img src={obj.imagePath} className="max-wt-100p obj-contain" alt="Heading" />
              </div>
            </div>
            {obj.subData && (
              <div className="sub-data wt-100p flex flex-column flex-middle">
                <p className="sub-text-1 mb-0 fs-18 fw-bolder t-center t-justify c-white">{obj.subData.text1}</p>
                <div className="sub-image-container flex flex-wrap wt-100p flex-middle flex-center">
                  {obj.subData.images?.map((img, index) => (
                    <img src={img} className="obj-contain wt-120 mx-3 my-2" alt="LOGO" key={index} />
                  ))}
                </div>
                <p className="sub-text-2 mb-0 fs-18 fw-bold c-white mt-4 t-justify">{obj.subData.text2}</p>
              </div>
            )}
          </div>
        );
      })}
      {props.faqs && (
        <div className="flex w-100p horizontal-section flex-wrap bg-white">
          <h2 className="fw-bolder fs-40 pb-20">{props.faqs.title}</h2>
          <Accordion panelData={props.faqs.list} />
        </div>
      )}
      <div className="flex flex-center w-100p gradient-row" id="contact-block">
        <div className="col-lg-6">
          <ContactUsForm
            heading="Let's Work Together"
            className="flex flex-column flex-middle"
            headingClassName="c-white mt-2 fw-bolder"
            buttonText="Get in Touch"
            extraFields={props.contactUsExtraFields}
          />
        </div>
      </div>
    </>
  );
}
