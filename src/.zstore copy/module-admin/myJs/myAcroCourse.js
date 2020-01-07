export function myAcroCourse (data) {
  return new Promise((resolve, reject) => {
    let myTrueValue = ''
    if (data === 'Criminology') {
      myTrueValue = 'BSCRIM'
    } else if (data === 'Computer science') {
      myTrueValue = 'BSCS'
    } else if (data === 'Secondary education') {
      myTrueValue = 'BSED'
    } else if (data === 'Elementary education') {
      myTrueValue = 'BEED'
    } else if (data === 'Business administration') {
      myTrueValue = 'BSBA'
    }
    resolve(myTrueValue)
  })
}
