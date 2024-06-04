import React, { useState, useEffect } from "react";
import { Checkbox, Divider } from "antd";
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

const CheckModels = (props) => {
  const {
    motoId,
    models,
    modelsChecked,
    checkedList,
    setCheckedList,
    options,
    setOptions,
  } = props;

  useEffect(() => {
    let filtred = models?.filter((m) => m.motoId == motoId)
      .map((item) => ({ label: item.model, value: item.id }));

    setOptions(filtred);
  }, [motoId, models]);

  useEffect(() => {
    console.log("modelsChecked", modelsChecked);
    modelsChecked 
      && modelsChecked.length 
      && setCheckedList(modelsChecked.map(i => parseInt(i)));
  }, [motoId, models]);

  const onChange = (list) => {
    console.log('list', list)
    
    setCheckedList(list);

    console.log('modelsChecked', modelsChecked)
  };

  return (
    <>
      {options && (
        <CheckboxGroup
          options={options}
          // defaultValue={modelsChecked && modelsChecked.split(',').map(i => parseInt(i))}
          value={checkedList}
          // defultValue={[13, 12]}
          // value={[12,13]}
          onChange={onChange}
        />
      )}
    </>
  );
};
export default CheckModels;
