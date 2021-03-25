export default function SummaryCard(props) {
  return (
    <div className="box fadeIn animated flex flex-column flex-middle" data-animate="fadeIn" data-delay="200">
      <h3>{props.title}</h3>
      <p className="t-justify">{props.desc}</p>
    </div>
  );
}
