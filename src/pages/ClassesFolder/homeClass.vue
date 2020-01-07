<template >
  <q-layout>
    <q-page
      padding=""
      class="row justify-center items-start "
    >
      <div class="col-md-9 col-sm-11 col-xs-12 q-mt-md-md row justify-center items-start">
        <div class="col-xs-12">
          <q-card style="height:240px; border-radius:8px">
            <q-card-section class="bgHead text-white q-px-md-xl q-pt-lg">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div
                    class="text-grey-10"
                    style="text-decoration:none;"
                  >
                    <q-toolbar-title
                      style="font-size:25px"
                      class="text-capitalize text-weight-bold text-white"
                    >
                      {{classData.descriptiveTitle}}
                    </q-toolbar-title>
                  </div>
                  <div class="text-h6">{{classData.subjectCode}}</div>
                  <div class="text-subtitle1" v-if="myClassLists.length"> {{myClassLists.length}}  Students</div>
                  <div class="text-subtitle1" v-else>{{myClassLists.length}} Student</div>
                  <q-chip
                    class="q-ma-none q-mt-md"
                    size="17px"
                    square
                    icon="bookmark"
                  >
                    {{classData.className}}
                  </q-chip>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-linear-progress
          size="3px"
          class="q-ma-md q-mx-xl"
          :indeterminate="false"
        />
        <div class="col-xs-12">
          <gradingTable></gradingTable>
        </div>

      </div>

    </q-page>

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-fab
        icon="add"
        direction="up"
        color="primary"
        push
      >
        <q-fab-action
          @click="addForm=true"
          color="primary"
          icon="person_add"
        >
          <q-tooltip>Add students</q-tooltip>
        </q-fab-action>
        <q-fab-action
          @click="onClick"
          color="primary"
          icon="mail"
        >
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <q-dialog
      v-model="addForm"
      position="top"
      square=""
    >
      <addStudentForm />
    </q-dialog>
  </q-layout>
</template>

<script>
import { fireDB } from 'boot/firebase'
import { mapGetters } from 'vuex'

export default {
  components: {
    'gradingTable': require('components/yawa/gradingTable.vue').default,
    'addStudentForm': require('components/ClassCompo/addStudentForm.vue').default
  },
  data () {
    return {
      addForm: false,
      classData: []
    }
  },
  computed: {
    ...mapGetters('admin', ['classLists', 'myClassLists', 'getMyclassStudents']),
    contentSize () {
      return this.moreContent ? 150 : 5
    }
  },
  methods: {
    getClassData () {
      let vm = this
      let classID = this.$route.params.classId

      let docRef = fireDB.collection('classLists').doc(classID)
      docRef.onSnapshot({
        includeMetadataChanges: true
      }, function (doc) {
        vm.classData = doc.data()
      })
    },
    onClick () {
      // console.log('Clicked on a fab action')
    }
  },
  mounted () {
    this.getClassData()
  }
}
</script>

<style  scoped>
.bgHead {
  height: 100%;
  background-size: cover;
  background-image: url("https://gstatic.com/classroom/themes/img_backtoschool.jpg");
  /* background-image: url("https://www.gstatic.com/classroom/themes/img_learnlanguage.jpg"); */
  /* background-image: url("https://www.gstatic.com/classroom/themes/img_bookclub.jpg"); */
  background-repeat: no-repeat;
}
</style>
