import * as fs from 'node:fs/promises'

async function readPuzzle() {
  try {
    return await fs.readFile('./10.txt', 'utf8')
  } catch (err) {
    console.error('Error occurred while reading puzzle!', err)
  }
}

const signalStrengthCycleOrder = [20, 60, 100, 140, 180, 220]

// part one
// ;(async () => {
//   const data = await readPuzzle()
//   const dataList = data.split('\n')
//   let queue = [0]
//   let temp = 1
//   let sum = 0

//   for (let i = 0; i < 220; i++) {
//     const currentSignal = dataList[i]
//     const val =
//       !currentSignal || currentSignal === 'noop'
//         ? [0]
//         : [0, +currentSignal.split(' ')[1]]
//     queue = [...queue, ...val]
//     let queueVal = queue.shift() || 0
//     temp += queueVal
//     console.log(temp)
//     if (signalStrengthCycleOrder.includes(i + 1)) {
//       sum += (i + 1) * temp
//     }
//   }

//   console.log(sum)
// })()

;(async () => {
  const data = await readPuzzle()
  const dataList = data.split('\n')
  let queue = [0]
  let CRT = ''
  let temp = 1

  for (let i = 0; i < 240; i++) {
    const currentSignal = dataList[i]
    const val =
      !currentSignal || currentSignal === 'noop'
        ? [0]
        : [0, +currentSignal.split(' ')[1]]
    queue = [...queue, ...val]
    let queueVal = queue.shift() || 0
    temp += queueVal

    CRT =
      CRT +
      ([temp - 1, temp, temp + 1].includes(i % 40) ? '#' : '.') +
      ((i + 1) % 40 === 0 ? '\n' : '')
  }

  console.log(CRT)
})()
