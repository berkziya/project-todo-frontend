import React from 'react';
import CombinedUi from './shared/components/CombinedUi.jsx';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export const About = () => {
  return (
    <div>
      <CombinedUi>
        <div className='flex flex-col justify-center space-x-0 md:space-x-10'>
          <div className='m-10'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
              nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
              ligula massa, varius a, semper congue, euismod non, mi.
            </p>
          </div>
          <div className='m-10'>
            {/* <MapContainer
              center={[39.88862264135726, 32.79667159698546]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={[39.88862264135726, 32.79667159698546]} />
            </MapContainer> */}
          </div>
        </div>
      </CombinedUi>
    </div>
  );
};
