import React,{useEffect,useRef} from 'react'
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapStyles from "./styles/Map.module.css"

mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;

function LocationMap({lat,lng,mapContainer} : {lat:any,lng:any,mapContainer:any}) {
  // const mapContainerRef = useRef(null);

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng,lat],
          sprites:""
        },
        properties: {
          title: 'Current Location',
          description: 'San Francisco, California',
        }
      }
    ]
  };

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center:  [lng,lat],
      zoom: 6,
      preserveDrawingBuffer:true
    });

    map.on("load", function () {

      map.resize();
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with multiple points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: geojson.features,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              'icon-size': 0.75,
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, [lng,lat]);

  return (
    <>
    <div className={MapStyles.mapContainer} ref={mapContainer} />;
    </>
  )
}

export default LocationMap