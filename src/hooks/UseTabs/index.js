import React, { useState } from "react";

const useTabs = (model, current = 0) => {
  const { component } = model[current];
  const [tabComponent, setTabComponent] = useState(component);
  let activeRef = current;

  const [tabs, setTabs] = useState(() => {
    return model.map(({ text }, index) => ({
      index,
      active: index === activeRef,
      onClick: e => {
        const target = parseInt(e.target.getAttribute("index"));
        setTabs(prev =>
          prev.map(props => ({
            ...props,
            active: props.index === target
          }))
        );
        setTabComponent(model[target].component);
      },
      text
    }));
  });

  return {
    tabs,
    tabComponent
  };
};

const model = [
  { text: "Tab 1", component: () => <div>Content 1</div> },
  { text: "Tab 2", component: () => <div>Content 2</div> }
];

const Example = () => {
  const { tabs, tabComponent } = useTabs(model);

  return (
    <div>
      {tabs.map(props => (
        <div {...props} key={props.index}>
          {props.text} {props.active && "*"}
        </div>
      ))}

      {tabComponent}
    </div>
  );
};

export default Example;
