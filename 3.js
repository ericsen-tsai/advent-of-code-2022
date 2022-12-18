import * as fs from 'node:fs/promises'

async function readPuzzle() {
  try {
    return await fs.readFile('./3.txt', 'utf8')
  } catch (err) {
    console.error('Error occurred while reading puzzle!', err)
  }
}

const findItemType = (rucksack) => {
  const compartmentLength = rucksack.length / 2
  const firstCompartmentLetters = rucksack.slice(0, compartmentLength).split('')
  const secondCompartmentLetters = rucksack.slice(compartmentLength).split('')
  return firstCompartmentLetters.find((l) =>
    secondCompartmentLetters.includes(l)
  )
}

const priority = (l) =>
  l.charCodeAt() - 96 > 0 ? l.charCodeAt() - 96 : l.charCodeAt() - 38

// first part
// readPuzzle().then((data) => {
//   const dataList = data.split('\n')
//   console.log(
//     dataList
//       .map((rucksack) => {
//         const itemType = findItemType(rucksack)
//         return itemType
//       })
//       .reduce((sum, itemType) => sum + priority(itemType), 0)
//   )
// })

const grouping = (d) =>
  d.reduce((res, rucksack) => {
    if (res.length === 0) {
      return [[rucksack]]
    }
    if (res[res.length - 1].length === 3) {
      return [...res, [rucksack]]
    }
    res[res.length - 1].push(rucksack)
    return res
  }, [])

const findBadgeItemType = (group) => {
  const [rucksackOneLetters, rucksackTwoLetters, rucksackThreeLetters] =
    group.map((g) => g.split(''))
  const matchingLetters = rucksackOneLetters.filter((l) =>
    rucksackTwoLetters.includes(l)
  )

  return matchingLetters.find((l) => rucksackThreeLetters.includes(l))
}

// second part
readPuzzle().then((data) => {
  const dataList = data.split('\n')
  const groups = grouping(dataList)
  console.log(
    groups
      .map((group) => findBadgeItemType(group))
      .reduce((sum, itemType) => sum + priority(itemType), 0)
  )
})
