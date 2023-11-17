"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import SearchBox from "../SearchBox/SearchBox";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const locations = [
  {
    name: "Location 1",
    location: {
      lat: 41.3954,
      lng: 2.162,
    },
  },
  {
    name: "Location 2",
    location: {
      lat: 41.3917,
      lng: 2.1649,
    },
  },
  {
    name: "Location 3",
    location: {
      lat: 41.3773,
      lng: 2.1585,
    },
  },
  // Add more locations here
];

const center = { lat: 41.3954, lng: 2.162 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "academic-arcade-405314",
    googleMapsApiKey: "AIzaSyAzUXYQYUdcYkeeF3IpjjXNGtwCrqKM38w",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(({ location }) => {
      bounds.extend({ lat: location.lat, lng: location.lng });
    });

    map?.fitBounds(bounds);
  }, [isLoaded, locations]);

  return (
    <div className="absolute top-0 w-full h-full z-0">
      <SearchBox />
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapTypeControl: false,
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {locations.map((item) => {
            return <Marker key={item.name} position={item.location} />;
          })}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Map;
