<template>
  <q-page class="flex flex-center">
    <img
      height="180px"
      alt="Ckcm logo"
      src="/statics/jieIcons/apple-touch-icon-180x180.png"
    >
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  created () {
    if (this.$route.params.authyes === 'authSucr343wer5545') {
      this.$router.push({
        path: '/'
      })
    }
    let firstLogin = this.$route.meta.firstLogin
    const loginType = LocalStorage.getItem('FirstLogin')
    if (firstLogin && loginType) {
      this.$router.push({
        path: '/settings/profile',
        query: {
          redirect: 'firstAuth.php'
        }
      })
    }
  }
}
</script>
