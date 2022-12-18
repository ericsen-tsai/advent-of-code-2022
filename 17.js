import readPuzzle from './readPuzzle.js'

const rockShapes = [
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [[1], [1], [1], [1]],
  [
    [1, 1],
    [1, 1],
  ],
]

const isOverlap = (shape, position, map) => {
  const { x, y } = position
  for (let i = x; i < shape.length; i++) {
    for (let j = y; j < shape[0].length; j++) {
      if (map[i][j] + shape[i - x][j - y] === 2) return true
    }
  }
  return false
}

const canGo = ({ rockType, rockPosition }, direction, map) => {
  const { x, y } = rockPosition
  const newY = direction === 'down' ? y - 1 : y
  const newX = direction === 'right' ? x + 1 : direction === 'left' ? x - 1 : x
  if (isOverlap(rockShapes[rockType], { x: newX, y: newY }, map)) {
    return false
  }
  return true
}

const restRock = ({ rockType, rockPosition }, map) => {
  const newMap = JSON.parse(JSON.stringify(map))
  const shape = rockShapes[rockType]
  const { x, y } = rockPosition

  for (let i = x; i < shape.length; i++) {
    for (let j = y; j < shape[0].length; j++) {
      if (shape[i - x][j - y]) {
        newMap[i][j] = 1
      }
    }
  }

  return newMap
}

const spawnRock = (map) => {
  const newMap = JSON.parse(JSON.stringify(map))

  const getCurrentTallInd = () => {
    for (let i = map.length - 1; i >= 0; i--) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j]) {
          return i
        }
      }
    }
  }
  const currentTallInd = getCurrentTallInd()

  for (let i = currentTallInd + 1; i < currentTallInd + 7; i++) {
    if (currentTallInd < map.length - 1) continue
    newMap.push(new Array(7).fill(0))
  }

  return {
    map: newMap,
    rockPosition: {
      x: currentTallInd + 3,
      y: 2,
    },
  }
}

;(async () => {
  const data = await readPuzzle({ filePath: './17.txt' })
  const jets = data.split('').map((s) => (s === '<' ? 'left' : 'right'))

  const map = []
})()
