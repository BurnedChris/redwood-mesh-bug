export const QUERY = gql`
  query ProfileQuery {
    profile {
      email
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ profile }) => {
  return JSON.stringify(profile)
}
