//******************************************************/
// Estructura que define un item en un listado de rutas
//******************************************************/
export class RouteItem {
  id: string;
  title: string;
  description: string;
  lat: number;
  lon: number;
  zoom: number;
  thumbnail: string;
  country: string;
  province: string;
  city: string;
  lastUpdated: string;
}
