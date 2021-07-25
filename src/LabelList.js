import React, { useState, useEffect, useContext } from "react";
import { FilterContext } from "./FilterContext";

import CommonSelect from "./CommonSelect";

const LabelList = () => {
  const context = useContext(FilterContext);
  const [isMounted, setMounted] = useState(false);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetch(`https://damp-garden-93707.herokuapp.com/getlistoflabels`, {
      method: "GET",
      headers: { "Content-Type": "application/json", user_id: "24b456" }
    })
      .then((res) => res.json())
      .then((response) => {
        if (isMounted) {
          setOptions(response.data && response.data.unique_label_list);
        }
      });
    setMounted(true);
  }, [isMounted]);

  const setSelectedUsers = (value) => {
    context.setSelectedLabel(value);
  };

  return (
    <CommonSelect
      optionData={options}
      setSelectedData={setSelectedUsers}
      selectedData={context.selectedLabel}
      placeholder= {'Select Labels'}
    ></CommonSelect>
  );
};

export default LabelList;
