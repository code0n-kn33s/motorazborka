import React from 'react';
import { AppstoreOutlined, ContainerOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    key: '0',
    icon: <ContainerOutlined />,
    label: 'Всі',
  },
  {
    key: 'sub2',
    icon: <AppstoreOutlined />,
    label: 'Navigation Two',
    children: [
      {
        key: '5',
        label: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          {
            key: '7',
            label: 'Option 7',
          },
          {
            key: '8',
            label: 'Option 8',
          },
        ],
      },
    ],
  },
 
];
const onClick = (e) => {
  console.log('click', e);
};

const SelectDetails = () => (
  <Menu
    onClick={onClick}
    style={{
      width: 256,
    }}
    mode="vertical"
    items={items}
  />
);
export default SelectDetails;