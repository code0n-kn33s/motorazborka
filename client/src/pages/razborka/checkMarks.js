import React from 'react';
import { Flex, Radio } from 'antd';

const CheckMarks = (props) => (
  <>
    <Radio.Group onChange={props.onChangeMark} value={props.selectedMark}>
      {props.marks?.map((mark) => <Radio.Button key={mark.id} value={mark.id}>
        <img src={process.env.REACT_APP_API_URL + mark.image} alt="" className='icons-radio-motos'/>
        {mark.mark}
      </Radio.Button>)}
    </Radio.Group>
  </>
);

export default CheckMarks;