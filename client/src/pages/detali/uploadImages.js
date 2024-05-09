import React, { useState, useEffect } from 'react';
import { LoadingOutlined, VerticalAlignBottomOutlined, CloseOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const UploadElement = (props) => {
  const { setImageTab, isImageTab, imageUrl, setImageUrl, isimages, setimages } = props

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
    </button>
  );

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // setImageTab(URL.createObjectURL(file));
      // setImageUrl({ selectedFile: file });

      isimages?.length ? setimages([...isimages, { file, imageUrl }]) : setimages([{ file, imageUrl }]);
    }
  };
  const handleFileChange = (event) => {
    // console.log('isimages :>> ', isimages);
    // console.log('files :>> ', files);
    const files = event.target.files; // Получаем все выбранные файлы
    if (files && files.length > 0) {
        // Преобразуем массив файлов в массив объектов { file, imageUrl }
        const newImages = Array.from(files).map(file => ({
            file,
            imageUrl: URL.createObjectURL(file)
        }));

        // Если уже есть изображения, добавляем новые к текущему списку
        setimages(prevImages => prevImages ? [...prevImages, ...newImages] : newImages);
    }
};


  const resetImg = (index) => {
    setimages(isimages.filter((img, i) => index !== i))
  }


  return (
    <div >
      <input
        type="file"
        id="file-input-2"
        name="id-card"
        onChange={handleFileChange}
        multiple
      />

      <div className="file-preloader-nav">
        <label htmlFor="file-input-2" className="btn btn--secondary">
          <VerticalAlignBottomOutlined style={{ fontSize: "30px" }} />
        </label>

      </div>

      <div className="images-container">

        {isimages?.length ? (isimages.map((image, index) =>
          typeof image === 'string' ?
            <span className="images-item-wrap" key={index}>
              <img
                src={process.env.REACT_APP_API_URL + image}
                alt="avatar"
              />
              <span onClick={() => resetImg(index)} className="btn btn--secondary"><CloseOutlined /></span>
            </span>
            :
            <span className="images-item-wrap" key={index}>
              <img
                src={image.imageUrl}
                alt="avatar"
              />
              <span onClick={() => resetImg(index)} className="btn btn--secondary"><CloseOutlined /></span>
            </span>


        )

        ) : (
          uploadButton
        )}
      </div>

    </div>
  );
};