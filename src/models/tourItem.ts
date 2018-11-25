//******************************************************/
// Estructura que define un item en un listado de tours
//******************************************************/
export class TourItem {
  id: string;
  title: string;
  description: string;
  lat: number;
  lon: number;
  distance: number;
  thumbnail: string;
  id_pano: string;
  userId: string;
  country: string;
  province: string;
  city: string;
  phone: string;
  address: string;
  likes: number;
  visualizaciones: number;
  total_comentarios: number;
  nombre: string;
  apellidos: string;
  creation: string;
  liked: boolean;
  can_edit: boolean;
}
