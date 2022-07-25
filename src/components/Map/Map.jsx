import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { useStateContext } from '../../contexts/contextProvider';

export default function Map() {
  const { initialLat, initialLong, locations, inputValue } = useStateContext();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const long = initialLong;
  const lat = initialLat;

  const [zoom] = useState(11);
  const [API_KEY] = useState('qNzilfZdZqz1XdoT2fWM');

  useEffect(() => {
    // if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [long, lat],
      zoom: zoom,
    });

    map.current.on('load', function () {
      map.current.addSource('id', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locations,
        },
      });

      map.current.addLayer({
        id: 'bikePoints',
        type: 'circle',
        source: 'id',
        paint: {
          'circle-radius': 6,
          'circle-color': '#d10202',
        },
        filter: ['==', '$type', 'Point'],
      });
    });
  }, [locations]);

  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
    </div>
  );
}
