<template>
  <div class="flex flex-center">
    <q-form class="row wrap justify-between q-gutter-y-md">
      <div class="col-xs-12">
        <div class="text-subtitle2 q-pb-sm">Name</div>
        <div class="q-gutter-y-sm ">
          <q-input
            dense
            outlined
            class="text-capitalize"
            label="First Name"
            @input="setFirstname($event)"
            :value="informationData.firstname"
            :error="VALIDidProfile.firstname.$error"
          >
            <template
              v-slot:error
              v-if="!VALIDidProfile.firstname.required"
            >
              First Name is Required
            </template>
          </q-input>
          <!-- <q-input
            dense
            outlined
            label="Middlename"
            v-model="informationData.middlanem"
          /> -->
          <q-input
            dense
            outlined
            class="text-capitalize"
            label="Last Name"
            @input="setSurname($event)"
            :value="informationData.surname"
            :error="VALIDidProfile.surname.$error"
          >
            <template
              v-slot:error
              v-if="!VALIDidProfile.surname.required"
            >
              Last Name is Required
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="text-subtitle2 q-pb-sm">Public Email</div>
        <q-input
          dense
          outlined
          type="email"
          label="Email"
          hint="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolor deleniti, qui tempore accusantium quidem."
          @input="setEmail($event)"
          :value="informationData.email"
          :error="VALIDidProfile.email.$error"
        >
          <template
            v-slot:error
            v-if="!VALIDidProfile.email.required"
          >
            Email is Required
          </template>
          <template
            v-slot:error
            v-else-if="!VALIDidProfile.email.email"
          >
            The email address is badly formatted.
          </template>
          <!-- <template
          v-slot:error
          v-else-if="!VALIDidProfile.email.isUnique"
          >
            The email address is already in use by another account.
          </template> -->
        </q-input>
      </div>
      <div class="col-xs-12 q-pt-sm">
        <div class="text-subtitle2 q-pb-sm">Phone Number</div>
        <q-input
          readonly
          dense
          outlined
          placeholder="Number"
          hint="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique eaque ab facilis modi?"
          autogrow
          v-model="informationData.phoneNumber"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  props: ['informationData', 'VALIDidProfile'],
  methods: {
    setFirstname (event) {
      this.$emit('update:firstname', event)
      this.VALIDidProfile.firstname.$touch()
    },
    setSurname (event) {
      this.$emit('update:surname', event)
      this.VALIDidProfile.surname.$touch()
    },
    setEmail (event) {
      this.$emit('update:email', event)
      this.VALIDidProfile.email.$touch()
    }
  },
  beforeMount () {
    this.informationData.phoneNumber = LocalStorage.getItem('phoneNumber')
  }
}
</script>
