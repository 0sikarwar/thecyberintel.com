import React, { useState } from "react";
import Panel from "./AccordianPanel";

export default function Accordion(props) {
  const [activeTab, setActiveTab] = useState(0);

  const activateTab = (index) => {
    setActiveTab(activeTab === index ? -1 : index);
  };

  return (
    <div className="accordion">
      {props.panelData.map((panel, index) => (
        <Panel key={index} activeTab={activeTab} index={index} {...panel} activateTab={() => activateTab(index)} />
      ))}
    </div>
  );
}
