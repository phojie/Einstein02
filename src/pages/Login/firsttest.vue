<template>
  <q-page
    padding
    class=" row wrap justify-center items-start content-start"
  >
    <q-card
      class=""
      style="width:800px"
      flat
    >
      <q-toolbar class="">
        <q-toolbar-title>Welcome to EinsTech Grading System</q-toolbar-title>
      </q-toolbar>
      <q-separator inset></q-separator>
      <q-card-section>
        <q-card>
          <q-banner
            dense
            class="text-primary"
          >
            <div class="text-subtitle2">Profile</div>
          </q-banner>
          <q-separator></q-separator>
          <q-card-section>
            <profile-form></profile-form>
          </q-card-section>
        </q-card>
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
