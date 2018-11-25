import { EventEmitter, Injectable } from '@angular/core';
import { TourData } from '../../models/tourData';

/*
  Compartir datos de localización cuando se edita, se pasa el dato hacia la página
  que llamó a la página de edición de localización
*/
@Injectable()
export class ShareLocationProvider {

  public sharedData: TourData;
  valueChanged: EventEmitter<TourData> = new EventEmitter();

  constructor() {
  }

  sendData(newData: TourData) {
    this.sharedData = newData
    this.valueChanged.emit(this.sharedData)
  }

}
