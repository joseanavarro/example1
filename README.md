This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start mySideMenu sidemenu
```

Then, to run it, cd into `mySideMenu` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.


#########################################################################################################
#################  CAMBIOS MANUALES DESPUÉS DE CLONAR  ##################################################
#########################################################################################################

* Parche provisional para solucionar problemas de Build por añadido a saco que ha hecho Google en la
  herramientas de Android (5 Marzo 2018):

   en ‘platforms/android/build.gradle’ incluir lo siguiente justo antes de 'allprojects {'

        // Parche para resolver cambios de rutptura en Android support
        configurations.all {
            resolutionStrategy.force 'com.android.support:support-v4:26.0.0'
        }

    Incluir también esto:

        dependencies {
        classpath 'com.android.tools.build:gradle:2.3.0'
      }


* Configurar Crosswalk para que se pueda ejecutar sin problemas tanto en todo tipo de móviles como en
  el emulador:

  https://www.evernote.com/l/ACohsRnJQShEm78teoqvm3FDHWHr0tPosTs


* Copiar carpeta 'src/assets/js/krpano' si no está ya copiada.