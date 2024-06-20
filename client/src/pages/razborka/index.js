import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getDevices,
  getModels,
  getMotos,
  clearData,
  getYears,
  getRozborka,
} from "../../toolkitReducers";

import { TabsElement, VerticalTabs, CardRozborka } from "../../library";
import SelectDetails from "./SelectDetails";
import { AsyncModalDevice } from "./asyncModalDevice";

import { Space, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import moto from "../../assets/images/sl1.png";

export default function DetailsPage(props) {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editValueTab, setValueTab] = useState("");
  const [isImageTab, setImageTab] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [activeType, setActiveType] = useState(null);
  const [activeMoto, setActiveMoto] = useState(null);
  const [activeModel, setActiveModel] = useState(null);
  const [detailType, setDetailType] = useState("new");

  const motos = useSelector(({ state }) => state.motos);
  const types = useSelector(({ state }) => state.types);
  const models = useSelector(({ state }) => state.models);
  const devices = useSelector(({ state }) => state.rozborka);
  const years = useSelector(({ state }) => state.years);

  // console.log('*** motos', motos)
  // console.log('*** types', types)
  // console.log('*** models', models)
  // console.log('*** devices', devices)
  // console.log('*** years', years)

  const isLoggedIn = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getRozborka());
    dispatch(getModels());
    dispatch(getMotos());
    dispatch(getYears());

    return () => dispatch(clearData());
  }, []);

  const handleAddDevice = () => {
    setValueTab("");
    setModalOpen(true);
    setIsNew(true);
  };

  const handleEditDevice = (id) => (e) => {
    setModalContent(devices?.find((device) => device.id === id));

    setModalOpen(true);
    // setImageTab(devices?.find(device => device.id === id).image)
    setIsNew(false);
  };

  useEffect(() => {
    if (types || motos || models) {
      const sortedProducts = filterDevices();
      setFilteredProducts(sortedProducts);
    }
  }, [activeType, activeMoto, activeModel, types, motos, models]);

  const sortProducts = (type, id) => {
    // Обновляем выбранные тип, мотоцикл и модель
    if (type === "types") {
      setActiveType(id);
    } else if (type === "moto") {
      setActiveMoto(id);
    } else if (type === "models") {
      setActiveModel(id);
    }
  };

  // Функция для фильтрации устройств
  const filterDevices = () => {
    const isAnyFilterSelected =
      activeType === null && activeMoto === null && activeModel === null;

    // Если ни один из параметров не выбран, возвращаем исходный массив устройств
    if (isAnyFilterSelected) {
      return devices;
    }

    const filteredDevices = devices?.filter(
      (device) =>
        (!activeType || device.typeId === activeType) &&
        (!activeMoto || device.motoId === activeMoto) &&
        (!activeModel || device.modelId.includes(String(activeModel)))
    );

    return filteredDevices;
  };

  const getProductsToRender = () => {
    return isLoggedIn ? devices : filteredProducts;
  };

  const sortedProducts = [...(getProductsToRender() || [])].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <>
      <div className="detali-top">
        <img src={moto} alt="" />
      </div>
      <div className="detali-title">Деталі з розборки</div>

      <div className="detali-content-wrap">
        <div className="detali-list-motos">
          <SelectDetails 
            motos={motos}
            types={types}
            models={models}
            devices={devices}
            years={years}
          />
        </div>
        <div className="detali-content-items">
          <ul className="device-content">
            {isLoggedIn && (
              <Space wrap size={16} className="plus-button">
                <Avatar
                  size={84}
                  icon={<PlusOutlined />}
                  onClick={handleAddDevice}
                />
              </Space>
            )}

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

            {sortedProducts?.map((device) => (
              <li key={device.id} className="device-item">
                <CardRozborka
                  images={device.images}
                  type={types?.find((type) => type.id === device.typeId)?.name}
                  price={device.price}
                  title={device.title}
                  description={device.description}
                  name={device.name}
                  id={device.id}
                  motoId={device.motoId}
                  disabled={device.disabled}
                  handleEditDevice={handleEditDevice}
                  isLoggedIn={isLoggedIn}
                  sortProducts={sortProducts}
                  models={models}
                  modelId={device.modelId}
                  yearId={device.yearId}
                  yearsArray={years}
                  autoTitle={{
                    findMoto: motos?.find((moto) => device.motoId === moto.id),
                    findType: types?.find((type) => device.typeId === type.id),
                    // findYear: years?.find((years) => device.typeId === years.id),
                    findModels: models?.filter(
                      (moto) => device.modelId === moto.id
                    ),
                    motos: motos,
                    modelId: device.modelId,
                    device: device,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
