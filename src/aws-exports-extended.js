import config from "./aws-exports.js";

const updatedConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/sign-in-redirect/"
        : config.oauth.redirectSignIn,
    redirectSignOut:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : config.oauth.redirectSignIn,
  },
};

export default updatedConfig;
