'use client'
import React, { useRef, useEffect } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxMap = ({ coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const flyToLocation = () => {
      if (coordinates && mapRef.current) {
        mapRef.current.flyTo({
          center: [coordinates.lng, coordinates.lat],
          zoom: 14,
          duration: 2500
        });
      }
    };

    // Set a delay for the flyTo operation
    const timeoutId = setTimeout(flyToLocation, 1000);

    return () => clearTimeout(timeoutId); // Clear timeout if component unmounts
  }, [coordinates]);

  return (
    <div>
      <div className="rounded-lg overflow-hidden w-full">
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: -95.7129, // Use a default far away longitude (e.g., center of the US)
            latitude: 37.0902, // Use a default far away latitude (e.g., center of the US)
            zoom: 3 // Start with a far away zoom level
          }}
          style={{ width: "100%", height: 450, borderRadius: 10 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Marker longitude={coordinates.lng} latitude={coordinates.lat} color="red" />
        </Map>
      </div>
    </div>
  );
};

export default MapboxMap;
