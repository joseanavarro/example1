import { AreaPano } from "../models/areaPano";
//********************************************************/
// Estructura que define un área de un tour
//********************************************************/
export class TourArea {
    id_area: string;
    id_visit: string;
    name: string;
    description: string;
    thumbnail: string;
    panos: AreaPano[];
}