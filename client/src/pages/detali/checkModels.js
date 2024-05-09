import React, { useState, useEffect } from 'react';
import { Checkbox, Divider } from 'antd';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const CheckModels = (props) => {
  const { motoId, models, modelsChecked, checkedList, setCheckedList, options, setOptions } = props;

  // const checkAll = plainOptions.length === checkedList.length;
  // const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  useEffect(() => {
    let filtred = models?.filter(m => (m.motoId === motoId)).map(item => ({ label: item.model, value: item.id }))
    // let modls = props.models.filter(model => model.motoId === selectedMark)
    //     setSelectedModels(modls)

    // let filtred = models.map(item => ({label: item.model, value: item.id}))
    // setCheckedList(modelsChecked)
    setOptions(filtred)
    // modelsChecked && setCheckedList(modelsChecked.split(',').map(i => parseInt(i)))
    // modelsChecked && onChange(modelsChecked.split(',').map(i => parseInt(i)))
  }, [motoId, models])

  useEffect(() => {
    modelsChecked && setCheckedList(modelsChecked.split(',').map(i => parseInt(i)))

  }, [motoId, models])

  const onChange = (list) => {
    console.log('list :>> ', list);
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {

    let checkedAll = models?.filter(m => (m.motoId === motoId)).map(option => ({ value: option.id, label: option.model }))
    console.log('models?.filter(m => (m.motoId === motoId)) :>> ', models?.filter(m => (m.motoId === motoId)));
    console.log('checkedAll :>> ', checkedAll);

    setCheckedList(e.target.checked ? checkedAll : []);
  };

  // console.log('listModels :>> ', listModels());
  console.log('options :>> ', options);
  models && console.log('models :>> ', models);
  modelsChecked && console.log('modelsChecked :>> ', modelsChecked);
  checkedList && console.log('checkedList :>> ', checkedList);
  checkedList && console.log('modelsChecked && modelsChecked.split(', ').map(i => parseInt(i)) :>> ', modelsChecked && modelsChecked.split(',').map(i => parseInt(i)));

  return (
    <>
      {/* <Checkbox
        indeterminate={options}
        onChange={onCheckAllChange}
      >
        Вибрати усi
      </Checkbox>

      <br /> */}

      {options && <CheckboxGroup
        options={options}
        // defaultValue={modelsChecked && modelsChecked.split(',').map(i => parseInt(i))}
        value={checkedList}
        // defultValue={[13, 12]}
        // value={[12,13]}
        onChange={onChange}
      />}

    </>
  );
};
export default CheckModels;