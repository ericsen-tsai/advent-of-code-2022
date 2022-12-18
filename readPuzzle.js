import * as fs from 'node:fs/promises'

async function readPuzzle() {
  try {
    return await fs.readFile('./10.txt', 'utf8')
  } catch (err) {
    console.error('Error occurred while reading puzzle!', err)
  }
}

export default readPuzzle
