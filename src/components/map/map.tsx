
import React, { useEffect } from 'react';
import {Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City} from '../../types/city';
import {Point} from '../../types/point';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedPoint: Point | undefined;
}

function Map(props: MapProps): JSX.Element {
  const {city, offers, selectedPoint} = props;

  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.latitude, city.longitude]);
    }
  }, [map, city]);

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.point.latitude,
          lng: offer.point.longitude
        });
        marker
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
