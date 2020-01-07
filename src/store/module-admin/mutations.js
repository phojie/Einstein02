import Vue from 'vue'
import forEach from 'lodash/forEach.js'
import find from 'lodash/find.js'

export function clearMyClass (state, payload) {
  state.myClassLists = {}
}

export function deleteMyclassStudents (state, payload) {
  Vue.delete(
    state.myClassLists,
    payload.studentIndex
  )
}

export function commitGetMyclassStudents (state, payload) {
  let studentInfo = find(state.studentLists, ['keyIndex', payload.studentIndex])
  let allData = { ...studentInfo, ...payload }
  Vue.set(state.myClassLists, payload.studentIndex, allData)
}

export function commitRegistrarStudentLists (state, payload) {
  forEach(payload, function (value, key) {
    var dataStu = {
      firstname: value.fields.firstname.stringValue,
      lastname: value.fields.surname.stringValue,
      middlename: value.fields.middlename.stringValue,
      fullname: value.fields.firstname.stringValue + ' ' + value.fields.surname.stringValue,
      keyIndex: value.fields.keyIndex.stringValue,
      course: value.fields.course.stringValue,
      profileImgUrl: value.fields.profileImgUrl.stringValue
    }
    Vue.set(state.studentLists, key, dataStu)
    // console.log(state.studentLists)
  })
}

export function commitGetClassLists (state, payload) {
  Vue.set(state.classLists, payload.keyIndex, payload)
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
