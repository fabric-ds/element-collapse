import Fastify from 'fastify'
import staticPlugin from 'fastify-static'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)

export const init = async () => {
  const server = Fastify()
  server.register(staticPlugin, { root: __dirname })
  await server.ready()

  return server
}
