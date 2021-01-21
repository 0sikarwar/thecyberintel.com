import image1 from "../assets/images/logo.jpeg";
import { getMsgJson } from "../utils";
function Home() {
  const { address, homeSummary, serviceProvided } = getMsgJson();
  return (
    <div className="">
      <div className="row">
        <div className="col">
          <p dangerouslySetInnerHTML={{ __html: homeSummary }} />
          <ul type="disk">
            {serviceProvided.map((text, index) => (
              <li key={index}> {text}</li>
            ))}
          </ul>
          <p>Visit us now!</p>
          <div>
            <p className="fs-18 fw-bolder c-tr">{address.name}</p>
            <p className="fs-14 fw-bold">{address.address} </p>
            <p className="fs-14 fw-bold">({address.landmark})</p>
            <p>
              <a href={`mailto:${address.email}`}>{address.email}</a> <br /> {address.mobile}
            </p>
          </div>
        </div>
        <div className="col">
          <img src={image1} className="home-image" alt="snapshot 1" />
          <img src={image1} className="home-image" alt="snapshot 2" />
        </div>
      </div>
    </div>
  );
}

export default Home;
