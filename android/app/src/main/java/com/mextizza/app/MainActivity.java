package com.mextizza.app;

import android.content.Intent;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;

import ee.forgr.capacitor.social.login.GoogleProvider;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

/*
 * El login de Google en la app va por la pantalla nativa de Android: dentro de
 * un WebView, Google bloquea su propia pagina de acceso. El plugin
 * @capgo/capacitor-social-login necesita que esta actividad le reenvie el
 * resultado de esa pantalla; asi lo pide su guia de instalacion para Android.
 */
public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    if (requestCode >= GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MIN
        && requestCode < GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MAX) {
      PluginHandle pluginHandle = getBridge().getPlugin("SocialLogin");
      if (pluginHandle == null) {
        Log.i("Google Activity Result", "SocialLogin login handle is null");
        return;
      }
      Plugin plugin = pluginHandle.getInstance();
      if (!(plugin instanceof SocialLoginPlugin)) {
        Log.i("Google Activity Result", "SocialLogin plugin instance is not SocialLoginPlugin");
        return;
      }
      ((SocialLoginPlugin) plugin).handleGoogleLoginIntent(requestCode, data);
    }
  }

  // La marca que el plugin busca para saber que esta actividad ya se adapto.
  public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {}
}
