import * as fs from 'node:fs/promises'

async function readPuzzle() {
  try {
    return await fs.readFile('./1.txt', 'utf8')
  } catch (err) {
    console.error('Error occurred while reading puzzle!', err)
  }
}

// first part
// readPuzzle().then((data) => {
//   const dataList = data.split('\n')
//   let max = 0
//   let temp = []
//   dataList.forEach((num, i) => {
//     if (num === '' || i === dataList.length - 1) {
//       const sum = temp.reduce((res, n) => res + +n, 0)
//       if (sum > max) {
//         max = sum
//       }
//       temp = []

//       return
//     }

//     temp.push(num)
//   })

//   console.log(max)
// })

// second part
readPuzzle().then((data) => {
  const dataList = data.split('\n')
  let max = [0, 0, 0]
  let temp = []
  dataList.forEach((num, i) => {
    if (num === '' || i === dataList.length - 1) {
      const sum = temp.reduce((res, n) => res + +n, 0)
      max = [...max, sum].sort((a, b) => b - a).slice(0, 3)
      temp = []

      return
    }

    temp.push(num)
  })

  console.log(max.reduce((res, n) => n + res, 0))
})
