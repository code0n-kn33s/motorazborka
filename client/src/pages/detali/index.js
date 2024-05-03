import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTypes,
    getDevices,
    getModels,
    getMotos,
    clearData
} from '../../toolkitReducers';

import { TabsElement, VerticalTabs, CardElement } from '../../library'

import { AsyncModalDevice } from './asyncModalDevice'

import { Space, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

import moto from '../../assets/images/sl1.png'

export default function DetailsPage(props) {
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editValueTab, setValueTab] = useState('');
    const [isImageTab, setImageTab] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [isActiveIdDevice, setActiveIdDevice] = useState(false);


    const [isSuperUser, setSuperUser] = useState(true)
    const [activeMoto, setActiveMoto] = useState(null)
    const [activeModel, setActiveModel] = useState(null)
    const [activeDetail, setActiveDetail] = useState(null)
    const [detailType, setDetailType] = useState('new')


    const motos = useSelector(({ state }) => state.motos)
    const types = useSelector(({ state }) => state.types)
    const models = useSelector(({ state }) => state.models)
    const devices = useSelector(({ state }) => state.devices)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTypes())
        dispatch(getDevices())
        dispatch(getModels())
        dispatch(getMotos())

        // devices && setImageTab(devices?.find(device => device.id === id).image)
        // devices && console.log('devices && :>> ', devices?.find(device => device.id === id).image);
        
        // console.log('process.env :>> ', process.env);
        // console.log('process.env.REACT_APP_API_URL :>> ', process.env.REACT_APP_API_URL);

        return () => dispatch(clearData())
    }, [])

    // console.log('activeMoto :>> ', activeMoto);
    // console.log('activeModel :>> ', activeModel);
    // console.log('types :>> ', types);

    const handleAddDevice = () => {
        setValueTab('')
        setModalOpen(true)
        // setModalContent({
        //     mark: '',
        //     image: null
        // })
        setIsNew(true)
    }

    const handleEditDevice = id => e => {
        setModalContent(devices?.find(device => device.id === id))

        setModalOpen(true)
        // setImageTab(devices?.find(device => device.id === id).image)
        setIsNew(false)
    }

    return (
        <>
            <div className="detali-top">
                <img src={moto} alt="" />
            </div>
            <div className="detali-title">
                Деталі для мотоциклів
            </div>
            <div className="detali-list-types">
                <ul>
                    <TabsElement
                        isSuperUser={isSuperUser}
                        types={types}
                        setDetailType={setDetailType}
                    />
                </ul>
            </div>
            <div className="detali-content-wrap">
                <div className="detali-list-motos">
                    <VerticalTabs
                        motos={motos}
                        models={models}
                        isSuperUser={isSuperUser}
                        setActiveMoto={setActiveMoto}
                        setActiveModel={setActiveModel}
                    />
                </div>
                <div className="detali-content-items">
                    <ul className="device-content">
                        <Space wrap size={16} className='plus-button'>
                            <Avatar size={84} icon={<PlusOutlined />} onClick={handleAddDevice} />
                        </Space>

                        <AsyncModalDevice
                            type={detailType}
                            isNew={isNew}
                            setImageTab={setImageTab}
                            isImageTab={isImageTab}
                            isOpen={isModalOpen}
                            setModalOpen={setModalOpen}
                            modalContent={modalContent}
                            editValueTab={editValueTab}
                            setValueTab={setValueTab}
                            setIsNew={setIsNew}
                            setModalContent={setModalContent}
                            motos={motos}
                            types={types}
                            models={models}
                        />

                        {devices?.map(device => (
                            <li key={device.id} className="device-item">
                                <CardElement
                                    images={device.images}
                                    type={types?.find(type => type.id === device.typeId).name}
                                    price={device.price}
                                    title={device.title}
                                    description={device.description}
                                    name={device.name}
                                    id={device.id}
                                    disabled={device.disabled}
                                    handleEditDevice={handleEditDevice}
                                // ??
                                // findMoto={motos?.find(moto => device.motoId === moto.id)}
                                // findType={types?.find(moto => device.typeId === moto.id)}
                                // findModels={models?.filter(moto => device.modelId === moto.id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

            </div>


        </>
    )
}