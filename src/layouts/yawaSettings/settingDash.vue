<template >
  <q-layout class="bg">
    <q-page-container >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  beforeCreate () {
    const presentRoute = this.$route.name
    // console.log(presentRoute)
    if (presentRoute === 'settings') {
      this.$router.push('/settings/profile')
    } else {

    }
  }
}
</script>

<style>
.bg {
  background-image: url('/statics/svgBG/jie1.png');
  background-size: cover;
}
</style>
