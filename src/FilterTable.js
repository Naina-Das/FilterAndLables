import { Table, Tag, Space } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { FilterContext } from "./FilterContext";

const { Column } = Table;

const FilterTable = () => {
  const context = useContext(FilterContext);
  console.log(context);
  const [calls, setCalls] = useState([]);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      info: {
        filter_agent_list: context.selectedUsers,
        filter_time_range: context.selectedRange
      }
    })
  };
  useEffect(() => {
    fetch(
      "https://damp-garden-93707.herokuapp.com/getfilteredcalls",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setCalls(data.data);
      })
      .catch((error) => console.log(error));
  }, [context.selectedUsers, context.selectedRange]);
  return (
    <Table dataSource={calls} rowKey="name">
      <Column title="CallId" dataIndex="call_id" key="call_id" />
      <Column title="AgentId" dataIndex="agent_id" key="agent_id" />
      <Column title="CallTime" dataIndex="call_time" key="call_time" />
    </Table>
  );
};

export default FilterTable;
