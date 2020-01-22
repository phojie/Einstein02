<template>
  <q-card style="min-width: 550px">
    <q-inner-loading :showing="loadingCreate">
      <q-spinner-pie
        color="primary"
        size="100px"
      />
    </q-inner-loading>
    <q-card-section>
      <div class="text-h6">Class Details</div>
    </q-card-section>

    <q-card-section>
      <div class="q-gutter-md">
        <q-input
          v-model="$v.classForm.className.$model"
          autofocus
          label="Class name"
          :disable="!showSimulatedReturnData"
          ref="className"
          :error="$v.classForm.className.$error"
        >
          <template
            v-slot:error
            v-if="!$v.classForm.className.required"
          >
            Classname is required
          </template>
        </q-input>
        <q-input
          v-model="$v.classForm.DT.$model"
          autofocus
          label="Descriptive Title"
          :disable="!showSimulatedReturnData"
          error-message="Descriptitive Title is required"
          :error="$v.classForm.DT.$error"
        />
        <q-input
          v-model="$v.classForm.subjectCode.$model"
          autofocus
          label="Subject Code"
          :disable="!showSimulatedReturnData"
          error-message="Subject Code is required"
          :error="$v.classForm.subjectCode.$error"
        />
        <q-input
          v-model="$v.classForm.room.$model"
          autofocus
          label="Room"
          :disable="!showSimulatedReturnData"
          error-message="Room name is required"
          :error="$v.classForm.room.$error"
        />
        <q-input
          v-model="classForm.description"
          autofocus
          label="Description (Optional)"
          :disable="!showSimulatedReturnData"
        />
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        flat
        label="Cancel"
        class="text-grey-9"
        v-close-popup
      />
      <q-btn
        flat
        :disable="disableCreate"
        class="text-primary"
        @click="validateForm"
      >
        {{formType}}
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import isEqualWith from 'lodash/isEqual'

export default {
  validations: {
    classForm: {
      className: { required },
      subjectCode: { required },
      DT: { required },
      room: { required }
    }
  },
  props: ['classInfo'],
  data () {
    return {
      formType: '',
      classForm: {
        className: '',
        subjectCode: '',
        DT: '',
        schedule: '',
        description: '',
        room: ''
      },
      dummyClassForm: {
        className: '',
        subjectCode: '',
        DT: '',
        schedule: '',
        description: '',
        room: ''
      },
      loadingCreate: false,
      showSimulatedReturnData: true
    }
  },
  computed: {
    disableCreate () {
      let value
      let equal = isEqualWith(this.classForm, this.dummyClassForm)
      if (this.$v.$invalid || equal) {
        value = true
      } else {
        value = false
      }
      return value
    }
  },
  mounted () {
    console.log(this.classInfo)
    let vm = this
    if (vm.classInfo !== '') {
      this.editDataInfo(this.classInfo)
      this.formType = 'update'
    } else {
      this.formType = 'create'
    }
    console.log(this.formType)
  },
  methods: {
    ...mapActions('admin', ['addClassLists', 'updateClassLists']),
    editDataInfo (data) {
      this.dummyClassForm = {
        className: data.className,
        subjectCode: data.subjectCode,
        DT: data.descriptiveTitle,
        schedule: data.schedule,
        description: data.description,
        room: data.room,
        keyIndex: data.keyIndex
      }

      this.classForm = {
        className: data.className,
        subjectCode: data.subjectCode,
        DT: data.descriptiveTitle,
        schedule: data.schedule,
        description: data.description,
        room: data.room,
        keyIndex: data.keyIndex
      }
    },
    validateForm () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$nextTick(() => this.$refs.className.focus())
        console.log(this.$v)
      } else {
        if (this.formType === 'create') {
          console.log('created')
          this.createClass()
        } else if (this.formType === 'update') {
          console.log('updated')
          this.updateClass()
        }
      }
    },
    updateClass () {
      let vm = this
      this.loadingCreate = true
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.loadingCreate = false
        this.showSimulatedReturnData = true

        this.$nextTick(() => this.$refs.className.focus())
        this.updateClassLists(this.classForm).then(function (result) {
          console.log('result', result)
          vm.$q.notify({
            message: 'Class ' + result.className + ' Successfully updated ',
            color: 'positive',
            timeout: 2000,
            position: 'bottom',
            icon: 'note_add'
          })
        })
      }, 1000)
    },
    createClass () {
      let vm = this
      this.loadingCreate = true
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.loadingCreate = false
        this.showSimulatedReturnData = true

        this.$nextTick(() => this.$refs.className.focus())
        this.addClassLists(this.classForm).then(function (result) {
          vm.$v.classForm.$reset()
          vm.$q.notify({
            message: 'Class ' + result.className + ' Successfully added ',
            color: 'positive',
            timeout: 2000,
            position: 'bottom',
            icon: 'note_add'
          })
          vm.classForm = {
            className: '',
            subjectCode: '',
            DT: '',
            schedule: '',
            description: '',
            room: ''
          }
        })
      }, 1000)
    },
    addClass () {
      this.addClassDialog = true
    }
  }
}
</script>
