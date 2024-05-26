import React, { useEffect } from 'react';
import { Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City} from '../../types/city';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';

type MapProps = {
  city: City;
  offers: Offer[];
}

const defaultIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [30, 30]
});

const activeIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [30, 30]
});


function Map(props: MapProps): JSX.Element {
  const selectedPoint = useAppSelector((state) => state.selectedPoint);
  const {city, offers} = props;

  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city]);

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker
          .setIcon(selectedPoint === offer.location ? activeIcon : defaultIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
