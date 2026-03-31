import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

const STATIONS = [
  { name: 'Costco Auburn', lat: -33.8495, lng: 151.0325, price: 169.9, brand: 'Costco', address: '2 Parramatta Rd, Auburn' },
  { name: '7-Eleven Granville', lat: -33.8332, lng: 151.0122, price: 174.5, brand: '7-Eleven', address: '45 Woodville Rd, Granville' },
  { name: 'Metro Smithfield', lat: -33.8519, lng: 150.9431, price: 175.2, brand: 'Metro', address: '112 Cumberland Hwy, Smithfield' },
  { name: 'Shell Parramatta', lat: -33.8151, lng: 151.0012, price: 181.7, brand: 'Shell', address: '88 Church St, Parramatta' },
  { name: 'BP Penrith', lat: -33.7507, lng: 150.6945, price: 185.3, brand: 'BP', address: '15 High St, Penrith' },
  { name: 'Ampol Bankstown', lat: -33.9192, lng: 151.0354, price: 178.9, brand: 'Ampol', address: '223 Canterbury Rd, Bankstown' },
  { name: 'United Liverpool', lat: -33.9208, lng: 150.9256, price: 176.4, brand: 'United', address: '45 Hume Hwy, Liverpool' },
  { name: 'Coles Express Strathfield', lat: -33.8723, lng: 151.0841, price: 183.2, brand: 'Coles Express', address: '90 Parramatta Rd, Strathfield' },
];

function getMarkerColor(price: number): string {
  if (price < 175) return '#22c55e';
  if (price < 182) return '#eab308';
  return '#ef4444';
}

const FuelMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    let map: any;

    const initMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      map = L.map(mapRef.current!, {
        center: [-33.8688, 151.2093],
        zoom: 11,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      STATIONS.forEach((s) => {
        const color = getMarkerColor(s.price);
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 6px ${color}"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        });

        L.marker([s.lat, s.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:'DM Sans',sans-serif;color:#0a0e1a;min-width:160px">
              <strong>${s.name}</strong><br/>
              <span style="color:#666">${s.brand}</span><br/>
              <span style="color:#666;font-size:12px">${s.address}</span><br/>
              <span style="font-family:'JetBrains Mono',monospace;color:#f97316;font-size:18px;font-weight:700">${s.price.toFixed(1)}¢/L</span>
            </div>
          `);
      });

      setMapLoaded(true);
    };

    initMap();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
        Fuel Station Map — Sydney
      </h2>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>

      <div className="flex gap-4 mb-4 text-sm">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-success inline-block"></span> Cheap (&lt;175¢)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span> Mid (175–182¢)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-destructive inline-block"></span> Expensive (&gt;182¢)</span>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-border" style={{ height: '480px' }}>
        {!mapLoaded && (
          <div className="absolute inset-0 bg-card flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading map...</div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" aria-label="Interactive fuel station map of Sydney Australia" />
      </div>
    </section>
  );
};

export default FuelMap;
