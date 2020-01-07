import { fireDB, fireAuth, fireStorage } from 'boot/firebase'
// import Vue from 'vue'
import capitalize from 'lodash/capitalize.js'
import { LocalStorage } from 'quasar'
import axios from 'axios'
import { calCuRounded } from './myJs/roundedValue'

export function saveGradeNow (context, payload) {
  let data = payload.data
  return new Promise((resolve, reject) => {
    calCuRounded(data).then(function (result) {
      console.log(result.remarks)
      let docRef = fireDB.collection('classLists/' + payload.classId + '/studentLists/').doc(payload.data.keyIndex)
      docRef.set(
        {
          studentIndex: payload.data.keyIndex,
          prelim: payload.data.prelim,
          midterm: payload.data.midterm,
          semi: payload.data.semi,
          final: payload.data.final,
          rounded: result.rounded,
          remarks: result.remarks
        },
        function (error) {
          reject(error)
        }
      )
      resolve()
    })
  })
}

export function deleteMyClassStudents (context, payload) {
  return new Promise((resolve, reject) => {
    fireDB
      .collection('classLists/' + payload.classId + '/studentLists')
      .doc(payload.data.keyIndex)
      .delete()
      .then(function () {
        resolve(payload)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export function getMyclassStudents (context, payload) {
  let vm = this
  fireDB.collection('classLists/' + payload + '/studentLists')
    .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
      snapshot.docChanges().forEach(
        function (change) {
          if (change.type === 'added' || change.type === 'modified') {
            // console.log(change.doc.data())
            context.commit('commitGetMyclassStudents', change.doc.data())
          }
          if (change.type === 'modified') {
            context.commit('commitGetMyclassStudents', change.doc.data())
          }
          if (change.type === 'removed') {
            context.commit('deleteMyclassStudents', change.doc.data())
            // console.log('Removed data: ', change.doc.data())
          }
        },
        function (error) {
          // The Promise was rejected.
          console.error(error)
        }
      )
    })

  console.log(vm.classStudentLists)
}

export function registrarStudentLists (context, payload) {
  axios.get('https://firestore.googleapis.com/v1/projects/einstein00-cf6cc/databases/(default)/documents/studentLists')
    .then((response) => {
      let data = response.data.documents
      context.commit('commitRegistrarStudentLists', data)
    })
}

export function addClassStudent (context, payload) {
  return new Promise((resolve, reject) => {
    let docRef = fireDB.collection('classLists/' + payload.classId + '/studentLists/').doc(payload.data.keyIndex)
    docRef.set(
      {
        studentIndex: payload.data.keyIndex,
        'prelim': null,
        'midterm': null,
        'semi': null,
        'final': null,
        'rounded': null,
        'remarks': null
      },
      function (error) {
        reject(error)
      }
    )
    resolve()
  })
}

export function getClassLists (context, payload) {
  let vm = this
  fireAuth.onAuthStateChanged(function (user) {
    if (user) {
      return new Promise((resolve, reject) => {
        fireDB
          .collection('classLists').where('instructorIndex', '==', user.uid)
          .onSnapshot({ includeMetadataChanges: true }, function (snapshot) {
            resolve()
            snapshot.docChanges().forEach(
              function (change) {
                if (change.type === 'added' || change.type === 'modified') {
                  var source = snapshot.metadata.fromCache
                    ? 'local cache'
                    : 'server'
                  console.log('Data came from ' + source)

                  context.commit('commitGetClassLists', change.doc.data())
                }
                if (change.type === 'modified') {
                  console.log('Modified data: ', change.doc.data())
                }
                if (change.type === 'removed') {
                  context.commit('deleteClassList', change.doc.data())
                  // console.log('Removed data: ', change.doc.data())
                }
              },
              function (error) {
                // The Promise was rejected.
                reject()
                console.error(error)
              }
            )
          })
      })
    } else {
      vm.$router.replace('/auth')
    }
  })
}

export function addClassLists (context, payload) {
  return new Promise((resolve, reject) => {
    let userId = fireAuth.currentUser.uid
    let docRef = fireDB.collection('classLists').doc()
    // let docRef = LibraryDB.collection('Statistics').doc('test').doc()
    let myId = docRef.id
    docRef.set(
      {
        instructorIndex: userId,
        keyIndex: myId,
        className: capitalize(payload.className),
        descriptiveTitle: capitalize(payload.DT),
        subjectCode: capitalize(payload.subjectCode),
        room: capitalize(payload.room),
        description: payload.description
      },
      function (error) {
        reject(error)
      }
    )
    resolve(payload)
  })
}

export function updateClassLists (context, payload) {
  return new Promise((resolve, reject) => {
    let userId = fireAuth.currentUser.uid
    let docRef = fireDB.collection('classLists').doc(payload.keyIndex)
    // let docRef = LibraryDB.collection('Statistics').doc('test').doc()
    docRef.update({
      instructorIndex: userId,
      keyIndex: payload.keyIndex,
      className: capitalize(payload.className),
      descriptiveTitle: capitalize(payload.DT),
      subjectCode: capitalize(payload.subjectCode),
      room: capitalize(payload.room),
      description: payload.description
    })
    resolve(payload)
  })
}

export function deleteClassList (context, payload) {
  return new Promise((resolve, reject) => {
    fireDB
      .collection('classLists')
      .doc(payload.keyIndex)
      .delete()
      .then(function () {
        resolve(payload)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

export function handleAuthStateChanged (context, payload) {
  let vm = this
  fireAuth.onAuthStateChanged(function (user) {
    if (user) {
      // User is Logged in.
      let userId = fireAuth.currentUser.uid
      let phoneNumber = fireAuth.currentUser.phoneNumber
      LocalStorage.set('uid', userId)
      LocalStorage.set('phoneNumber', phoneNumber)

      let userData = fireDB.collection('users').doc(userId)
      userData.get().then(doc => {
        if (!doc.exists) {
          console.log('no such document')
          LocalStorage.set('FirstLogin', true)
          // Login firsttime
        } else {
          console.log('document data: ', doc.data())
          LocalStorage.set('FirstLogin', false)
          context.commit('commitGetUserDetails')
          context.commit('commitGetUserDetails', doc.data())
        }
      })

      // vm.$router.push('/')
    } else {
      context.commit('commitGetUserDetails', {})
      // console.log('No user exist')
      vm.$router.replace('/auth')
    }
  })
}

export function getFireDetails (context, payload) {
  fireDB.collection('users').doc(payload)
    .onSnapshot({
      includeMetadataChanges: true
    }, function (doc) {
      context.commit('commitGetUserDetails', doc.data())
    })
}

export function createNewuser (context, payload) {
  const myid = fireAuth.currentUser.uid
  let docRef = fireDB.collection('users').doc(myid)
  var addData = new Promise(function (resolve, reject) {
    if (payload.profileImgUrl !== '') {
      var uploadTask = fireStorage
        .ref()
        .child('1.InstructorListsImages/' + myid + 'file/' + myid)
        .putString(payload.profileImgUrl, 'data_url')
      uploadTask.on(
        'state_changed',
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(progress)
          if (progress === 100) {
            resolve()
            // context.commit('commitLoading', false)
          } else {
            // context.commit('commitLoading', true)
          }
          // context.commit('commitLoadingProgress', payload)
        },
        function (error) {
          // Handle unsuccessful uploads
          console.log(error)
          reject()
        },
        function () {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            docRef.set({
              firstname: capitalize(payload.firstname),
              surname: capitalize(payload.surname),
              email: payload.email,
              password: payload.password,
              phoneNumber: payload.phoneNumber,
              bio: payload.bio,
              keyIndex: myid,
              profileImgUrl: downloadURL
            })
            resolve()
          })
        }
      )
    } else {
      docRef.set({
        firstname: capitalize(payload.firstname),
        surname: capitalize(payload.surname),
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.phoneNumber,
        bio: payload.bio,
        profileImgUrl: 'bsta default',
        keyIndex: myid
      })
      resolve()
    }
  })
  context.dispatch('getFireDetails', myid)
  return addData
}
