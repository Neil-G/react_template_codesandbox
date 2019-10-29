import login from "./login"
import loginWithToken from "./loginWithToken"
import generatedMutations from "./mutations"

export default {
  login,
  loginWithToken,
  ...generatedMutations
};
