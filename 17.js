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
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (map[i + x][j + y] + shape[i][j] === 2) return true
    }
  }
  return false
}

const shiftMap = {
  down: 0,
  left: -1,
  right: 1,
}

const canGo = ({ rockType, rockPosition }, direction, map) => {
  const { x, y } = rockPosition
  const newY = shiftMap[direction] + y
  const newX = direction === 'down' ? x - 1 : x

  if (newX < 0) return false
  if (newY + rockShapes[rockType][0].length - 1 >= 7 || newY < 0) return false
  if (isOverlap(rockShapes[rockType], { x: newX, y: newY }, map)) {
    return false
  }
  return true
}

const restRock = ({ rockType, rockPosition }, map) => {
  const newMap = JSON.parse(JSON.stringify(map))
  const shape = rockShapes[rockType]
  const { x, y } = rockPosition

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j]) {
        newMap[i + x][j + y] = 1
      }
    }
  }

  return newMap
}

const spawnRock = (map) => {
  const newMap = JSON.parse(JSON.stringify(map))
  if (!newMap.length) {
    return {
      map: Array.from(Array(7), () => new Array(7).fill(0)),
      rockPosition: {
        x: 3,
        y: 2,
      },
    }
  }
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

  for (let i = currentTallInd + 1; i < currentTallInd + 8; i++) {
    if (i < map.length - 1) continue
    newMap.push(new Array(7).fill(0))
  }

  return {
    map: newMap,
    rockPosition: {
      x: currentTallInd + 4,
      y: 2,
    },
  }
}

;(async () => {
  const data = await readPuzzle({ filePath: './17.txt' })
  const jets = data.split('').map((s) => (s === '<' ? 'left' : 'right'))

  let currentMap = []
  let rockTypeInd = 0
  let jetsInd = 0
  const getCurrentTallInd = () => {
    for (let i = currentMap.length - 1; i >= 0; i--) {
      for (let j = 0; j < currentMap[0].length; j++) {
        if (currentMap[i][j]) {
          return i
        }
      }
    }
  }

  while (true) {
    if (rockTypeInd === 1000) break

    const { map: mapAfterSpawn, rockPosition } = spawnRock(currentMap)
    // console.log(mapAfterSpawn, rockPosition)
    let rockPositionAfterSpawn = { ...rockPosition }

    const rockType = rockTypeInd % 5

    while (true) {
      const currentJetDirection = jets[jetsInd % jets.length]
      if (
        canGo(
          { rockType, rockPosition: rockPositionAfterSpawn },
          currentJetDirection,
          mapAfterSpawn
        )
      ) {
        rockPositionAfterSpawn = {
          ...rockPositionAfterSpawn,
          x: rockPositionAfterSpawn.x,
          y:
            rockPositionAfterSpawn.y +
            (currentJetDirection === 'right' ? 1 : -1),
        }
      }
      // console.log(jetsInd, currentJetDirection, rockPositionAfterSpawn)

      jetsInd += 1

      if (
        canGo(
          { rockType, rockPosition: rockPositionAfterSpawn },
          'down',
          mapAfterSpawn
        )
      ) {
        rockPositionAfterSpawn = {
          ...rockPositionAfterSpawn,
          x: rockPositionAfterSpawn.x - 1,
          y: rockPositionAfterSpawn.y,
        }

        continue
      }

      currentMap = restRock(
        { rockType, rockPosition: rockPositionAfterSpawn },
        mapAfterSpawn
      )

      break
    }

    console.dir(getCurrentTallInd() + 1)

    rockTypeInd += 1
  }

  console.log(getCurrentTallInd() + 1)
})()
