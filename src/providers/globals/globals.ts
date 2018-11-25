import { Injectable } from "@angular/core";
import { Logins } from "../../models/logins";
import { Position } from "../../models/position";

@Injectable()
export class Globals {
  alt: number;
  batteryLevel: number;
  cameraConnected: boolean;
  cameraConnecting: boolean;
  cameraWifi: string;
  camSession: any;
  camModel: string;
  cfgDelCameraFoto: boolean; // Opción de configuración - Borrar foto en cámara después de descargarla
  cfgGetLocation: boolean; // Guardar localización de los tours
  cfgSaveToExternal: boolean; // Guardar la fotos en almacenamiento externo
  delTourAfterPub: boolean;
  wifiCon: boolean; // Conectar con wifi de la cámara desde la app
  filter: string;
  forcedLang: string;
  hdr: boolean;
  isLogged: boolean;
  lang: string;
  lat: number;
  loading: any;
  location: Position = new Position();
  loggedUser: Logins = new Logins();
  lon: number;
  makingTour: boolean;
  newPhotos: boolean;
  panoNum: number;
  photoId: any;
  photoName: string;
  stopAllTasks: boolean;
  takingPhoto: boolean;
  idTask: string;
  token: string;
  tourId: Number;
  tourNum: number;
  tourTitle: string;
  uploadingPhotos: boolean;
  viewUserId: number;
}
