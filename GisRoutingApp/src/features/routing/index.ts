import { registerPlugin } from '@/Util/pluginRegistry';
import type maplibregl from 'maplibre-gl';

registerPlugin({
    id: 'routing',

    init(map: maplibregl.Map) {
        map.on('load', () => {
            // Add your routing sources and layers here.
            // Example: map.addSource('route', { type: 'geojson', data: ... })
            //          map.addLayer({ id: 'route-line', type: 'line', source: 'route', ... })
            console.log('[routing] plugin initialised');
        });
    },

    destroy(map: maplibregl.Map) {
        // Clean up layers and sources added by this plugin.
        if (map.getLayer('route-line')) map.removeLayer('route-line');
        if (map.getSource('route')) map.removeSource('route');
        console.log('[routing] plugin destroyed');
    },
});