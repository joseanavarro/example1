import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { TranslateService } from "@ngx-translate/core";
import 'rxjs/add/operator/map';
import { geoAddress } from "../../models/geoAddress";
import { Position } from "../../models/position";
import { TourItem } from "../../models/tourItem";
import { AppConstants } from '../../providers/app-constants/app-constants';
import { Globals } from "../../providers/globals/globals";
import { Logger } from "../../providers/logger/logger";
import { UtilProvider } from "../../providers/util/util";

@Injectable()
export class GeoProvider {
  logt: string;
  ti: string;
  locationUnknownTxt: string;
  public pos: Position = new Position();

  constructor(
    public http: Http,
    public translate: TranslateService,
    public logger: Logger,
    public nativeGeocoder: NativeGeocoder,
    public geo: Geolocation,
    public globals: Globals,
    public util: UtilProvider
  ) {
    this.logt = "GeoProvider";
    this.translate.get("unknown_location").subscribe(value => {
      this.locationUnknownTxt = value;
    });

  }

  /** 
   * Encontrar localización 
   *  
   * @returns {Promise<any>} 
   * @memberof UtilProvider
   */
  findLocation(): Promise<any> {
    this.ti = this.logt + "findLocation";
    return new Promise((resolve, reject) => {
      this.ti = this.logt + "findLocation";
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.geo.getCurrentPosition(options).then((position) => {
        this.logger.debug(this.ti, "Coordenadas encontradas: ", position.coords.latitude + ", " + position.coords.longitude);
        this.pos.latitude = position.coords.latitude;
        this.pos.longitude = position.coords.longitude;
        if (position.coords.altitude === null) {
          this.pos.altitude = 0;
        } else {
          this.pos.altitude = position.coords.altitude;
        }
        this.pos.heading = position.coords.heading;
        resolve(this.pos);
      }).catch((error) => {
        if (AppConstants.DEBUG_MODE) {
          this.pos.latitude = 37.17393343862033;
          this.pos.longitude = -3.6000204383344685;
          this.pos.altitude = 10.0;
          this.pos.heading = 90.0;
          this.logger.debug(this.ti, "Coordenadas modo debug: ", this.pos.latitude + ", " + this.pos.longitude);
          resolve(this.pos);
        } else {
          reject(error);
        }
      });
    });
  }

  /**
 * Obtener el nombre correcto de la ubicación del panorama
 *
 * @param {TourItem} item
 * @returns {string}
 * @memberof UtilProvider
 */
  getLocationName(item: TourItem): string {
    let locName: string = "";
    let city: string = "";
    //this.ti = this.logt + "getLocationName";

    if (item.city === "" && item.province === "" && item.country === "") {
      // Ubicación desconocida
      this.translate.get("unknown_location").subscribe(value => {
        locName = value;
      });
    } else {
      if (item.city === item.province) {
        // Capital de provincia
        if (item.city !== "") {
          city = item.city;
        }
      } else {
        // Otra población de la provincia
        if (item.city !== "") {
          city = item.city;
          if (item.province !== "") {
            city += ", " + item.province;
          }
        }
      }
      if (city !== "") {
        if (item.country !== "") {
          locName = city + ", " + item.country;
        } else {
          locName = city;
        }
      } else {
        if (item.country !== "") {
          locName = item.country;
        } else {
          this.translate.get("unknown_location").subscribe(value => {
            locName = value;
          });
        }
      }
    }
    //this.logger.debug(this.ti, "Ubicación: ", locName);
    return locName;
  }

  /**
  * Obtener las coordenadas a partir de una dirección postal
  * Método nativo
  * 
  * @param {string} address 
  * @returns {Promise<any>} 
  * @memberof GeoProvider
  */
  // n_geoCoding(address: string): Promise<any> {
  //   this.ti = this.logt + "geoCoding";
  //   let retPosition: Position = new Position;

  //   return new Promise<Position>((resolve, reject) => {
  //     this.nativeGeocoder.forwardGeocode(address)
  //       .then((coordinates: NativeGeocoderForwardResult) => {
  //         this.logger.debug(this.ti, 'lat =' + coordinates.latitude + ' lon =' + coordinates.longitude);
  //         retPosition.latitude = Number(coordinates.latitude);
  //         retPosition.longitude = Number(coordinates.longitude);
  //         resolve(retPosition);
  //       })
  //       .catch((error: any) => {
  //         this.logger.error(this.ti, "Respuesta erronea de Geocoding recibida: " + error);
  //         reject();
  //       });
  //   })

  // }

  /**
   * Método google
   *
   * @param {string} address
   * @returns {Promise<any>}
   * @memberof GeoProvider
   */
  geoCoding(address: string): Promise<any> {
    let geoCodingUrl: string;
    let searchText: string = address.replace(/\s/g, '+');
    let ti = this.logt + "geoCoding";
    let retPosition: Position = new Position;

    geoCodingUrl =
      AppConstants.GOOGLE_GEOCODING_API_URL +
      `?address=${searchText}&key=${AppConstants.GOOGLE_API_KEY}&sensor=false`;

    this.logger.debug(ti, "geoCodingUrl: " + geoCodingUrl);

    return new Promise<Position>((resolve, reject) => {
      //------------------------------------------
      // Realizar llamada al API de autenticación
      //------------------------------------------
      this.http.get(geoCodingUrl).subscribe(
        data => {
          let status = data.json().status;
          //--------------------------------------------
          // Comprobar si se recibe un dato correcto
          //--------------------------------------------
          if (status === 'OK') {
            // Resultado recibido, mostrar mapa del resultado
            let resp = data.json().results[0];
            this.logger.debug(ti, "Respuesta Geocoding recibida, lat: " + resp.geometry.location.lat + ", lon: " + resp.geometry.location.lng);
            retPosition.latitude = resp.geometry.location.lat;
            retPosition.longitude = resp.geometry.location.lng;
            resolve(retPosition);
          } else {
            // No se han recibido resultados, mostrar ventana emergente
            this.logger.error(ti, "Respuesta erronea de Geocoding recibida: " + status);
            reject();
          }
        },
        err => {
          //------------------------------------------
          // Error al solicitar el perfil del usuario
          //------------------------------------------
          //this.presentAlert(this.inputErrorTitle, this.inputErrorText, this.closeButton);
          this.logger.error(ti, "Error en petición HTTP", JSON.stringify(err));
          reject(err);
        })
    })
  }

  /**
   * Método OSM (Open Street Maps)
   *
   * @param {string} address
   * @returns {Promise<any>}
   * @memberof GeoProvider
   */
  osm_geoCoding(address: string): Promise<any> {
    let geoCodingUrl: string;
    let searchText: string = address.replace(/\s/g, '+');
    let ti = this.logt + "geoCoding";
    let retPosition: Position = new Position;

    geoCodingUrl =
      AppConstants.OSM_GEOCODING_API_URL +
      `search?q=${searchText}&format=json&addressdetails=1&accept-language=${this.globals.lang}`;

    this.logger.debug(ti, "geoCodingUrl: " + geoCodingUrl);

    return new Promise<Position>((resolve, reject) => {
      //------------------------------------------
      // Realizar llamada al API de autenticación
      //------------------------------------------
      this.http.get(geoCodingUrl).subscribe(
        data => {
          // data.json()[0].address  ---  dirección obtenida, no es muy precisa con el formato natural
          // de dirección que la genet puede introducir en el cajón de búsqueda: calle bla 29, ciudadbla
          // aquí hay que pasárselo como 29+bla+ciudadbla, lo que requiere un procesado previo,
          // pare esto mejor usar el método de Google

          // let status = data.json().status;
          // //--------------------------------------------
          // // Comprobar si se recibe un dato correcto
          // //--------------------------------------------
          // if (status === 'OK') {
          //   // Resultado recibido, mostrar mapa del resultado
          //   let resp = data.json().results[0];
          //   this.logger.debug(ti, "Respuesta Geocoding recibida, lat: " + resp.geometry.location.lat + ", lon: " + resp.geometry.location.lng);
          //   retPosition.latitude = resp.geometry.location.lat;
          //   retPosition.longitude = resp.geometry.location.lng;
          //   resolve(retPosition);
          // } else {
          //   // No se han recibido resultados, mostrar ventana emergente
          //   this.logger.error(ti, "Respuesta erronea de Geocoding recibida: " + status);
          //   reject();
          // }
        },
        err => {
          //------------------------------------------
          // Error al solicitar el perfil del usuario
          //------------------------------------------
          //this.presentAlert(this.inputErrorTitle, this.inputErrorText, this.closeButton);
          this.logger.error(ti, "Error en petición HTTP", JSON.stringify(err));
          reject(err);
        })
    })
  }

  /**
   * método nativo
   *
   * @param {number} lat
   * @param {number} lng
   * @returns {Promise<any>}
   * @memberof GeoProvider
   */
  // n_reverseGeoCoding(lat: number, lng: number): Promise<any> {
  //   this.ti = this.logt + "reverseGeoCoding";
  //   return new Promise((resolve, reject) => {
  //     this.nativeGeocoder.reverseGeocode(lat, lng)
  //       .then((result: NativeGeocoderReverseResult) => {
  //         let str: string = `${result.subLocality}, ${result.locality}, ${result.countryCode}`;
  //         this.logger.debug(this.ti, str);
  //         resolve(str);
  //       })
  //       .catch((error: any) => {
  //         this.logger.error(this.ti, "Respuesta erronea de Geocoding recibida: " + error);
  //         reject(error);
  //       });
  //   });
  // }

  /**
 * método mixto, primero prueba un método, si no funciona prueba con otro
 *
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<any>}
 * @memberof GeoProvider
 */
  reverseGeoCoding(lat: number, lng: number): Promise<any> {
    this.ti = this.logt + "reverseGeoCoding";
    return new Promise((resolve, reject) => {
      this.g_reverseGeoCoding(lat, lng)
        .then((result) => {
          this.logger.debug(this.ti, result);
          resolve(result);
        })
        .catch((error: any) => {
          this.o_reverseGeoCoding(lat, lng)
            .then((result) => {
              this.logger.debug(this.ti, result);
              resolve(result);
            })
            .catch((error: any) => {
              this.logger.error(this.ti, "Respuesta erronea de Geocoding recibida: " + error);
              reject(error);
            });
        });
    });
  }

  /**
   * Obtener dirección a partir de latitud y longitud
   * método google
   * 
   * @param {number} lat 
   * @param {number} lon 
   * @returns {Promise<any>} 
   * @memberof GeoProvider
   */
  g_reverseGeoCoding(lat: number, lon: number): Promise<any> {
    let geoCodingUrl: string;
    let ti = this.logt + "reverseGeoCoding";
    let textAddress: geoAddress = new geoAddress();

    geoCodingUrl =
      AppConstants.GOOGLE_GEOCODING_API_URL +
      `?key=${AppConstants.GOOGLE_API_KEY}&sensor=false&latlng=${lat.toString()},${lon.toString()}`;

    this.logger.debug(ti, "geoCodingUrl: " + geoCodingUrl);

    return new Promise<geoAddress>((resolve, reject) => {
      //------------------------------------------
      // Realizar llamada al API de autenticación
      //------------------------------------------
      this.http.get(geoCodingUrl).subscribe(
        data => {
          let status = data.json().status;
          //--------------------------------------------
          // Comprobar si se recibe un dato correcto
          //--------------------------------------------
          if (status === 'OK') {
            // Resultado recibido, mostrar mapa del resultado
            let resp = data.json().results[0];
            textAddress.location = resp.formatted_address;
            for (var i = 0; i < resp.address_components.length; i++) {
              var component = resp.address_components[i];
              if (component.types[0] == "postal_code") {
                textAddress.postalCode = component.long_name;
              } else if (component.types[0] == "street_number") {
                textAddress.street = component.long_name;
              } else if (component.types[0] == "route") {
                if (textAddress.street !== "") {
                  textAddress.street = component.long_name + ", " + textAddress.street;
                } else {
                  textAddress.street = component.long_name;
                }
              } else if (component.types[0] == "neighborhood") {
                if (textAddress.street !== "") {
                  textAddress.street = component.long_name + ", " + textAddress.street;
                } else {
                  textAddress.street = component.long_name;
                }
              } else if (component.types[0] == "locality") {
                textAddress.City = component.long_name;
              } else if (component.types[0] == "country") {
                textAddress.Country = component.long_name;
              }
            }
            resolve(textAddress);
          } else {
            this.logger.error(ti, "Respuesta erronea de Geocoding recibida");
            textAddress = this.setLocationUnknown();
            reject(textAddress);
          }
        },
        err => {
          this.logger.error(ti, "Respuesta erronea de Geocoding recibida");
          textAddress = this.setLocationUnknown();
          reject(textAddress);
        })
    })
  }

  /**
  * Obtener dirección a partir de latitud y longitud
  * método OSM
  * 
  * @param {number} lat 
  * @param {number} lon 
  * @returns {Promise<any>} 
  * @memberof GeoProvider
  */
  o_reverseGeoCoding(lat: number, lon: number): Promise<any> {
    let geoCodingUrl: string;
    let ti = this.logt + "reverseGeoCoding";
    let textAddress: geoAddress = new geoAddress();

    geoCodingUrl =
      AppConstants.OSM_GEOCODING_API_URL +
      `reverse?format=json&lat=${lat.toString()}&lon=${lon.toString()}&zoom=18&addressdetails=1&accept-language=${this.globals.lang}&extratags=0`;

    this.logger.debug(ti, "geoCodingUrl: " + geoCodingUrl);

    return new Promise<geoAddress>((resolve, reject) => {
      //------------------------------------------
      // Realizar llamada al API de autenticación
      //------------------------------------------
      this.http.get(geoCodingUrl).subscribe(
        data => {
          let status = data.statusText;
          //--------------------------------------------
          // Comprobar si se recibe un dato correcto
          //--------------------------------------------
          if (status === 'OK') {
            // Resultado recibido, mostrar mapa del resultado
            let resp = data.json().address;
            textAddress.postalCode = this.util.getStr(resp.postcode);
            textAddress.street = this.util.getStr(resp.road);
            let stNumber: string = this.util.getStr(resp.house_number);
            if (stNumber !== "") {
              textAddress.street += " " + stNumber;
            }
            textAddress.City = this.util.getStr(resp.city);
            textAddress.Country = this.util.getStr(resp.country);
            textAddress.location = textAddress.street + ", " +
              textAddress.postalCode + " " + textAddress.City + ", " + textAddress.Country;

            resolve(textAddress);
          } else {
            this.logger.error(ti, "Respuesta erronea de Geocoding recibida");
            textAddress = this.setLocationUnknown();
            reject(textAddress);
          }
        },
        err => {
          this.logger.error(ti, "Respuesta erronea de Geocoding recibida");
          textAddress = this.setLocationUnknown();
          reject(textAddress);
        })
    })
  }

  /**
   * Generar ubicación desconocida
   * 
   * @returns {geoAddress} 
   * @memberof GeoProvider
   */
  setLocationUnknown(): geoAddress {
    let textAddress: geoAddress = new geoAddress();
    textAddress.location = this.locationUnknownTxt;
    textAddress.postalCode = "";
    textAddress.street = "";
    textAddress.City = "";
    textAddress.Country = "";
    return (textAddress);
  };

}