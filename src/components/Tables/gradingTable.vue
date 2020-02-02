<template>
  <div>
    <q-table
      flat
      bordered
      :data="myClassLists"
      :columns="columns"
      row-key="name"
      :separator="separator"
      :filter="filter"
      :pagination.sync="pagination"
      content-class="text-h2"
      :hide-bottom="hidebottom"
      :visible-columns="visibleColumns"
      table-class="overFlowHidemeNOt"
      :dense="denseTable"
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class="print-only fit column justify-center items-center content-center ">
          <div class="headerArea">
          </div>
        </div>
        <div
          style="margin-top:-50px !important"
          class="print-only fit row justify-center"
        >
          <div class="col-12 row wrap">
            <div class="col-8 row wrap">
              <div class="text-subtitle2 text-weight-bold">College Instructor:</div>
              <div class="q-ml-md text-subtitle2 text-weight-bold text-capitalize">{{userDetails.firstname}} {{userDetails.surname}}</div>
            </div>
            <div class="col-4 row wrap">
              <div class="text-subtitle2 text-weight-bold">School Year:</div>
              <div class="q-ml-md text-subtitle2 text-weight-bold">{{classData.schoolYear}}-{{parseInt(classData.schoolYear)+1}}</div>
            </div>
          </div>
          <div class="col-12 row wrap">
            <div class="col-8 row wrap">
              <div class="text-subtitle2 text-weight-bold">Course Code:</div>
              <div class="q-ml-md text-subtitle2 text-weight-bold q-ml-xl text-uppercase">{{classData.courseCode}}</div>
            </div>
            <div class="col-4 row wrap">
              <div class="text-subtitle2 text-weight-bold">Semester: </div>
              <div class="q-ml-md text-subtitle2 text-weight-bold">{{classData.semester}}</div>
            </div>
          </div>

          <div class="col-12 row wrap">
            <div class="col-12 row wrap">
              <div class="text-subtitle2 text-weight-bold q-pr-sm">Descriptive Title: </div>
              <div class="q-ml-md text-subtitle2 text-weight-bold text-capitalize">{{classData.descriptiveTitle}}</div>
            </div>
          </div>

        </div>

        <div
          style="font-size:22px"
          class="print-hide text-blue-10 q-table__title"
        >
          <q-icon
            square
            name="assignment"
          />
          Student Lists
        </div>
        <q-space />

        <q-input
          dense
          clearable
          debounce="300"
          v-model="filter"
          placeholder="Search"
          class="print-hide q-mr-md-lg text-body1"
        >
          <q-icon
            slot="append"
            name="search"
          />
        </q-input>

        <q-select
          class="print-hide"
          v-model="visibleColumns"
          multiple
          dense
          outlined=""
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        />

        <q-avatar
          icon="archive"
          class="print-hide q-ml-md-md cursor-pointer"
          @click="exportTable"
        >
          <q-tooltip>
            Export to CSV
          </q-tooltip>
        </q-avatar>

        <q-avatar
          icon="print"
          class="print-hide cursor-pointer"
          @click="printStudents"
        >
          <q-tooltip>
            Print
          </q-tooltip>
        </q-avatar>
        <q-btn
          round
          dense
          color="red"
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreenBtn"
          class="print-hide q-ml-md"
        />

      </template>
      <template v-slot:body="props" >
        <q-tr :props="props">
          <q-td
            key="fullname"
            :props="props"
            class="text-capitalize"
          >
            {{ props.row.index + 1 }}.
            {{ `${props.row.surname}, ${props.row.firstname}`}} {{`${props.row.middlename.charAt(0)}.` || ''}}
          </q-td>
          <q-td
            key="course"
            :props="props"
          >
            <div class="text-pre-wrap" v-if="props.row.course === 'Business administration'">BSBA</div>
            <div class="text-pre-wrap" v-if="props.row.course === 'Computer science'">BSCS</div>
            <div class="text-pre-wrap" v-if="props.row.course === 'Secondary education'">BSED</div>
            <div class="text-pre-wrap" v-if="props.row.course === 'Elementary education'">BEED</div>
            <div class="text-pre-wrap" v-if="props.row.course === 'Criminology'">BSCRIM</div>
          </q-td>

          <q-td
            key="prelim"
            :props="props"
          >
            <span class="text-bold">
              {{ props.row.prelim }}
            </span>
            <q-popup-edit
              touch-position
              v-model.number="props.row.prelim"
              buttons
              @input="updateMutation(props.row)"
              label-set="Save"
              :validate="validateGrade"
              @save="saveGrade(props.row)"
              @hide="validateGrade"
            >
              <template slot="title">
                <div class="text-subtitle2">
                  <span class="text-green text-caption">{{props.row.fullname}}'s</span> Prelim
                </div>
              </template>
              <q-input
                type="number"
                v-model.number="props.row.prelim"
                dense
                autofocus
                :error="errorGrade"
                :error-message="errorMessage"
              >
                <template v-slot:prepend>
                  <q-icon
                    size="15px"
                    name="rate_review"
                  />
                </template>
              </q-input>
            </q-popup-edit>
          </q-td>
          <q-td
            key="midterm"
            :props="props"
          >
            <span class="text-bold">
              {{ props.row.midterm }}
            </span>
            <q-popup-edit
              v-model.number="props.row.midterm"
              buttons
              @input="updateMutation(props.row)"
              label-set="Save"
              :validate="validateGrade"
              @save="saveGrade(props.row)"
              @hide="validateGrade"
            >
              <template slot="title">
                <div class="text-subtitle2">
                  <span class="text-green text-caption">{{props.row.fullname}}'s</span> Midterm
                </div>
              </template>
              <q-input
                type="number"
                v-model.number="props.row.midterm"
                dense
                mask="###"
                autofocus
                :error="errorGrade"
                :error-message="errorMessage"
              />
            </q-popup-edit>
          </q-td>
          <q-td
            key="semi"
            :props="props"
          >
            <span class="text-bold">
              {{ props.row.semi }}
            </span>
            <q-popup-edit
              v-model.number="props.row.semi"
              buttons
              @input="updateMutation(props.row)"
              label-set="Save"
              :validate="validateGrade"
              @save="saveGrade(props.row)"
              @hide="validateGrade"
            >
              <template slot="title">
                <div class="text-subtitle2">
                  <span class="text-green text-caption">{{props.row.fullname}}'s</span> Semi
                </div>
              </template>
              <q-input
                type="number"
                v-model.number="props.row.semi"
                dense
                mask="###"
                autofocus
                :error="errorGrade"
                :error-message="errorMessage"
              />
            </q-popup-edit>
          </q-td>
          <q-td
            key="final"
            :props="props"
          >
            <span class="text-bold">
              {{ props.row.final }}
            </span>
            <q-popup-edit
              v-model.number="props.row.final"
              buttons
              @input="updateMutation(props.row)"
              label-set="Save"
              :validate="validateGrade"
              @save="saveGrade(props.row)"
              @hide="validateGrade"
            >
              <template slot="title">
                <div class="text-subtitle2">
                  <span class="text-green text-caption">{{props.row.fullname}}'s</span> Final
                </div>
              </template>
              <q-input
                type="number"
                v-model.number="props.row.final"
                dense
                mask="###"
                autofocus
                :error="errorGrade"
                :error-message="errorMessage"
              />
            </q-popup-edit>
          </q-td>
          <q-td
            key="rounded"
            :props="props"
          >
            <div class="print-hide">
              <q-avatar
                color="blue-7"
                text-color="white"
                size="sm"
              >
                <span class="text-weight-bolder">
                  {{ props.row.rounded }}
                </span>

              </q-avatar>
            </div>
            <div class="print-only">
              {{props.row.rounded}}
            </div>
          </q-td>
          <q-td
            key="remarks"
            :props="props"
          >
            <!-- <div class="print-only">
             <span v-if="props.row.remarks ==='In Progress'">
               Incomplete
             </span>
             <span v-else>
              {{props.row.remarks}}
             </span>
           </div>
           <div class="print-hide"> -->
            <q-chip
              square
              dense
              v-if="props.row.remarks ==='Excellent'"
              class="text-caption glossy"
              color="light-green-10"
              text-color="white"
              icon="star"
            >Excellent</q-chip>
            <q-chip
              square
              dense
              v-else-if="props.row.remarks ==='Very Satisfactory'"
              class="text-caption glossy"
              color="light-green"
              text-color="white"
            >Very Satis...</q-chip>
            <q-chip
              square
              dense
              v-else-if="props.row.remarks ==='Satisfactory'"
              class="text-caption glossy"
              color="lime-8"
              text-color="white"
            >Satisfactory</q-chip>
            <q-chip
              square
              dense
              v-else-if="props.row.remarks ==='Fair'"
              class="text-caption glossy"
              color="lime-6 "
              text-color="white"
            >Fair</q-chip>
            <q-chip
              square
              dense
              v-else-if="props.row.remarks ==='Poor'"
              class="text-caption glossy"
              color="amber-6"
              text-color="white"
            >Poor</q-chip>
            <q-chip
              square
              dense
              v-else-if="props.row.remarks ==='Failed'"
              class="text-caption glossy"
              color="red-6"
              text-color="white"
            >Failed</q-chip>
            <q-chip
              v-else-if="props.row.remarks ==='In Progress'"
              square
              dense
              class="text-caption glossy"
              color="blue-5"
              text-color="white"
            >In Progress</q-chip>
            <!-- </div> -->
          </q-td>
          <q-td
            key="action"
            :props="props"
          >
            <q-btn
              round
              @click="confirm(props.row)"
              flat
              color="orange-8"
            >
              <q-icon name="delete_sweep" />
              <q-tooltip>Delete {{props.row.fullname}}</q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import { fireDB } from 'boot/firebase'
import find from 'lodash/find.js'
import { exportFile } from 'quasar'
import capitalize from 'lodash/capitalize.js'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const columns = [
  { sortable: true, headerClasses: 'bg-primary text-white', classes: 'bg-grey-2 ', name: 'fullname', align: 'left', label: 'Name', field: 'fullname' },
  { classes: '', name: 'course', align: 'left', label: 'Course', field: 'course' },
  { classes: '', name: 'prelim', label: 'Prelim', field: 'prelim' },
  { name: 'midterm', label: 'Midterm', field: 'midterm' },
  { name: 'semi', label: 'Semi', field: 'semi' },
  { name: 'final', label: 'Final', field: 'final' },
  { sortable: true, style: 'max-width: 20px;', name: 'rounded', label: 'Rounded', field: 'rounded' },
  { name: 'remarks', label: 'Remarks', align: 'left', field: 'remarks' },
  { classes: '', name: 'action', label: 'Action', field: 'action' }
]

export default {
  props: ['classData'],
  data () {
    return {
      separator: 'cell',
      visibleColumns: ['fullname', 'course', 'prelim', 'midterm', 'semi', 'final', 'rounded', 'remarks'],
      hidebottom: false,
      isFullscreen: false,
      filter: '',
      columns,
      pagination: {
        rowsPerPage: 10, // current rows per page being displayed
        recentRowsPerPage: 0
      },
      errorGrade: false,
      errorMessage: '',
      loading: false,
      denseTable: false
    }
  },
  computed: {
    ...mapGetters('admin', ['studentLists', 'myAllstudents', 'myClassLists', 'userDetails']),
    classId () {
      return this.$route.params.classId
    }
  },
  methods: {
    ...mapActions('admin', ['registrarStudentLists', 'deleteMyClassStudents', 'saveGradeNow']),
    ...mapMutations('admin', ['commitGetMyclassStudents', 'commitloadingArea']),
    fullscreenBtn () {
      this.isFullscreen = !this.isFullscreen
      this.changeRouteFull()
    },
    changeRouteFull () {
      if (this.isFullscreen) {
        this.$router.replace({ path: `/classes/${this.classId}/fullscreen?afsugaanudmdfgfg` })
      } else {
        this.$router.replace({ path: `/classes/${this.classId}` })
      }
    },
    exportTable () {
      // naive encoding to csv format
      let vm = this
      const content = [ vm.visibleColumns.map(col => wrapCsvValue(capitalize(col))) ].concat(
        vm.myClassLists.map(row => vm.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        this.$route.params.classId + 'emery.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    getStudents () {
      let vm = this
      this.loading = true
      this.commitloadingArea(true)
      let classID = this.$route.params.classId
      this.registrarStudentLists().then(function (result) {
        let docRef = fireDB.collection('studentsSubject').where('classId', '==', classID)
        docRef.onSnapshot(function (querySnapshot) {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(function (doc) {
              let studentInfo = find(vm.studentLists, ['keyIndex', doc.data().studentIndex])
              let allData = { ...studentInfo, ...doc.data() }
              vm.commitGetMyclassStudents(allData)
              vm.loading = false
              vm.commitloadingArea(false)
            })
          } else {
            vm.commitloadingArea(false)
            vm.loading = false
          }
        })
      })
    },
    identifyFUll () {
      if (this.$route.name === 'classDashFULL') {
        console.log('test')
        this.isFullscreen = true
      } else {
        this.isFullscreen = false
      }
    },
    printStudents () {
      // this.$q.loading.show({
      //   spinner: null
      // })
      this.isFullscreen = true
      this.denseTable = true
      this.visibleColumns = ['fullname', 'course', 'prelim', 'midterm', 'semi', 'final', 'rounded', 'remarks']
      this.pagination.recentRowsPerPage = this.pagination.rowsPerPage
      this.pagination.rowsPerPage = 0
      this.hidebottom = true
      this.changeRouteFull()
      this.timer = setTimeout(() => {
        this.visibleColumns = ['fullname', 'course', 'prelim', 'midterm', 'semi', 'final', 'rounded', 'remarks']
        // this.$q.loading.hide()
        this.timer = void 0
        window.print(event)
        this.isFullscreen = false
        this.hidebottom = false
        this.denseTable = false
        this.pagination.rowsPerPage = this.pagination.recentRowsPerPage
        this.changeRouteFull()
        // window.onafterprint = function () {
        //   console.log('Printing completed...')
        // }
      }, 200)
    },
    validateGrade (val) {
      if (val > 5) {
        this.errorGrade = true
        this.errorMessage = 'Maximum grade is only 5'
        return false
      }
      if (val === 0) {
        this.errorGrade = true
        this.errorMessage = 'Invalid grade'
        return false
      }
      this.errorGrade = false
      this.errorMessage = ''
      return true
    },
    saveGrade (data) {
      let vm = this
      vm.saveGradeNow({ 'data': data, 'classId': vm.$route.params.classId })
        .then(function (result) {
          vm.$q.notify({
            message: `<span class="text-weight-bolder ">${data.fullname}</span>  Grade is successfully updated `,
            timeout: 4000,
            html: true,
            color: 'primary',
            position: 'bottom-left',
            icon: 'system_update_alt',
            classes: ' text-bold text-caption shadow-19'
          })
          var audio = new Audio('/statics/audioJie/notification.mp3')
          audio.play()
        })
    },
    updateMutation (data) {
      console.log(data)
    },
    confirm (data) {
      let vm = this
      console.log(data)
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete <span class="text-red-8 text-weight-bold">${data.fullname} </span> `,
        cancel: true,
        html: true,
        ok: {
          color: 'red',
          flat: true,
          label: 'Delete'
        },
        persistent: true
      }).onOk(() => {
        vm.deleteMyClassStudents(data)
          .then(function (result) {
            // ' + data.fullname + '
            vm.$q.notify({
              message: 'Student : ' + data.fullname + ' Successfully deleted',
              color: 'negative',
              timeout: 2000,
              position: 'bottom',
              icon: 'delete_sweep'
            })
          })
      })
    }
  },
  created () {
    this.getStudents()
    this.identifyFUll()
    // this.commitGetMyclassStudents(this.$route.params.classId)
  }
}
</script>

<style>
.myNotify {
  border: 2px solid #027be3;
}
@media screen {
  .print-only {
    display: none !important;
  }
}

@media print {
  .headerArea {
    background-image: url("/statics/ckcm/header.png");
    /* background-image: url('/statics/svgBG/jie1.png'); */
    background-size: 100%;
    width: 80%;
    background-repeat: no-repeat;
    height: 200px;
  }

  .overFlowHidemeNOt {
    overflow: hidden !important;
  }
  .print-hide {
    display: none !important;
  }
}
</style>

.
