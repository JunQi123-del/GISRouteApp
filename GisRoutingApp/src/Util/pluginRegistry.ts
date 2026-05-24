import type maplibregl from 'maplibre-gl';
import type { MapPlugin } from './types';

const plugins: MapPlugin[] = [];

export const registerPlugin = (plugin: MapPlugin): void => {
    if (plugins.find(p => p.id === plugin.id)) {
        console.warn(`Plugin "${plugin.id}" is already registered.`);
        return;
    }
    plugins.push(plugin);
};

export const initPlugins = (map: maplibregl.Map): void => {
    plugins.forEach(p => p.init(map));
};

export const destroyPlugins = (map: maplibregl.Map): void => {
    plugins.forEach(p => p.destroy(map));
};