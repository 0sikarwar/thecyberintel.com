const Bars = ({ onClick, className, isBarClicked }) =>
  !isBarClicked ? (
    <div className={`bars ${className || ""}`} onClick={onClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className={`cross ${className || ""}`} onClick={onClick}></div>
  );

export default Bars;
