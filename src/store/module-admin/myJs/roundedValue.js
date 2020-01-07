import addLodash from 'lodash/add.js'
import floorLodash from 'lodash/floor.js'
import round from 'lodash/round.js'
export function calCuRounded (data) {
  return new Promise((resolve, reject) => {
    // let _oneThird = _.divide(1,3)
    let prelimCummu = data.prelim * 1 / 3
    let prelimCummuROUNDED = round(prelimCummu, 5)
    // end prelim cumulative rounded

    // midterm cumulative rounded
    // let _twoThird = _.divide(2,3)
    let midtermCummu = data.midterm * 2 / 3
    let midtermCummuRounded = round(midtermCummu, 5)
    let finalMIDCummu = round(addLodash(midtermCummuRounded, prelimCummuROUNDED), 5)
    let _oneThirdMIDCUMMU = round(finalMIDCummu * 1 / 3, 5)
    // end midterm cumulative rounded

    // semi cumulative rounded
    // let _twoThird = _.divide(2,3)
    let semiCummu = data.semi * 2 / 3
    let semiCummuRounded = round(semiCummu, 5)
    let finalSEMICummu = round(addLodash(semiCummuRounded, _oneThirdMIDCUMMU), 5)
    let _oneThirdSEMICUMMU = round(finalSEMICummu * 1 / 3, 5)
    // end semi cumulative rounded

    // semi cumulative rounded
    // let _twoThird = _.divide(2,3)
    let finalCummu = round(data.final * 2 / 3, 5)
    let finalFINALCummu = round(addLodash(finalCummu, _oneThirdSEMICUMMU), 5)
    let finalGradeRounded = floorLodash(finalFINALCummu, 1)
    // end semi cumulative rounded
    var remarksRound = {
      remarks: null,
      rounded: finalGradeRounded
    }

    // && data.prelim === null && data.midterm !== null && data.prelim !== null && data.prelim !== null
    if (finalGradeRounded === 0) {
      remarksRound.remarks = 'No Grade'
    } else if (finalGradeRounded <= 1.2) {
      remarksRound.remarks = 'Excellent'
    } else if (finalGradeRounded <= 1.6) {
      remarksRound.remarks = 'Very Satisfactory'
    } else if (finalGradeRounded <= 2) {
      remarksRound.remarks = 'Satisfactory'
    } else if (finalGradeRounded <= 2.5) {
      remarksRound.remarks = 'Fair'
    } else if (finalGradeRounded <= 3) {
      remarksRound.remarks = 'Poor'
    } else if (finalGradeRounded > 3) {
      remarksRound.remarks = 'Failed'
    } else {
      console.log(remarksRound)
    }

    resolve(remarksRound)
  })
}
