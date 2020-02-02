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
                  <div class="text-h6 text-uppercase">{{classData.courseCode}}</div>
                  <div class="text-body2">{{classData.schoolYear}} - {{parseInt(classData.schoolYear) + 1}} | {{classData.semester}}</div>
                  <div class="text-body1">Schedule: Day: {{classData.day}} Time: {{classData.timeFrom}} - {{classData.timeTo}}</div>
                  <div class="text-subtitle1">Total Students: {{myClassLists.length}} </div>
                  <q-chip
                    class="q-ma-none q-mt-md"
                    size="17px"
                    square
                    icon="bookmark"
                  >
                    Room: {{classData.room}}
                  </q-chip>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-linear-progress
          size="3px"
          class="q-ma-md q-mx-xl"
        />
        <div class="col-xs-12">
          <gradingTable :classData=classData v-if="true"></gradingTable>
          <div
            v-else
            class="content-center column"
            style="margin-top:-15px"
          >
            <q-avatar size="300px">
              <img
                src="/statics/svgBG/emptystudents.png"
                alt=""
              >
            </q-avatar>
            <div class="text-subtitle2">Your class doesn't have any students.</div>
          </div>
        </div>

      </div>

    </q-page>

    <!-- <q-page-sticky
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
    </q-page-sticky> -->

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
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    'gradingTable': require('components/Tables/gradingTable.vue').default,
    'addStudentForm': require('components/ClassCompo/addStudentForm.vue').default
  },
  data () {
    return {
      addForm: false,
      classData: []
    }
  },
  computed: {
    ...mapGetters('admin', ['classLists', 'loadingArea', 'myClassLists']),
    contentSize () {
      return this.moreContent ? 150 : 5
    }
  },
  methods: {
    ...mapActions('admin', ['registrarStudentLists']),
    getClassData () {
      let vm = this
      let classID = this.$route.params.classId

      let docRef = fireDB.collection('VPAA/subjectSchedules/Lists').doc(classID)
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
  created () {
    this.getClassData()
    this.registrarStudentLists()
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
