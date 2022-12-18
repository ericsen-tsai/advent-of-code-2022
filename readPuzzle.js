import * as fs from 'node:fs/promises'

async function readPuzzle({ filePath }) {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (err) {
    console.error('Error occurred while reading puzzle!', err)
  }
}

export default readPuzzle
