import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { SuggestionsUl, SearchInput, SuggestionsLi } from "../Map/Map.styled";
import "./Map.css";
import SideModal from "../../components/Modal/SideModal";
import FilterDropdown from "./FilterMapIcons";

import pinCarCrash from "./PinIcons/CarCrash.png";
import pinTrafficJam from "./PinIcons/TrafficJam.png";
import pinRoadWarning from "./PinIcons/RoadWarning.png";
import pinMegaphoneAttention from "./PinIcons/MegaphoneAttention.png";
import pinGoodParty from "./PinIcons/GoodParty.png";
import pinAlertSiren from "./PinIcons/RedSiren.png";

const MAPTILER_API_KEY = "9FFM7EjGxsp0Lf47NKRV";

const dummyMarkersData = [
  {
    id: "1",
    coordinates: [20.462, 44.785],
    color: "red",
    title: "Car crash on the boulevard",
    type: "Car Wreck",
  },
  {
    id: "6",
    coordinates: [20.492, 44.785],
    color: "red",
    title: "Car crash on the boulevard",
    type: "Alert",
  },
  {
    id: "2",
    coordinates: [20.47, 44.78],
    color: "red",
    title: "Collision near Novi Beograd",
    type: "Good party",
  },
  {
    id: "3",
    coordinates: [20.475, 44.79],
    color: "blue",
    title: "Massive traffic jam near Ada",
    type: "Traffic Jam",
  },
  {
    id: "4",
    coordinates: [20.48, 44.783],
    color: "blue",
    title: "Backup on highway",
    type: "Repair",
  },
  {
    id: "5",
    coordinates: [20.455, 44.789],
    color: "purple",
    title: "Megaphone",
    type: "Megaphone",
  },
];

// Extract unique types for filters
const allTypes = Array.from(new Set(dummyMarkersData.map((m) => m.type)));

const Map = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const customMarkersRef = useRef([]);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // New: active filters state (default all selected)
  const [activeFilters, setActiveFilters] = useState(allTypes);

  const createColoredMarker = (lng, lat, color, title) => {
    const el = document.createElement("div");
    el.style.width = "20px";
    el.style.height = "20px";
    el.style.backgroundColor = color;
    el.style.borderRadius = "4px";
    el.style.border = "2px solid white";
    el.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
    el.title = title;

    return new maplibregl.Marker({ element: el }).setLngLat([lng, lat]);
  };

  const createImageMarker = (lng, lat, title, type) => {
    const el = document.createElement("img");

    if (type === "Car Wreck") el.src = pinCarCrash;
    else if (type === "Traffic Jam") el.src = pinTrafficJam;
    else if (type === "Repair") el.src = pinRoadWarning;
    else if (type === "Megaphone") el.src = pinMegaphoneAttention;
    else if (type === "Good party") el.src = pinGoodParty;
    else if (type === "Alert") el.src = pinAlertSiren;
    else el.src = pinCarCrash;

    el.style.width = "24px";
    el.style.height = "24px";
    el.style.cursor = "pointer";
    el.title = title;

    return new maplibregl.Marker({ element: el }).setLngLat([lng, lat]);
  };

  // Clear & render markers according to activeFilters
  const renderMarkers = (data) => {
    // Remove old markers
    customMarkersRef.current.forEach((marker) => marker.remove());
    customMarkersRef.current = [];

    // Filter and add new markers
    data
      .filter((marker) => activeFilters.includes(marker.type))
      .forEach(({ coordinates, color, title, type }) => {
        let marker;
        if (
          [
            "Car Wreck",
            "Traffic Jam",
            "Repair",
            "Megaphone",
            "Good party",
            "Alert",
          ].includes(type)
        ) {
          marker = createImageMarker(
            coordinates[0],
            coordinates[1],
            title,
            type
          );
        } else {
          marker = createColoredMarker(
            coordinates[0],
            coordinates[1],
            color,
            title
          );
        }
        marker.addTo(mapRef.current);
        customMarkersRef.current.push(marker);
      });
  };

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`,
      center: [20.457273, 44.787197], // Belgrade
      zoom: 12,
    });

    mapRef.current.on("style.load", () => {
      const layers = mapRef.current.getStyle().layers;

      layers.forEach((layer) => {
        if (layer.id.includes("boundary") && layer.paint?.["line-dasharray"]) {
          mapRef.current.setLayoutProperty(layer.id, "visibility", "none");
        }

        if (
          layer.id.includes("poi") &&
          !layer.id.includes("landmark") &&
          !layer.id.includes("historic")
        ) {
          mapRef.current.setLayoutProperty(layer.id, "visibility", "none");
        }

        if (
          layer.id.includes("transit") ||
          layer.id.includes("shop") ||
          layer.id.includes("bar") ||
          layer.id.includes("restaurant")
        ) {
          mapRef.current.setLayoutProperty(layer.id, "visibility", "none");
        }

        const extendedBalkanBounds = [
          [13.0, 36.0],
          [29.8, 48.5],
        ];
        mapRef.current.setMaxBounds(extendedBalkanBounds);

        // Render filtered markers initially
        renderMarkers(dummyMarkersData);
      });
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.warn("Location access denied or unavailable.");
      }
    );

    return () => {
      if (markerRef.current) markerRef.current.remove();
      customMarkersRef.current.forEach((m) => m.remove());
      customMarkersRef.current = [];
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.setCenter([userLocation.lng, userLocation.lat]);
    }
  }, [userLocation]);

  // Re-render markers on filter change
  useEffect(() => {
    if (mapRef.current?.loaded()) {
      renderMarkers(dummyMarkersData);
    }
  }, [activeFilters]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

 const fetchSuggestions = async (text) => {
  if (!text) {
    setSuggestions([]);
    return;
  }

  const baseUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(text)}.json`;
  const params = new URLSearchParams({
    key: MAPTILER_API_KEY,
    language: "sr",
    country: "RS",
    limit: "5",
    types: "poi", // Limit to points of interest
  });

  if (userLocation) {
    params.append("proximity", `${userLocation.lng},${userLocation.lat}`);
  }

  try {
    const res = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await res.json();

    const enriched = data.features.map((feature) => {
      if (userLocation) {
        const [lng, lat] = feature.geometry.coordinates;
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          lat,
          lng
        );
        return { ...feature, distance };
      }
      return feature;
    });

    setSuggestions(enriched);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    setSuggestions([]);
  }
};


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(
        query
      )}.json?key=${MAPTILER_API_KEY}&limit=1&country=RS`
    );

    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      alert("Location not found.");
      return;
    }

    const [lng, lat] = data.features[0].geometry.coordinates;

    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: 14,
      speed: 1.2,
    });

    if (markerRef.current) markerRef.current.remove();

    markerRef.current = new maplibregl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    setSuggestions([]);
  };

  const handleSuggestionClick = (feature) => {
    const [lng, lat] = feature.geometry.coordinates;

    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: 14,
      speed: 1.2,
    });

    if (markerRef.current) markerRef.current.remove();

    markerRef.current = new maplibregl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    setQuery(feature.place_name);
    setSuggestions([]);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

 return (
  <div className="main-div">
    {/* Top-left row controls: Search + Filter */}
    <div className="top-row-controls">
      <form onSubmit={handleSearch} className="form-style" autoComplete="off">
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);

            if (debounceTimer) clearTimeout(debounceTimer);
            const timer = setTimeout(() => {
              fetchSuggestions(value);
            }, 300);
            setDebounceTimer(timer);
          }}
          placeholder="Pretraži..."
        />
        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <SuggestionsUl className="suggestions-dropdown">
            {suggestions.map((sug) => (
              <SuggestionsLi
                key={`${sug.id}-${sug.place_name}`}
                onClick={() => handleSuggestionClick(sug)}
              >
                <div>{sug.place_name}</div>
                {sug.distance && (
                  <small className="kilometers-away">
                    {sug.distance.toFixed(2)} km udaljeno
                  </small>
                )}
              </SuggestionsLi>
            ))}
          </SuggestionsUl>
        )}
      </form>

      {/* Filter dropdown */}
      <div className="filter-wrapper">
        <FilterDropdown
          allTypes={allTypes}
          activeFilters={activeFilters}
          onApply={(filters) => setActiveFilters(filters)}
        />
      </div>
    </div>

    {/* Map itself */}
    <div ref={mapContainer} style={{ flexGrow: 1, height: "100vh" }} />
  </div>
);


};

export default Map;
