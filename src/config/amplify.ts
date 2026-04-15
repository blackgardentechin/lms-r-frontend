import type { ResourcesConfig } from 'aws-amplify';

export const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_COGNITO_HOSTED_UI_DOMAIN,
          scopes: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
          redirectSignIn: [import.meta.env.VITE_COGNITO_REDIRECT_SIGN_IN],
          redirectSignOut: [import.meta.env.VITE_COGNITO_REDIRECT_SIGN_OUT],
          responseType: 'code',
        },
      },
    },
  },
};
