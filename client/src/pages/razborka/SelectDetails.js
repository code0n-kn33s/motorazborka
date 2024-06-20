import React, { useState, useEffect } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const SelectDetails = ({ motos, types, models, devices, years }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const items = types?.map(type => {
      const marks = motos?.filter(moto => devices?.some(device => device.typeId === type.id && device.motoId === moto.id));
      console.log('Marks for type', type.name, marks);

      const markItems = marks?.map(moto => {
        const modelItems = models?.filter(model => 
          model.motoId === moto.id && 
          devices?.some(device => device.modelId?.includes(String(model.id)) && device.typeId === type.id)
        );
        console.log('Models for moto', moto.mark, modelItems);

        const modelItemList = modelItems?.map(model => {
          const yearItems = years?.filter(year => 
            devices?.some(device => device.modelId?.includes(String(model.id)) && device.yearId?.includes(String(year.id)))
          );
          console.log('Years for model', model.model, yearItems);

          return {
            key: `model-${model.id}`,
            label: model.model,
            children: yearItems?.length > 0 ? yearItems.map(year => ({
              key: `year-${year.id}`,
              label: year.years
            })) : [],
          };
        })?.filter(item => item.children?.length > 0 || item.label); // Удаляем модели без доступных годов

        return {
          key: `moto-${moto.id}`,
          label: moto.mark,
          children: modelItemList?.length > 0 ? modelItemList : [],
        };
      })?.filter(item => item.children?.length > 0 || item.label); // Удаляем марки без доступных моделей

      return {
        key: `type-${type.id}`,
        icon: <AppstoreOutlined />,
        label: type.name,
        children: markItems?.length > 0 ? markItems : [],
      };
    })?.filter(item => item.children?.length > 0 || item.label); // Удаляем типы без доступных марок

    setMenuItems(items);
  }, [motos, types, models, devices, years]);

  const handleMenuClick = (e) => {
    setOpenKeys([]); // Закрываем все подменю при клике на любой элемент
    console.log('Menu item clicked:', e.key);
  };

  const renderMenuItems = (items) => {
    return items?.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label} onTitleClick={handleMenuClick}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return <Menu.Item key={item.key} onClick={handleMenuClick}>{item.label}</Menu.Item>;
    });
  };

  return (
    <Menu
      mode="vertical"
      selectable
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
    >
      {renderMenuItems(menuItems)}
    </Menu>
  );
};

export default SelectDetails;
