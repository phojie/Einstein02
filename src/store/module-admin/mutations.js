import Vue from 'vue'
import forEach from 'lodash/forEach.js'
import capitalize from 'lodash/capitalize.js'
import { myAcroCourse } from './myJs/myAcroCourse'
// import find from 'lodash/find'

export function clearMyClass (state, payload) {
  state.myClassLists = {}
}

export function commitDeleteMyclassStudents (state, payload) {
  console.log(payload)
  Vue.delete(
    state.myClassLists,
    payload.studentIndex
  )
}

export function commitGetMyclassStudents (state, payload) {
  Vue.set(state.myClassLists, payload.studentIndex, payload)
  // })
}

export function commitRegistrarStudentLists (state, payload) {
  forEach(payload, function (value, key) {
    myAcroCourse(value.fields.course.stringValue).then(function (result) {
      var dataStu = {
        firstname: capitalize(value.fields.firstname.stringValue),
        lastname: capitalize(value.fields.surname.stringValue),
        middlename: capitalize(value.fields.middlename.stringValue),
        fullname: capitalize(value.fields.firstname.stringValue + ' ' + value.fields.surname.stringValue),
        keyIndex: value.fields.keyIndex.stringValue,
        course: result,
        profileImgUrl: value.fields.profileImgUrl.stringValue
      }
      Vue.set(state.studentLists, key, dataStu)
    })
    // console.log(state.studentLists)
  })
}

export function commitGetClassLists (state, payload) {
  Vue.set(state.classLists, payload.keyIndex, payload)
}

export function commitGetClassListsStudents (state, payload) {
  Vue.set(state.myAllstudents, payload.keyIndex, payload)
}

export function deleteClassList (state, payload) {
  Vue.delete(
    state.classLists,
    payload.keyIndex
  )
}

export function commitFirstLogin (state, payload) {
  state.firstLogin = payload
  console.log(state.firstLogin)
}

export function commitGetUserDetails (state, payload) {
  state.userDetails = payload
}
