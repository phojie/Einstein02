<template>
  <q-page class="flex flex-center">
    test
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  beforeCreate () {
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
