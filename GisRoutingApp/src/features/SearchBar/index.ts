import { registerPlugin } from '@/Util/pluginRegistry';
import { SearchBarController } from '@/features/SearchBar/SearchBarController';
import type maplibregl from 'maplibre-gl';

let control: SearchBarController | null = null;

registerPlugin({
    id: 'SearchBar',

    init(map: maplibregl.Map) {
        control = new SearchBarController();
        map.addControl(control, 'top-left');
    },

    destroy(map: maplibregl.Map) {
        // Clean up layers and sources added by this plugin.
        if (control) {
            map.removeControl(control);
            control = null;
        }
    },
});