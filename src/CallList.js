import { Table, Tag, Space, Button } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { FilterContext } from "./FilterContext";
import LabelList from "./LabelList";
import './callList.css';

const columns = [
  {
    title: "CallId",
    dataIndex: "call_id",
    key: "call_id",
    render: (text) => <a>{text}</a>
  },
  {
    title: "Label",
    key: "call_id",
    dataIndex: "label_id",
    render: (label) => (
      <>
        {label.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  }
];

const CallList = () => {
  const context = useContext(FilterContext);
  const [calls, setCalls] = useState([]);
  const [selectedRowKeys, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://damp-garden-93707.herokuapp.com/getcalllist`, {
      method: "GET",
      headers: { "Content-Type": "application/json", user_id: "24b456" }
    })
      .then((res) => res.json())
      .then((response) => {
        setCalls(response.data && response.data.call_data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [loading]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRow, selectedRows) => {
      setSelectedRows(selectedRow);
    },
    getCheckboxProps: (record) => ({
      name: record.call_id
    })
  };

  function applyLabels(op) {
    const labelsActions = [];
    let selectedLabels = context.selectedLabel;
    for (let i = 0; i < selectedLabels.length; i++) {
      labelsActions.push({ name: selectedLabels[i], op });
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", user_id: "24b456" },
      body: JSON.stringify({
        operation: {
          callList: selectedRowKeys,
          label_ops: labelsActions
        }
      })
    };
    fetch("https://damp-garden-93707.herokuapp.com/applyLabels", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(true);
        setSelectedRows([]);
        context.setSelectedLabel([]);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="callListContainer">
        <div className="text">Call List</div>
        <div className="label">
          <LabelList />
          <div className="btnContainer">
            <Button type="primary" onClick={() => applyLabels("add")}>
              Apply Labels
            </Button>
            <Button type="danger" onClick={() => applyLabels("remove")} style={{marginLeft: '20px'}}>
              Remove Labels
            </Button>
          </div>
        </div>
        <Table
          rowSelection={{
            ...rowSelection
          }}
          columns={columns}
          dataSource={calls}
          rowKey="call_id"
        />
      </div>
    </>
  );
};

export default CallList;
