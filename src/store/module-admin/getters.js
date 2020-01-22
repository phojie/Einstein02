import filter from 'lodash/filter.js'
import sortBy from 'lodash/sortBy.js'

export function myAllstudents (state) {
  return state.myAllstudents
}

export function myClassLists (state) {
  let sorted = []
  if (state.myClassLists.length !== 0) {
    var data = filter(state.myClassLists, 'keyIndex')
    sorted = sortBy(data, [function (val) {
      return val.lastname
    }])
  }

  return sorted
}

export function studentLists (state) {
  var data = filter(state.studentLists, 'keyIndex')
  return data
}

export function classLists (state) {
  return state.classLists
}

export function userDetails (state) {
  return state.userDetails
}

export function fireDetails (state) {
  return state.fireDetails
}
