import {useEffect , useRef,useState} from 'react'
import maplibregl from 'maplibre-gl'
import styles from './mapType.module.css'

export default function Map(){
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<maplibregl.Map | null>(null)
    const [isSatellite, setIsSatellite] = useState(false)

    const STYLES = {
     streets: 'https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_API_KEY_HERE',
        satellite: 'https://api.maptiler.com/maps/hybrid/style.json?key=YOUR_API_KEY_HERE',
    }

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

    const toggleStyle = () => {
        if (!map.current) return
        const newStyle = isSatellite ? STYLES.streets : STYLES.satellite
        map.current.setStyle(newStyle)
        setIsSatellite(!isSatellite)
    }

    return (
        <div className={styles.container}>
            <div ref={mapContainer} className={styles.mapDiv}/>
            <button onClick={toggleStyle} className={styles.toggleButton}>
                {isSatellite ? 'streets':'satellite'}
            </button>

        </div>
    )
    // return <div ref={mapContainer} style = {{width:'100vw',height:'100vh',display:'block',position:'absolute',top:0,left:0}}/>
}