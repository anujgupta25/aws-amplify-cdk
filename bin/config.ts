import { IAwsAmplifyStackProps } from './types';

export const stackConfig: IAwsAmplifyStackProps = {
  roleName: 'amplify-role',
  roleDesc: 'role used for amplify',
  secretName: 'githubToken',
  appName: 'test-cdk',
  appDesc: 'amplify webshop',
  gitOwner: 'anujgupta2559',
  gitRepo: 'react-boilerplate',
  gitBranch: 'main',
};