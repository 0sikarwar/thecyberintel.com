export default function SummaryCard(props) {
  return (
    <div class="box fadeIn animated" data-animate="fadeIn" data-delay="200">
      <h3>
        <i class="fa fa-edit"></i> {props.title}
      </h3>
      <p>{props.desc}</p>
    </div>
  );
}
