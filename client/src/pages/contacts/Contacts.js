import React from "react";

import WrapGoogleMap from "./GoogleMap";

// import Soc from './../common/Soc'
// import {Telephone, Email} from '../elems/ContactAnimIcons'

const Contacts = () => {
  return (
    <div className="contacts" id="contacts">
      <div className="contacts-container">
        <div className="contacts-title">Контакти</div>
        <div className="contacts-address">
          м.Київ, вул. Соборна, 11, Софіївська Борщагівка{" "}
        </div>
        <br/>
        <div>Сергій: <a type="tel" href={`tel:+380934880488`} className="contacts-tel"> +38(093)488-04-88</a></div>
        <br/>
        <div> Максим: <a type="tel" href={`tel:+380634545554`} className="contacts-tel"> +38(063)454-55-54 </a></div>
        <br/>
        <br/>
        <div className="contacts-tel">
          {/* <Telephone tel='095-114-99-63'/> */}
        </div>
        {/* <Soc/> */}
      </div>
      <WrapGoogleMap />
      <br/>

    </div>
  );
};

export default Contacts;
