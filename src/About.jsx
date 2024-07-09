import React from 'react';
import CombinedUi from './shared/components/CombinedUi.jsx';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export const About = () => {
  return (
    <div>
      <CombinedUi>
        <div className='p-10 flex flex-col md:flex-row md:space-x-10 space-y-10 items-stretch md:items-center'>
          <div className='basis-1/2'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
              nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
              ligula massa, varius a, semper congue, euismod non, mi.
            </p>
          </div>
          <div className='basis-1/2'>
            <MapContainer
              center={[39.88862264135726, 32.79667159698546]}
              zoom={15}
              scrollWheelZoom={false}
              className='w-full min-h-60'
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={[39.88862264135726, 32.79667159698546]} />
            </MapContainer>
          </div>
        </div>
      </CombinedUi>
    </div>
  );
};
