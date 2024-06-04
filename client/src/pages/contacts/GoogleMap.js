import React from 'react'

const GoogleMap = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    // Функция-обработчик для обновления ширины окна
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Добавляем обработчик события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Устанавливаем начальное значение ширины окна
    setWindowWidth(window.innerWidth);

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.4133640264704!2d30.375344699999992!3d50.41476960000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cbdb215996ef%3A0x928d1d1e3ae8bda5!2z0JzQvtGC0L4g0KHQotCeIFRIRSBCSUtFUi4g0JzQvtGC0L4g0YDQtdC80L7QvdGCLiDQoNC10LzQvtC90YIg0LzQvtGC0L7RhtC40LrQu9GW0LIuINCg0LXQvNC-0L3RgiDQutCy0LDQtNGA0L7RhtC40LrQu9GW0LIu!5e0!3m2!1sru!2sua!4v1714407126643!5m2!1sru!2sua" width={windowWidth > 650 ? 650 : "100%"} height="450"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default GoogleMap;
