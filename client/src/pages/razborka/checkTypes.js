import React from "react";
import { Select, Space } from "antd";
import EditTypes from './editTypes'
const CheckTypes = (props) => {
  return (
    <>
      <Select
        value={props.selectedType}
        style={{
          width: "100%",
        }}
        onChange={props.handleChangeType}
        options={props.types?.map((type) => ({
          value: type.id,
          label: type.name.toUpperCase(),
        }))}
      />

      <div style={{ height: "20px" }}></div>
    
      <EditTypes isTypes={props.types} />
    </>
  );
};

export default CheckTypes;
