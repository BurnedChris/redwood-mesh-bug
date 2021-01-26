export const profile = async ({}, { context }) => {
  if (!context.currentUser) {
    return null
  }

  return context.currentUser
}
