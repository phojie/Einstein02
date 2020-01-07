<template>
  <q-page
    padding
    class="row wrap justify-center items-start content-start"
  >
    <q-card
      class="bg-transparent"
      style="width:800px"
      flat
    >

      <q-card-section>
        <profile-form></profile-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>

export default {
  components: {
    'ProfileForm': require('components/Forms/settingsForm.vue').default
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
