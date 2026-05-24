import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import styles from './mapType.module.css';
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@maptiler/geocoding-control/style.css';
import { MAPTILER_API_KEY } from '@/Util/constants';
import { initPlugins, destroyPlugins } from '@/Util/pluginRegistry';

// Import each feature plugin — teammates add new imports here, nothing else changes
import '@/features/routing';

const STYLES = {
    streets: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_API_KEY}`,
    satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`,
};

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [isSatellite, setIsSatellite] = useState(false);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: STYLES.streets,
            center: [103.8198, 1.3521],
            zoom: 12,
        });

        map.current.addControl(new maplibregl.NavigationControl());

        map.current.addControl(new GeocodingControl({ apiKey: MAPTILER_API_KEY }));

        initPlugins(map.current);

        return () => {
            if (map.current) {
                destroyPlugins(map.current);
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    const toggleStyle = () => {
        if (!map.current) return;
        const newStyle = isSatellite ? STYLES.streets : STYLES.satellite;
        map.current.setStyle(newStyle);
        setIsSatellite(prev => !prev);
    };

    return (
        <div className={styles.container}>
            <div ref={mapContainer} className={styles.mapDiv} />
            <button onClick={toggleStyle} className={styles.toggleButton}>
                {isSatellite ? 'streets' : 'satellite'}
            </button>
        </div>
    );
}