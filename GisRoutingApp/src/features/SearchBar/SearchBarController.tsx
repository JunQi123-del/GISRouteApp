import type maplibregl from 'maplibre-gl';
import styles from '@/features/SearchBar/searchBar.module.css'

export class SearchBarController implements maplibregl.IControl{

    private container!:HTMLDivElement


    onAdd(): HTMLElement {
        this.container = document.createElement('div')
        this.container.className = `maplibregl-ctrl ${styles.container}`

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search location...';
        input.className = styles.input;

        this.container.appendChild(input)
        return this.container
    }
    onRemove(): void {
        this.container.remove();


    }


    


}