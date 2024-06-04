import React from 'react';
import { Select, Space } from 'antd';

const CheckTypes = (props) => {
    return (
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
    )
}

export default CheckTypes;