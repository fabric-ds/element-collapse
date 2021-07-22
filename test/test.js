import cypress from 'cypress'
import { init } from './serve.js'

let exitCode
const server = await init()
try {
  const results = await cypress.run()
  exitCode = results.totalFailed === 0 ? 0 : 1
} catch (err) {
  console.error("Testing failed with", e)
} finally {
  await server.close()
  process.exit(exitCode)
}
