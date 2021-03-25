import { useEffect, useRef, useState } from "react";

export default function Panel(props) {
  const [height, setHeight] = useState(0);
  const elementRef = useRef();

  useEffect(() => {
    window.setTimeout(() => {
      const el = elementRef.current;
      if (el) {
        const height = el.querySelector(".panel__inner").scrollHeight;
        setHeight(height);
      }
    }, 333);
  }, []);

  const { label, content, activeTab, index, activateTab } = props;
  const isActive = activeTab === index;
  const innerStyle = {
    height: `${isActive ? height : 0}px`,
  };

  return (
    <div className="panel" aria-expanded={isActive} ref={elementRef}>
      <button className="panel__label" onClick={activateTab}>
        {label}
      </button>
      <div className="panel__inner" style={innerStyle} aria-hidden={!isActive}>
        <p className="panel__content">{content}</p>
      </div>
    </div>
  );
}
