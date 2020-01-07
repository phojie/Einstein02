<template>
  <div class="row justify-between items-start content-center q-gutter-y-md ">
    <div class="col-xs-12" v-if="!loading">
      <q-banner class="bg-transparent q-mb-md">
        <div class="q-mb-sm text-h5 text-medium" style="font-size:30px">Welcome to <span class="text-weight-bold text-green">CKCM</span> Grading System</div>
        <div class="text-h5 text-weight-light text-grey-8" style="font-size:20px"> Let's get you set up!</div>
      </q-banner>
      <q-stepper
        v-model="step"
        ref="stepper"
        alternative-labels
        color="primary"
        animated
      >
        <q-step
          :name="1"
          title="Profile"
          icon="settings"
          :done="step > 1"
        >
          <profileForm
            :informationData="informationData"
            :VALIDidProfile="$v.informationData"
            :firstname.sync="informationData.firstname"
            :surname.sync="informationData.surname"
            :email.sync="informationData.email"
          ></profileForm>
        </q-step>

        <q-step
          :name="2"
          title="Biography "
          icon="info"
          :done="step > 2"
        >
          <div class="row">
            <div class=" col-md-5 col-xs-12">
              <div class="text-subtitle2 q-pb-sm">Profile Picture</div>
              <q-uploader
                class="full-width"
                label="Upload Profile"
                flat
                bordered
                hide-upload-btn
                @added="addedPhoto"
                accept="image/*"
              >
                <template v-slot:list="scope">
                  <q-img
                    spinner-color="blue"
                    :src="informationData.profileImgUrl"
                  />
                </template>
              </q-uploader>
            </div>
            <div class="col-md-7 col-xs-12 q-pl-md-md q-pt-xs-md">
              <div class="text-subtitle2 q-pb-sm">Bio</div>
              <q-input
                dense
                outlined
                placeholder="Tell us a little bit about your self"
                autogrow
                hint="You can @mention other users and School to link to them."
                v-model="informationData.bio"
              />
            </div>
          </div>

        </q-step>

        <q-step
          :name="3"
          title="Create Password"
          icon="account_circle"
        >

          <newPasswordForm
            :informationData="informationData"
            :VALIDidProfile="$v.informationData"
            :password.sync="informationData.password"
            :confirmPassword.sync="informationData.confirmPassword"
          ></newPasswordForm>

        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="row reverse">
            <q-btn
              @click="stepNext($refs.stepper)"
              color="primary"
              :disable="step === 3 ? finishBtn : false "
              :label="step === 3 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
// import { fireAuth } from 'boot/firebase'
import { QSpinnerFacebook, LocalStorage } from 'quasar'
import { mapActions } from 'vuex'

export default {
  components: {
    'profileForm': require('components/Forms/sharedForms/profileForm.vue').default,
    'newPasswordForm': require('components/Forms/sharedForms/newPasswordForm.vue').default
  },
  validations: {
    informationData: {
      firstname: { required },
      surname: { required },
      password: {
        required,
        minLength: minLength(6)
      },
      email: {
        email,
        required
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  data () {
    return {
      loading: false,
      informationData: {
        firstname: '',
        middlename: '',
        surname: '',
        email: '',
        phoneNumber: '',
        bio: '',
        profileImgUrl: '',
        password: '',
        confirmPassword: '',
        keyIndex: ''
      },
      step: 1
    }
  },
  computed: {
    finishBtn () {
      let bol = Boolean
      if (this.$v.informationData.$invalid) {
        bol = true
      } else {
        bol = false
      }
      console.log(bol)
      return false
    }
  },
  methods: {
    ...mapActions('admin', ['createNewuser']),
    stepNext (data) {
      if (this.step === 1) {
        if (this.$v.informationData.email.$invalid || this.$v.informationData.surname.$invalid || this.$v.informationData.firstname.$invalid) {
        // invalid profile
          this.$v.informationData.email.$touch()
          this.$v.informationData.surname.$touch()
          this.$v.informationData.firstname.$touch()
        } else {
          console.log(data)
          data.next()
        // continue
        }
      } else if (this.step === 2) {
        data.next()
      } else {
        if (this.$v.informationData.password.$invalid || this.$v.informationData.confirmPassword.$invalid) {
        // invalid
          this.$v.informationData.password.$touch()
          this.$v.informationData.confirmPassword.$touch()
        } else {
          this.loadingSpinner()
          data.next()
        }
      }
    },
    loadingSpinner () {
      let vm = this
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'primary',
        backgroundColor: 'transparent',
        messageColor: 'black',
        customClass: 'text-h6',
        message: `Hi ${vm.informationData.firstname} some important process is in progress. Hang on...`
      })
      this.loading = true
      this.timer = setTimeout(() => {
        this.createNewuser(this.informationData).then(function (result) {
          vm.$router.push('/')
          LocalStorage.set('FirstLogin', false)
          vm.$v.informationData.$reset()
          vm.loading = false
          vm.timer = void 0
          vm.$q.loading.hide()
          vm.$q.loadingBar.stop()
        }, function (error) {
          console.log('something is wrong', error)
        })
      }, 2000)

      // hiding in 2s
      // this.timer = setTimeout(() => {
      //   this.$q.loading.hide()
      //   this.timer = void 0
      //   this.loading = false
      // }, 5000)
      // continue
    },
    addedPhoto (data) {
      let imgData = data[0].__img['src']
      this.informationData.profileImgUrl = imgData
    }
  }
}
</script>
