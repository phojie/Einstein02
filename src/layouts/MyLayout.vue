<template>
  <q-layout >
    <q-header
      class="bg-white text-grey-7 shadow-1"
      >
          <!-- class="text-white"
      style="background: #24292e" -->
      <q-toolbar>
        <q-btn
          round
          dense
          flat
          :ripple="false"
          size="19px"
          color="grey"
          class="q-mr-sm"
          no-caps
        >
          <q-avatar size="35px">
            <img
              src="/statics/jieIcons/apple-touch-icon.png"
              alt=""
            >
          </q-avatar>

        </q-btn>

        <q-select
          ref="search"
          dense
          standout="bg-white text-primary"
          input-class="text-grey-9"
          use-input
          hide-selected
          class="GL__toolbar-select"
          :stack-label="false"
          label="Search or jump to..."
          v-model="text"
          :options="filteredOptions"
          @filter="filter"
          style="width: 300px;"
          hide-bottom-space
        >

          <template v-slot:append>
            <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
          </template>

          <template v-slot:no-option>
            <q-item
              dense=""
            >
              <q-item-section >
                <div class="text-center">
                  <q-spinner-pie
                    color="grey-5"
                    size="24px"
                  />
                </div>
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item
              dense=""
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
              class="GL__select-GL__menu-link"
            >
              <q-item-section side>
                <q-icon name="collections_bookmark" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
              </q-item-section>
              <q-item-section
                side
                :class="{ 'default-type': !scope.opt.type }"
              >
                <q-btn
                  outline
                  dense
                  no-caps
                  text-color="blue-grey-5"
                  size="12px"
                  class="bg-grey-1 q-px-sm"
                >
                  {{ scope.opt.type || 'Jump to' }}
                  <q-icon
                    name="subdirectory_arrow_left"
                    size="14px"
                  />
                </q-btn>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div
          v-if="$q.screen.gt.sm"
          class=" GL__toolbar-link q-ml-xs q-gutter-md text-medium text-weight-medium row items-center no-wrap"
        >
          <q-btn
            to="/"
            flat
            class-active="text-red"
            class="text-grey-7 text-capitalize text-caption"
          >
            <q-icon name="home" class="q-pr-xs"></q-icon>
            <span>Home</span>
          </q-btn>
         <q-btn
            to="/classes"
            flat
            v-ripple:primary
            class="text-grey-7 text-capitalize text-caption"
          >
            <q-icon name="class" class="q-pr-xs"></q-icon>
            <span>Classes</span>
          </q-btn>

          <q-btn
            to="/calendar"
            flat
            v-ripple:primary
            class="text-grey-7 text-capitalize text-caption"
          >
            <q-icon name="calendar_today" class="q-pr-xs"></q-icon>
            <span>Calendar</span>
          </q-btn>
        </div>

        <q-space />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn
            v-if="$q.screen.gt.xs"
            dense
            flat
            round
            size="11px"
            icon="notifications"
          />
          <q-btn
            v-if="$q.screen.gt.xs"
            dense
            flat
          >
            <div class="row items-center no-wrap">
              <q-icon
                name="add"
                size="20px"
              />
              <q-icon
                name="arrow_drop_down"
                size="16px"
                style="margin-left: -2px"
              />
            </div>
            <q-menu auto-close>
              <q-list
                dense
                style="min-width: 100px"
              >
                <q-item
                  clickable
                  @click="addClass"
                  class="GL__menu-link"
                >
                  <q-item-section>Create Class</q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Import Class</q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Join Class</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Feedback</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            dense
            flat
            no-wrap
          >
            <q-avatar
              rounded
              size="20px"
            >
              <img :src="userDetails.profileImgUrl">
            </q-avatar>
            <q-icon
              name="arrow_drop_down"
              size="16px"
            />

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>{{userDetails.firstname}}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  class="GL__menu-link-status"
                >
                  <q-item-section>
                    <div>
                      <q-icon
                        name="tag_faces"
                        color="blue-9"
                        size="18px"
                      />
                      Set your status
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Your profile</q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Your repositories</q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Your projects</q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Your stars</q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Your gists</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section>Help</q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="GL__menu-link"
                  to="/settings/profile"
                >
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item
                  clickable
                  class="GL__menu-link"
                  @click="signOutNow"
                >
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container style="background-color:#f4f4f7" class="bg">
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="addClassDialog"
      persistent
    >
      <formsCreateclass classInfo="">
      </formsCreateclass>
    </q-dialog>
  </q-layout>
</template>

<script>
import { fireAuth } from 'boot/firebase'
import { LocalStorage } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
const stringOptions = [
  'Phojie Rengel',
  'Renyl Phojie'
]
export default {
  components: {
    'formsCreateclass': require('components/Forms/createClass.vue').default
  },
  name: 'MyLayout',
  data () {
    return {
      text: '',
      options: null,
      filteredOptions: [],
      addClassDialog: false,
      userFire: []
    }
  },
  computed: {
    ...mapGetters('admin', ['userDetails'])
  },
  methods: {
    ...mapActions('admin', ['signOutNow']),
    signOutNow () {
      // console.log('test')
      let vm = this
      fireAuth
        .signOut()
        .then(function () {
          // Sign-out successful.
          console.log('signout')
          LocalStorage.set('uid', '')
          vm.$router.replace('/auth')
        })
        .catch(function (error) {
          console.log(error)
          // An error happened.
        })
    },
    addClass () {
      this.addClassDialog = true
    },
    filter (val, update) {
      if (this.options === null) {
        // load data
        setTimeout(() => {
          this.options = stringOptions
          this.$refs.search.filter('')
        }, 2000)
        update()
        return
      }
      if (val === '') {
        update(() => {
          this.filteredOptions = this.options.map(op => ({ label: op }))
        })
        return
      }
      update(() => {
        this.filteredOptions = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...this.options
            .filter(op => op.toLowerCase().includes(val.toLowerCase()))
            .map(op => ({ label: op }))
        ]
      })
    }

  },
  created () {
  }

}
</script>

<style lang="sass">
.bg
  background-image: url('/statics/svgBG/jie1.png')
  background-size: cover

.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-signed-in
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
