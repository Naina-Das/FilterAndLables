import React, { useState, useEffect, useContext } from "react";
import { FilterContext } from "./FilterContext";

import { Select } from "antd";
import CommonSelect from "./CommonSelect";

const { Option } = Select;

const SelectDropdown = () => {
  const context = useContext(FilterContext);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetch(`https://damp-garden-93707.herokuapp.com/getlistofagents`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((response) => {
        setOptions(response.data && response.data.listofagents);
      })
      .catch((error) => console.log(error));
  }, []);

  const setSelectedUsers = (value) => {
    context.setSelectedUsers(value);
  };

  return (
    <CommonSelect
      optionData={options}
      setSelectedData={setSelectedUsers}
      selectedData={context.selectedUsers}
      placeholder= {'Select Agents'}
    ></CommonSelect>
  );
};

export default SelectDropdown;
