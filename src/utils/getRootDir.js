import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { findUp } from 'find-up'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getProjectRoot = async () => {
  const projectRoot = await findUp('package.json', { cwd: __dirname })
  return dirname(projectRoot)
}

export const getRootDir = async () => {
  try {
    const root = await getProjectRoot()
    return root
  } catch (error) {
    throw new Error('Error finding root path:', error)
  }
}
