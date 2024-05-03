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
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [isSuperUser, setSuperUser] = useState(true)
    const [activeType, setActiveType] = useState(null)
    const [activeMoto, setActiveMoto] = useState(null)
    const [activeModel, setActiveModel] = useState(null)
    const [detailType, setDetailType] = useState('new')


    const motos = useSelector(({ state }) => state.motos)
    const types = useSelector(({ state }) => state.types)
    const models = useSelector(({ state }) => state.models)
    const devices = useSelector(({ state }) => state.devices)

    const isLoggedIn = useSelector(state => state.auth.isAuth)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTypes())
        dispatch(getDevices())
        dispatch(getModels())
        dispatch(getMotos())

        return () => dispatch(clearData())
    }, [])

    const handleAddDevice = () => {
        setValueTab('')
        setModalOpen(true)
        setIsNew(true)
    }

    const handleEditDevice = id => e => {
        setModalContent(devices?.find(device => device.id === id))

        setModalOpen(true)
        // setImageTab(devices?.find(device => device.id === id).image)
        setIsNew(false)
    }

    const sortProducts1 = (type, id) => {
        let filteredDevices = [...devices]; // Создаем копию изначального массива устройств

        if (type === "types") {
            setActiveType(id);
        } else if (type === "moto") {
            setActiveMoto(id);
        } else if (type === 'models') {
            setActiveModel(id);
        }

        // Фильтрация по каждой сущности
        if (type === "types") {
            filteredDevices = id ? filteredDevices.filter(device => device.typeId === id) : filteredDevices;
        } else if (type === "moto") {
            filteredDevices = id ? filteredDevices.filter(device => device.motoId === id) : filteredDevices;
        } else if (type === 'models') {
            filteredDevices = id ? filteredDevices.filter(device => device.modelId === id) : filteredDevices;
        }

        // Пересечение результатов фильтрации для каждой сущности
        const typeFilteredDevices = activeType ? devices.filter(device => device.typeId === activeType) : devices;
        const motoFilteredDevices = activeMoto ? devices.filter(device => device.motoId === activeMoto) : devices;
        const modelFilteredDevices = activeModel ? devices.filter(device => device.modelId === activeModel) : devices;

        // Фильтрация устройств, которые удовлетворяют всем выбранным сущностям
        filteredDevices = filteredDevices.filter(device =>
            typeFilteredDevices.some(d => d.id === device.id) &&
            motoFilteredDevices.some(d => d.id === device.id) &&
            modelFilteredDevices.some(d => d.id === device.id)
        );

        console.log('type, id :>> ', type, id);
        console.log('filteredDevices :>> ', filteredDevices);
        return filteredDevices;
    };

    useEffect(() => {
        const sortedProducts = filterDevices()

        setFilteredProducts(sortedProducts);

    }, [activeType, activeMoto, activeModel]);

    const sortProducts = (type, id) => {
        // Обновляем выбранные тип, мотоцикл и модель
        if (type === "types") {
            setActiveType(id);
        } else if (type === "moto") {
            setActiveMoto(id);
        } else if (type === 'models') {
            setActiveModel(id);
        }
    };

    // Функция для фильтрации устройств
    const filterDevices = () => {
        console.log('activeType :>> ', activeType);
        console.log('activeMoto :>> ', activeMoto);
        console.log('activeModel :>> ', activeModel);

        const isAnyFilterSelected = activeType !== null || activeMoto !== null || activeModel !== null;

        // Если ни один из параметров не выбран, возвращаем исходный массив устройств
        if (!isAnyFilterSelected) {
            return devices;
        }
        const filteredDevices = devices?.filter(device =>
            (!activeType || device.typeId === activeType) &&
            (!activeMoto || device.motoId === activeMoto)
            && (!activeModel || device.modelId.includes(String(activeModel)))
        );

        return filteredDevices;
    };

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
                        isLoggedIn={isLoggedIn}
                        sortProducts={sortProducts}
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
                        isLoggedIn={isLoggedIn}
                        sortProducts={sortProducts}
                    />
                </div>
                <div className="detali-content-items">
                    <ul className="device-content">
                        {isLoggedIn && <Space wrap size={16} className='plus-button'>
                            <Avatar size={84} icon={<PlusOutlined />} onClick={handleAddDevice} />
                        </Space>}

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

                        {isLoggedIn ? devices?.map(device => (
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
                                    isLoggedIn={isLoggedIn}
                                    sortProducts={sortProducts}
                                />
                            </li>
                        ))

                        :
                        filteredProducts?.map(device => (
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
                                    isLoggedIn={isLoggedIn}
                                    sortProducts={sortProducts}
                                />
                            </li>
                        ))

                    }
                    </ul>
                </div>

            </div>


        </>
    )
}