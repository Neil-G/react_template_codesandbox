import login from './login'
import loginWithToken from './loginWithToken'
import generatedMutations from './mutations'
import generatedQueries from './queries'

export default {
  login,
  loginWithToken,
  ...generatedMutations,
  ...generatedQueries,
}
