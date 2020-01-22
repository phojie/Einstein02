import Vue from 'vue'
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
}

export function commitRegistrarStudentLists (state, payload) {
  // console.log(payload)
  Vue.set(state.studentLists, payload.keyIndex, payload)
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
