import React from 'react';

import WrapGoogleMap from './GoogleMap'

// import Soc from './../common/Soc'
// import {Telephone, Email} from '../elems/ContactAnimIcons'

const Contacts = () => {

    return (
      <div className="contacts" id="contacts">
        <div className="contacts-container">
          <div className="contacts-title">Контакти</div>
          <div className="contacts-address">м.Київ, вул. Соборна, 11, Софіївська Борщагівка </div>
          <div className="contacts-address">
            {/* <Email/> */}
          </div>
          <div className="contacts-tel">
            {/* <Telephone tel='095-114-99-63'/> */}
          </div>
          {/* <Soc/> */}
        </div>
        <WrapGoogleMap />
      </div>
    );
  }


export default Contacts;