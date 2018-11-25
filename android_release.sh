sudo ionic cordova build android --prod
read -p "Geenerar para publicar"
sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore vtep360-release-keystore.keystore platforms/android/build/outputs/apk/android-armv7-debug.apk vtep360 -storepass 1hk16cf6 -keypass 1hk16cf6
read -p "Firmada versión arm [Enter] Continuar..."
sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore vtep360-release-keystore.keystore platforms/android/build/outputs/apk/android-x86-debug.apk vtep360 -storepass 1hk16cf6 -keypass 1hk16cf6
read -p "Firmada versión x86 [Enter] Continuar..."
sudo /Users/josea.navarro/Library/Android/sdk/build-tools/26.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk releases/walk2view.crosswalk.arm.apk
read -p "Comprimida versión arm [Enter] Continuar..."
sudo /Users/josea.navarro/Library/Android/sdk/build-tools/26.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-x86-release-unsigned.apk releases/walk2view.crosswalk.x86.apk
read -p "Comprimida versión x86 -> Resultado en directorio 'releases'. [Enter] Finalizar..."
