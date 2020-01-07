<template>
  <div>
    <q-page
      v-if="classLists"
      class="flex"
      padding
     >
      <div class="row justify-start">
        <q-intersection
          v-for="(list, index) in classLists"
          once
          transition="scale"
          class="col-xs-12 col-md-3 col-sm-5"
          :key="index"
        >
          <q-card
            class="q-ma-sm "
            flat
            bordered
          >
            <!-- <img
            height="100px"
            src="https://cdn.quasar.dev/img/mountains.jpg"
          > -->
            <q-card-section class="bgHead text-white">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div
                    @click="gotoClass(list.keyIndex)"
                    class="text-h5 text-grey-10 cursor-pointer"
                    style="text-decoration:none; "
                  >
                    <q-toolbar-title class="text-white">
                      {{list.descriptiveTitle}}
                      <q-tooltip>
                        {{list.descriptiveTitle}}
                      </q-tooltip>
                    </q-toolbar-title>
                  </div>
                  <div class="text-subtitle2">{{list.subjectCode}}</div>
                  <!-- <div class="text-subtitle2">25 Students</div> -->
                  <q-chip
                    class="q-ma-none q-mt-md"
                    size="12px"
                    square
                    icon="bookmark"
                  >
                    {{list.className}}
                  </q-chip>
                </div>

                <div class="col-auto">
                  <q-btn
                    color="white"
                    round
                    flat
                    icon="more_vert"
                  >
                    <q-menu auto-close>
                      <q-list>
                        <q-item clickable @click="editAct(list)">
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item clickable @click="deleteAct(list)">
                          <q-item-section>Delete</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Archieve</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-card-section>

            <q-card-actions
              style="min-height:140px"
              class="q-pa-md text-justify"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
              quidem. Veritatis ad consectetur delectus nam, mollitia autem
              voluptate assumenda fugiat asperiores placeat aliquam tenetur
              tempora sunt aliquid, possimus repellat dignissimos.

            </q-card-actions>

            <q-separator />

            <q-card-actions class="reverse">
              <q-btn
                :ripple="{ color: 'grey-9' }"
                round
                flat
                class="text-grey-9"
                icon="trending_up"
              >
                <q-tooltip>Open gradebok for Object-Oriented Programming</q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-intersection>
      </div>
    </q-page>

    <q-page
      v-else
      class="flex flex-center "
    >
     <div
      class="content-center column"
      style="margin-top:-15px"
    >
      <q-avatar size="300px">
        <img
          src="/statics/svgBG/emptystudents.png"
          alt=""
        >
      </q-avatar>

      <q-chip
        class="q-mt-md"
        icon="bookmark"
      >
        Hello {{userDetails.firstname}}, You ddn't add a class yet
      </q-chip>
    </div>

    </q-page>

    <q-dialog
      v-model="updateClassDialog"
      persistent
    >
      <forms-createclass :classInfo="classInfoData">
      </forms-createclass>
    </q-dialog>
  </div>

</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { LocalStorage } from 'quasar'

export default {
  components: {
    'formsCreateclass': require('components/Forms/createClass.vue').default
  },
  data () {
    return {
      updateClassDialog: false,
      classInfoData: []
    }
  },
  computed: {
    ...mapGetters('admin', ['classLists', 'userDetails', 'myAllstudents'])
  },
  methods: {
    ...mapActions('admin', ['deleteClassList', 'getClassLists']),
    ...mapMutations('admin', ['clearMyClass']),
    gotoClass (data) {
      let vm = this
      vm.clearMyClass()
      vm.$router.push('/classes/' + data)
    },
    editAct (data) {
      this.classInfoData = data
      this.updateClassDialog = true
    },
    deleteAct (data) {
      let vm = this
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete <span class="text-negative">${data.descriptiveTitle}</span>(${data.className})`,
        html: true,
        persistent: true,
        ok: {
          push: true,
          color: 'negative'
        },
        cancel: true
      }).onOk(() => {
        // console.log('>>>> OK')

        this.deleteClassList(data).then(function (result) {
          vm.$q.notify({
            message: 'Class ' + result.className + ' Successfully deleted ',
            color: 'negative',
            timeout: 2000,
            position: 'bottom',
            icon: 'delete_forever'
          })
        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    test () {
      console.log('test')
    }
  },
  created () {
    this.getClassLists()
  },
  beforeCreate () {
    let firstLogin = this.$route.meta.firstLogin
    const loginType = LocalStorage.getItem('FirstLogin')
    if (firstLogin && loginType) {
      this.$router.push({
        path: '/settings/profile',
        query: {
          redirect: 'firstAuth.php'
        }
      })
    }
  }

}
</script>

<style scoped>
  .bgHead {
    height: 100%;
    background-image: url("https://gstatic.com/classroom/themes/img_backtoschool.jpg");
    /* background-image: url("https://www.gstatic.com/classroom/themes/img_learnlanguage.jpg"); */
    /* background-image: url("https://www.gstatic.com/classroom/themes/img_bookclub.jpg"); */
    background-size: cover;
    /* background-position: -200px -5px; */
    background-repeat: no-repeat;
    background-color: radial-gradient(
      25rem 18.75rem ellipse at bottom right,
      blue,
      transparent
    );
  }
</style>
