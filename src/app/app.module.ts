import { HttpBackend, HttpClient, HttpClientModule, HttpXhrBackend } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from '@ionic-native/camera';
import { Device } from "@ionic-native/device";
import { Diagnostic } from '@ionic-native/diagnostic';
import { Dialogs } from '@ionic-native/dialogs';
import { Facebook } from "@ionic-native/facebook";
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Geolocation } from "@ionic-native/geolocation";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ImageResizer } from '@ionic-native/image-resizer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Insomnia } from '@ionic-native/insomnia';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { NativeStorage } from "@ionic-native/native-storage";
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SplashScreen } from "@ionic-native/splash-screen";
import { SQLite } from "@ionic-native/sqlite";
import { StatusBar } from "@ionic-native/status-bar";
import { Toast } from "@ionic-native/toast";
// Idiomas
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import { CacheModule } from "ionic-cache";
import { NativeHttpBackend, NativeHttpFallback, NativeHttpModule } from 'ionic-native-http-connection-backend';
import { LoggerModule } from "ngx-logger";
// Módulos propios
import { ComponentsModule } from "../components/components.module";
import { ConfigPage } from "../pages/config/config";
// Páginas
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { LocationPage } from "../pages/location/location";
import { WelcomePage } from "../pages/welcome/welcome";
import { PipesModule } from "../pipes/pipes.module";
import { AppConstants } from "../providers/app-constants/app-constants";
import { AreasProvider } from '../providers/areas/areas';
import { CameraApiProvider } from '../providers/camera-api/camera-api';
import { CameraProvider } from '../providers/camera/camera';
import { DatabaseService } from "../providers/database-service/database-service";
import { EstadoProvider } from '../providers/estado/estado';
import { FacebookLoginService } from "../providers/facebook-login/facebook-login";
import { GeoProvider } from '../providers/geo/geo';
// Providers propios
import { Globals } from "../providers/globals/globals";
import { LoadingProvider } from '../providers/loading/loading';
import { Logger } from "../providers/logger/logger";
import { LoginService } from "../providers/login-service/login-service";
import { Login } from "../providers/login/login";
import { MenuProvider } from "../providers/menu/menu";
import { PaginationProvider } from '../providers/pagination/pagination';
import { PlatformProvider } from '../providers/platform/platform';
import { RestApiProvider } from "../providers/rest-api/rest-api";
import { ShareLocationProvider } from '../providers/share-location/share-location';
import { TourUtilProvider } from '../providers/tour-util/tour-util';
import { User } from "../providers/user/user";
import { UtilProvider } from "../providers/util/util";
import { MyApp } from "./app.component";



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LocationPage,
    ConfigPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    NativeHttpModule,
    FormsModule,
    ComponentsModule,
    PipesModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LoggerModule.forRoot({
      serverLoggingUrl: AppConstants.SERVER_LOG_URL,
      level: AppConstants.LOG_LEVEL,
      serverLogLevel: AppConstants.SERVER_LOG_LEVEL
    }),
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LocationPage,
    ConfigPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Globals,
    Logger,
    Device,
    AppConstants,
    Geolocation,
    MenuProvider,
    User,
    SQLite,
    Toast,
    DatabaseService,
    Login,
    FacebookLoginService,
    NativeStorage,
    Facebook,
    LoginService,
    RestApiProvider,
    UtilProvider,
    PaginationProvider,
    PaginationProvider,
    Insomnia,
    SocialSharing,
    GoogleAnalytics,
    GeoProvider,
    Camera,
    PhotoLibrary,
    File,
    CameraProvider,
    CameraApiProvider,
    FileTransfer,
    Diagnostic,
    SpinnerDialog,
    Dialogs,
    TourUtilProvider,
    ImageResizer,
    NativeGeocoder,
    PlatformProvider,
    EstadoProvider,
    ShareLocationProvider,
    AreasProvider,
    InAppBrowser,
    OpenNativeSettings,
    { provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend] },
    LoadingProvider,
    LocalNotifications
  ]
})
export class AppModule { }
