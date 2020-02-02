<template>
  <gradingTable :classData=classData v-if="true"></gradingTable>
</template>

<script>
import { fireDB } from 'boot/firebase'
import { mapActions } from 'vuex'

export default {
  components: {
    'gradingTable': require('components/Tables/gradingTable.vue').default
  },
  data () {
    return {
      classData: []
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
