import * as fs from 'node:fs/promises'

async function readPuzzle() {
  try {
    return await fs.readFile('./2.txt', 'utf8')
  } catch (err) {
    console.error('Error occurred while reading puzzle!', err)
  }
}

// rock paper scissors
const checkStatusScore = (opponent, me) => {
  if (me === 'X') {
    if (opponent === 'A') {
      return 3
    }
    if (opponent === 'B') {
      return 1
    }
    if (opponent === 'C') {
      return 2
    }
  }

  if (me === 'Y') {
    if (opponent === 'A') {
      return 1
    }
    if (opponent === 'B') {
      return 2
    }
    if (opponent === 'C') {
      return 3
    }
  }

  if (me === 'Z') {
    if (opponent === 'A') {
      return 2
    }
    if (opponent === 'B') {
      return 3
    }
    if (opponent === 'C') {
      return 1
    }
  }
}

const statusScore = {
  X: 0,
  Y: 3,
  Z: 6,
}

// first part
readPuzzle().then((data) => {
  const dataList = data.split('\n')
  let scores = 0
  dataList.forEach((round) => {
    const [opponent, me] = round.split(' ')
    scores += checkStatusScore(opponent, me)
    scores += statusScore[me]
  })

  console.log(scores)
})
