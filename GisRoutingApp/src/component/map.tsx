import {useEffect , useRef} from 'react'
import maplibregl from 'maplibre-gl'

export default function Map(){
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<maplibregl.Map | null>(null)

    useEffect(()=>{
        if (map.current || !mapContainer.current) return

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=5lp75iO68NFWKlAsQR3c',
            center:[103.8198,1.3521],
            zoom:11,
        })

        // map.current.addControl(new maplibregl.NavigationControl())

        return () => {
            map.current?.remove()
            map.current = null
        }
    },[])

    return <div ref={mapContainer} style = {{width:'100vw',height:'100vh',display:'block',position:'absolute',top:0,left:0}}/>
}