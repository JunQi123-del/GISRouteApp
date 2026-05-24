import type maplibregl from 'maplibre-gl';

export interface MapPlugin {
    id: string;
    init: (map: maplibregl.Map) => void;
    destroy: (map: maplibregl.Map) => void;
}