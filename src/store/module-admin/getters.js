import filter from 'lodash/filter.js'
import sortBy from 'lodash/sortBy.js'

export function myClassLists (state) {
  var data = filter(state.myClassLists, 'keyIndex')
  let sorted = sortBy(data, [function (val) {
    return val.lastname
  }])
  return sorted
}

export function studentLists (state) {
  // var data = filter(state.studentLists, 'keyIndex')
  return state.studentLists
}

export function classLists (state) {
  // filter(state.classLists, 'keyIndex')
  return state.classLists
}

export function userDetails (state) {
  return state.userDetails
}

export function fireDetails (state) {
  return state.fireDetails
}
