import { Injectable } from "@angular/core";

@Injectable()
export class AppConstants {
  public static DEBUG_MODE: boolean = false; // En debug mode se podrán falsear ciertos valores para pruebas
  // Niveles de log
  public static LOG_LEVEL_TRACE = 0;
  public static LOG_LEVEL_DEBUG = 1;
  public static LOG_LEVEL_INFO = 2;
  public static LOG_LEVEL_LOG = 3;
  public static LOG_LEVEL_WARN = 4;
  public static LOG_LEVEL_ERROR = 5;

  // Valores de configuración por aplicación  *** Recordar cambiarlos para cada versión de App
  public static APP_ID = "PanocasaPro";
  public static APP_VERS = "2.1.2";
  //public static PHOTO_FOLDER = "walk2view/";
  public static PHOTO_FOLDER = "";
  public static FACEBOOK_APP_ID = 299410627576531;
  public static FACEBOOK_APP_NAME = "Panocasa Pro";
  public static PORTAL_ID = "50";
  public static GOOGLE_ANALYTICS_TRACKING_ID = "UA-129384229-1";
  public static GOOGLE_API_KEY = "AIzaSyC_hDYkUq69rtXKVfZdiDbBOB9aAP58nE4";

  // Constantes globales
  // public static LOG_LEVEL = AppConstants.LOG_LEVEL_TRACE;
  public static LOG_LEVEL = AppConstants.LOG_LEVEL_ERROR;
  public static SERVER_LOG_LEVEL = AppConstants.LOG_LEVEL_ERROR;
  //public static SERVER_LOG_LEVEL = AppConstants.LOG_LEVEL_TRACE;
  public static APP_SERVER_URL = "http://app.walk2view.com/";
  public static WEB_SERVER_URL = "https://www.walk2view.com/";
  public static AUTH_API_URL = AppConstants.WEB_SERVER_URL + "login/api/";
  public static W2V_API_URL1 = AppConstants.APP_SERVER_URL + "app1/api/v1/";
  public static W2V_API_URL2 = AppConstants.APP_SERVER_URL + "app1/api/v2/";
  public static SERVER_LOG_URL = AppConstants.W2V_API_URL2 + "log"; // Para hacer log en base de datos remota
  public static REMEM_PASS_URL = AppConstants.WEB_SERVER_URL + "Login/ResetPassword.aspx";

  //public static SERVER_LOG_URL = AppConstants.W2V_API_URL2 + "logr";  // Para hacer log en fichero remoto, 
  // combinar con SERVER_LOG_LEVEL
  public static GET_TASK_ID_API = AppConstants.APP_SERVER_URL + 'admin/webservices/pub/gettaskid.aspx'
  public static UPLOAD_PANO_API = AppConstants.APP_SERVER_URL + 'admin/webservices/pub/uploadpano2c.aspx'
  public static UPLOAD_PANO_B_API = AppConstants.APP_SERVER_URL + 'admin/webservices/pub/uploadpano2b.aspx'
  public static PUBLISH_API = AppConstants.APP_SERVER_URL + 'admin/webservices/pub/publish2.aspx'
  public static THUMB_URL = AppConstants.APP_SERVER_URL + 'thumbnail-app.aspx?r='


  public static KRPANO_API = "http://app.walk2view.com/krpano";
  public static KRPANO_TEMPLATE = "-MFSG22LO_panocasacom.html?vr=true";
  public static SHARE_LINK = "https://www.walk2view.com/share/panocasa-@tourId@-es.html";
  //public static SHARE_LINK = "https://www.walk2view.com/share/h2v-@tourId@-es.html";
  public static VR_LINK = "https://www.walk2view.com/share/panocasa-@tourId@-es.html";
  public static GEO_LIST_SIZE = 40;
  public static GEO_KM_RAD_MAX = 8;  // Al buscar tours cercanos, radio máximo en Km en el que buscar
  public static HTTP_TIMEOUT = 8000;

  // URLs de APIs externas
  // https://maps.googleapis.com/maps/api/geocode/json?address=Mayor+23+Madrid&sensor=false&key=AIzaSy...AP58nE4
  public static GOOGLE_GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
  public static OSM_GEOCODING_API_URL = "https://nominatim.openstreetmap.org/";

  //Tipos de Login
  public static W2V_LOGIN = 1;
  public static W2V_LOGIN_URL = "login.aspx";
  public static FACEBOOK_LOGIN = 2;
  public static FACEBOOK_LOGIN_URL = "facebooklogin.aspx";

  // Conexión con la cámara
  public static CAMERA_API = "http://192.168.1.1:80/osc/";
  public static CAMERA_API_TEST = "http://192.168.1.43:4040/osc/";
  //--- para pruebas
  // -- Simulador local con node.js
  public static CAMERA_API1 = "http://localhost:4040/osc/";
  // -- Visto desde dentro del eulador
  public static CAMERA_API3 = "http://10.0.2.2:4040/osc/";
  // -- Visto desde dentro de Genymotion
  public static CAMERA_API4 = "http://192.168.1.42:4040/osc/";
  //public static CAMERA_API = "https://163ba402-c112-4b57-a924-9815cede9a8b.mock.pstmn.io/osc/";

  //Diferentes páginas de listado de tours
  public static PAGE_BEST = 1;
  public static PAGE_LAST = 2;
  public static PAGE_SEARCH = 3;

  // Tipos de ficheros leidos por imagePicker
  public static FILE_URI = 0;
  public static BASE64_STRING = 1;

  // Tipos de reporte
  public static REPORT_INADEQUATE = 1;
  public static REPORT_INCORRECT = 2;

  // Tipos de error para mostrar mensaje
  public static ERROR_NO_NEAR_PANOS = 1;
  public static ERROR_NO_LOCATION_FOUND = 2;
  public static ERROR_CONNECTION = 3;
  public static ERROR_CAMERA_ERROR = 'err_camera';
  public static ERROR_CAMERA_FW_NOT_OK = 'err_camera_fw_not_ok';
  public static ERROR_CAMERA_MODEL_NOT_OK = 'err_camera_model_not_ok';
  public static ERROR_NEW_CAMERA_WIFI_DETECTED = 'err_new_camera_wifi_detected';
  public static ERROR_CAMERA_NOT_OK = 'err_camera_not_ok';
  public static ERROR_CAMERA_THETA_WIFI_NOT_FOUND = 'err_camera_theta_wifi_not_found';
  public static ERROR_CAMERA_WIFI_CHECK_PASSWORD = 'err_camera_wifi_check_password';
  public static ERROR_CAMERA_WIFI_NOT_FOUND = 'err_camera_wifi_not_found';
  public static ERROR_CAMERA_WIFI_UNKNOWN_ERRROR = 'err_camera_wifi_unknown_error';
  public static ERROR_PHONE_WIFI_CAN_NOT_ACTIVATE = 'err_phone_wifi_can_not_activate';

  // Categorías de los eventos estadísticos SC = Statistics Category
  public static SC_CONNECTION = "Connection";
  public static SC_CONTENTS = "Contents";
  public static SC_LOCATION = "Location";
  public static SC_LOGIN = "Login";
  public static SC_TOUR = "Tour";
  public static SC_USER = "User";

  // Estados de publicación
  public static PANO_IN_CAMERA = 0;
  public static PANO_DOWNLOADED = 1;
  public static PANO_UPLOADED = 2;
  public static TOUR_CREATING = 0;
  public static TOUR_CREATED = 1;
  public static TOUR_DOWNLOADED = 2;
  public static TOUR_UPLOADED = 3;
  public static TOUR_PUBLISHED = 4;

  // estados de la aplicación
  public static ST_IDLE = 0;
  public static ST_CONNECTING_WIFI = 1;
  public static ST_CONNECTING_CAMERA = 2;
  public static ST_CAMERA_CONNECTED = 3;
  public static ST_CAMERA_DISCONNECTING = 4;
  public static ST_INIT_PUBLISH = 5;
  public static ST_PUBLISHING = 6;
  public static ST_DONE = 7;
  public static ST_PENDING = 8;
  public static ST_UPLOADING = 9;

  // Códigos de tareas
  public static TSK_INIT_PUB = 0;
  public static TSK_PANO = 1;
  public static TSK_END_PUB = 2;
  public static TSK_PUB_FINISHED = -1;

  // Tipos de panoramas
  public static PANO_INDOOR: "hdr";
  public static PANO_OUTDOOR: "off";

  // Estructura de la base de datos
  public static TABLE_OPTIONS = "Configuration";

  public static DB_CONFIG = {
    tables: [
      {
        name: "Trackview",
        columns: [
          {
            name: "tourid",
            type: "bigint PRIMARY KEY"
          }
        ]
      },
      {
        name: AppConstants.TABLE_OPTIONS,
        columns: [
          {
            name: "param",
            type: "text"
          },
          {
            name: "value",
            type: "text"
          }
        ]
      },
      {
        name: 'Tours',
        columns: [{
          name: 'tourid',
          type: 'int'
        },
        {
          name: 'panoid',
          type: 'int'
        },
        {
          name: 'name',
          type: 'text'
        },
        {
          name: 'pano',
          type: 'text'
        },
        {
          name: 'lat',
          type: 'text'
        },
        {
          name: 'lon',
          type: 'text'
        },
        {
          name: 'status',
          type: 'int'
        },
        {
          name: 'thumbnail',
          type: 'text'
        }
        ]
      },
      {
        name: 'TourData',
        columns: [{
          name: 'tourid',
          type: 'int'
        },
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'description',
          type: 'text'
        },
        {
          name: 'lat',
          type: 'text'
        },
        {
          name: 'lon',
          type: 'text'
        },
        {
          name: 'street',
          type: 'text'
        },
        {
          name: 'postal_code',
          type: 'text'
        },
        {
          name: 'city',
          type: 'text'
        },
        {
          name: 'country',
          type: 'text'
        }
        ]
      },
      {
        name: 'Tasklist',
        columns: [{
          name: 'taskid',
          type: 'text'
        },
        {
          name: 'plt_taskid',
          type: 'int'
        },
        {
          name: 'tasktype',
          type: 'int'
        },
        {
          name: 'tourid',
          type: 'int'
        },
        {
          name: 'panoid',
          type: 'int'
        },
        {
          name: 'name',
          type: 'text'
        },
        {
          name: 'pano',
          type: 'text'
        },
        {
          name: 'thumb',
          type: 'text'
        },
        {
          name: 'status',
          type: 'int'
        },
        {
          name: 'progress',
          type: 'text'
        }
        ]
      }
    ]
  };
}
