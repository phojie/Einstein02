<template>
  <div class="flex flex-center">
    <q-form class="row wrap justify-between q-gutter-y-md">
      <div class="col-xs-12 ">
        <div class="text-subtitle2 q-pb-sm">New Password</div>
        <q-input
          autofocus
          dense
          filled
          :type="isPwd ? 'password' : 'text'"
          @input="setPassword($event)"
          :value="informationData.password"
          :error="VALIDidProfile.password.$error"
          >

          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>

          <template
            v-slot:error
            v-if="!VALIDidProfile.password.minLength"
          >
            Password must have at least 6 letters.
          </template>

          <template
            v-slot:error
            v-else-if="!VALIDidProfile.password.required"
          >
            Your Password is Required
          </template>
        </q-input>
      </div>

      <div class="col-xs-12">
        <div class="text-subtitle2 q-py-sm">Confirm Password</div>
          <q-input
            dense
            filled
            type="password"
            @input="setConfirmPassword($event)"
            :value="informationData.confirmPassword"
            :error="VALIDidProfile.confirmPassword.$error"
            >
            <template
              v-slot:error
              v-if="!VALIDidProfile.confirmPassword.sameAsPassword"
            >
              Password must be identical
            </template>
          </q-input>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  props: ['informationData', 'VALIDidProfile'],
  data () {
    return {
      isPwd: true
    }
  },
  methods: {
    setPassword (event) {
      this.$emit('update:password', event)
      this.VALIDidProfile.password.$touch()
    },
    setConfirmPassword (event) {
      this.$emit('update:confirmPassword', event)
      this.VALIDidProfile.confirmPassword.$touch()
    }
  }
}
</script>
