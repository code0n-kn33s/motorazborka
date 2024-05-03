import React, { useCallback } from 'react';
import { Card } from 'antd';

import { CarouselApp } from './carousel';
import { EditOutlined, StopOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';

import {
  getDevices,
  deleteDevices,
} from '../../toolkitReducers'

const { Meta } = Card;

export const CardElement = (props) => {
  const dispatch = useDispatch();

  const models = useSelector(({ state }) => state.models)

  const handleDelete = (value)=> (event) => {
    dispatch(deleteDevices(value))

    setTimeout(() => {
      dispatch(getDevices())
    }, 500);
  }

  return (
    <Card
      hoverable
      actions={[
        <EditOutlined onClick={props.handleEditDevice(props.id)} key="edit" />,
        <StopOutlined onClick={handleDelete(props.id)} key="setting" />,
      ]}

      style={{
        width: 240,
      }}
      cover={
        <CarouselApp
          images={props.images}
        />
      }
    >

      <Meta title={props.name} description={props.title} />

      <h3>{props.price} EUR</h3>

    </Card>
  )
}