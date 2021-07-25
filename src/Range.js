import React, { useState, useEffect, useContext } from "react";
import { Slider } from "antd";
import { FilterContext } from "./FilterContext";

const Range = () => {
  const context = useContext(FilterContext);
  const [range, setRange] = useState({ minimum: 0, maximum: 0 });
  useEffect(() => {
    fetch(`https://damp-garden-93707.herokuapp.com/getdurationrange`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((response) => {
        setRange(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const onChange = (value) => {
    context.setSelectedRange(value);
  };

  const onAfterChange = (value) => {};
  const marks = {
    0: range.minimum,
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>{range.maximum.toFixed(2)}</strong>,
    },
  };
  return (
    <>
      <Slider
        style={{ width: 600 }}
        marks={marks}
        onChange={onChange}
        range={true}
        onAfterChange={onAfterChange}
      />
    </>
  );
};

export default Range;
