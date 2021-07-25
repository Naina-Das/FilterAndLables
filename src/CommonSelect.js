import React, { useState, useEffect, useContext } from "react";
import { FilterContext } from "./FilterContext";

import { Select } from "antd";

const { Option } = Select;

const CommonSelect = (props) => {
  console.log("hello Come ", props.selectedData);
  const context = useContext(FilterContext);
  const optionData = props.optionData || [];
  const onChange = (value) => {
    props.setSelectedData(value);
  };

  // useEffect(
  //   (value) => {
  //     console.log("hello", value);
  //     props.setSelectedData(value);
  //   },
  //   [context.selectedLabel || []]
  // );
  return (
    <Select
      mode={"multiple"}
      showSearch
      style={{ width: 600 }}
      placeholder= {props.placeholder}
      optionFilterProp="children"
      value={props.selectedData}
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {optionData.map((option, index) => {
        return (
          <Option value={option} key={index}>
            {option}
          </Option>
        );
      })}
    </Select>
  );
};

export default CommonSelect;
