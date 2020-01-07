<template >
  <q-page class="row">
    <div class="col-md-6 gt-sm">
      <landing-design></landing-design>
    </div>

    <div class="col-md-6 col-sm-12 col-xs-12">
      <login-auth></login-auth>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'LoginAuth': require('components/Auth/LoginAuth.vue').default,
    'LandingDesign': require('components/Landing/landingDesign.vue').default
  },
  computed: {
    ...mapGetters('admin', ['userDetails'])
  },
  methods: {
    ...mapActions('admin', ['handleAuthStateChanged'])
  },
  mounted () {
    this.handleAuthStateChanged()
  }
}
</script>
