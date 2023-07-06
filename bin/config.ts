import { AwsAmplifyStackProps } from './types';

export const stackConfig: AwsAmplifyStackProps = {
  roleName: 'amplify-role',
  roleDesc: 'role used for amplify',
  secretName: 'githubToken',
  appName: 'test-cdk',
  appDesc: 'amplify webshop',
  gitOwner: 'anujgupta2559',
  gitRepo: 'react-boilerplate',
  gitBranch: 'main',
};