<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { fireAuth } from 'boot/firebase'
import { mapActions } from 'vuex'
import { QSpinnerFacebook } from 'quasar'
export default {
  name: 'App',
  data () {
    return {
      loadingFire: false
    }
  },
  methods: {
    ...mapActions('admin', ['getFireDetails', 'getClassLists'])
  },
  beforeMount () {
    let vm = this
    this.getClassLists()
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'primary',
      backgroundColor: 'transparent'
    })
    fireAuth.onAuthStateChanged(function (user) {
      if (user) {
        vm.$q.loading.hide()
        vm.loadingFire = true
        vm.getFireDetails(user.uid)
      } else {
        vm.loadingFire = true
        vm.$q.loading.hide()
        // force logout
        // vm.$router.push('/auth')
      }
    })
  }
}
</script>
