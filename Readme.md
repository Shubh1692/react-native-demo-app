keytool -genkey -v -keystore F:/WebProjects/ReactNative/testapp.keystore -alias com.shubh.testapp -keyalg RSA -keysize 2048 -validity 10000

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore F:/WebProjects/ReactNative/testapp.keystore D:\Web_Project\Ionic2\my-lib-app\platforms\android\build\outputs\apk\android-release-unsigned.apk com.softbox.mylib