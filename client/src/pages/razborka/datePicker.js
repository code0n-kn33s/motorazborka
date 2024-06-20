import React, { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import {getYears} from '../../toolkitReducers';
import { useDispatch, useSelector } from "react-redux";

import YearTags from "./editYears";

import { Select } from "antd";

const App = ({handleChange, isCheckedDate}) => {
  const [year, setYear] = useState([]);

  const isYears = useSelector(state => state.state.years)
  
  useEffect(() => {
    setYear(isYears?.map((el) => ({ value: el.id, label: el.years })))
  }, [isYears])

  const filteredIds = isCheckedDate ? isCheckedDate.map(Number).filter(id => year.some(y => y.value === id)) : [];

  return (
    <div>
      <Select
        mode="tags"
        style={{
          width: "100%",
        }}
        placeholder="Tags Mode"
        onChange={handleChange}
        options={year}
        value={filteredIds}
      />
      <br/>
      <div className="YearTags-wrap">

      <YearTags 
        isYears={isYears}
      />
      </div>
    </div>
  );
};
export default App;
