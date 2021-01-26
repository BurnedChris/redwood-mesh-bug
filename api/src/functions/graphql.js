import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'

import schemas from 'src/graphql/**/*.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const handler = createGraphQLHandler({
  getCurrentUser,
  schema: makeMergedSchema({
    schemas,
    services: makeServices({ services }),
  }),
  cors: {
    origin: '*',
    credentials: true,
  },

  context: ({ context, event }) => {
    console.log('========Event=======')
    console.log(event)
    console.log('=======')
    // console.log(event.requestContext)
    // console.log('========Event=======')
    return {
      ip: event?.headers['x-real-ip'] || '0.0.0.1',
      referer: event?.referer,
      origin: event?.origin,
      userAgent: event['user-agent'],
    }
  },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
