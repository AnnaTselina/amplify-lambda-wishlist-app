export type SimpleError = {
  message: string;
};

export enum AmplifySignUpResult {
  CONFIRM_SIGN_UP = "CONFIRM_SIGN_UP",
  COMPLETE_AUTO_SIGN_IN = "COMPLETE_AUTO_SIGN_IN",
  DONE = "DONE",
}
