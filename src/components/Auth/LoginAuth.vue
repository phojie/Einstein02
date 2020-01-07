<template>
  <q-page class="full-height flex flex-center">
    <div class="column">
      <div class="text-center">
        <div style="font-size:45px" class="text-h4 text-weight-bolder">
          Personal<span class=text-green>gs.com</span>
        </div>
        <div class="q-mt-md text-grey text-subtitle2" style="letter-spacing: 2px;">SIGN IN</div>
      </div>

      <div class="q-mt-xl">
        <q-card>
          <div id="firebaseui-auth-container"></div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import firebase from 'firebase'
import { firebase } from 'boot/firebase'
import { fireUi } from 'boot/firebaseui'
export default {
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: 'image', // 'audio'
            size: 'normal', // 'invisible' or 'compact'
            badge: 'bottomleft' // ' bottomright' or 'inline' applies to invisible.
          },
          defaultCountry: 'PH' // Set default country to the United Kingdom (+44).
        }
      ]
    }

    fireUi.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>
