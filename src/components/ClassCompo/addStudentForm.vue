<template>
  <div>
    <q-card style="width: 500px">
      <q-card-section>
        <q-toolbar-title>Search Students</q-toolbar-title>
      </q-card-section>
      <q-card-section>
        <q-select
          ref="selectRef"
          autofocus=""
          dense=""
          filled
          v-model="model"
          use-input
          hide-selected
          fill-input
          label="Type Student Name"
          input-debounce="0"
          :options="options"
          @filter="filterFn"
          hint="You can only add enrolled students"
          style="width: 100%"
        >
          <template v-slot:option="options">
            <q-item
              clickable
              @click="addStudentThis(options.opt)"
              v-ripple
            >
              <q-item-section
                avatar
                top
              >
                <q-avatar
                  color="primary"
                  text-color="white"
                >
                  <q-img :src="options.opt.profileImgUrl" />
                </q-avatar>
              </q-item-section>
              <q-item-section class="text-capitalize">
                <q-item-label lines="1">{{options.opt.fullname}}</q-item-label>
                <q-item-label caption>{{options.opt.course}}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  name="info"
                  color="green"
                />
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import forEach from 'lodash/forEach.js'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

var stringOptions = []

axios.get('https://firestore.googleapis.com/v1/projects/einstein00-cf6cc/databases/(default)/documents/studentLists')
  .then((response) => {
    let data = response.data.documents
    forEach(data, function (value) {
      stringOptions.push({
        fullname: value.fields.firstname.stringValue + ' ' + value.fields.surname.stringValue,
        keyIndex: value.fields.keyIndex.stringValue,
        course: value.fields.course.stringValue,
        profileImgUrl: value.fields.profileImgUrl.stringValue
      })
    })
  })

export default {
  data () {
    return {
      model: null,
      options: stringOptions
    }
  },
  computed: {
    ...mapGetters('admin', ['userDetails'])
  },
  methods: {
    ...mapActions('admin', ['addClassStudent']),
    filterFn (val, update, abort) {
      if (val.length < 2) {
        abort()
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(v => v.fullname.toLowerCase().indexOf(needle) > -1)
      })
    },
    addStudentThis (data) {
      let vm = this
      console.log(vm.userDetails)
      this.addClassStudent({
        'data': data,
        'classId': vm.$route.params.classId,
        'instructorId': vm.userDetails.keyIndex
      })
        .then(function (result) {
          vm.model = null
          vm.$refs.selectRef.$el.focus()
          vm.$q.notify({
            message: 'Student : ' + data.fullname + ' Successfully added in your class',
            color: 'positive',
            timeout: 2000,
            position: 'bottom',
            icon: 'note_add'
          })
        })
        .catch(function (error) {
          console.log(error)// error
        })
    }
  },
  mounted () {
  }
}
</script>
