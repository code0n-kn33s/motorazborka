import React, { useState, useEffect } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const SelectDetails = ({ motos, types, models, devices, years, onMenuSelect }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const generateMenuItems = () => {
      const items = types?.map(type => {
        const marks = motos?.filter(moto => 
          devices?.some(device => device.typeId === type.id && device.motoId === moto.id)
        );

        const markItems = marks?.map(moto => {
          const modelItems = models?.filter(model => 
            model.motoId === moto.id && 
            devices?.some(device => device.modelId?.includes(String(model.id)) && device.typeId === type.id)
          );

          const modelItemList = modelItems?.map(model => {
            const yearItems = years?.filter(year => 
              devices?.some(device => 
                device.modelId?.includes(String(model.id)) && 
                device.yearId?.includes(String(year.id)) &&
                device.typeId === type.id && 
                device.motoId === moto.id
              )
            );

            if (yearItems?.length > 0) {
              return {
                key: `type-${type.id}-moto-${moto.id}-model-${model.id}`,
                label: model.model,
                children: yearItems.map(year => ({
                  key: `type-${type.id}-moto-${moto.id}-model-${model.id}-year-${year.id}`,
                  label: year.years
                }))
              };
            }
            return null;
          })?.filter(item => item !== null); // Удаляем модели без доступных годов

          if (modelItemList?.length > 0) {
            return {
              key: `type-${type.id}-moto-${moto.id}`,
              label: moto.mark,
              children: modelItemList
            };
          }
          return null;
        })?.filter(item => item !== null); // Удаляем марки без доступных моделей

        if (markItems?.length > 0) {
          return {
            key: `type-${type.id}`,
            icon: <AppstoreOutlined />,
            label: type.name,
            children: markItems
          };
        }
        return null;
      })?.filter(item => item !== null); // Удаляем типы без доступных марок

      setMenuItems(items);
    };

    generateMenuItems();
  }, [motos, types, models, devices, years]);

  const handleMenuClick = (e) => {
    setOpenKeys([]); // Закрываем все подменю при клике на любой элемент
    onMenuSelect(e.key);
    console.log('Menu item clicked:', e.key);
  };

  const parseMenuKey = (key) => {
    const parts = key.split('-');
    const type = parseInt(parts[1]);
    const moto = parts.includes('moto') ? parseInt(parts[3]) : null;
    const model = parts.includes('model') ? parseInt(parts[5]) : null;
    const year = parts.includes('year') ? parseInt(parts[7]) : null;
    return { type, moto, model, year };
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
