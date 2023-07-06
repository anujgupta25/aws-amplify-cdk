import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as iam from "aws-cdk-lib/aws-iam";
import { aws_amplify as amplify } from "aws-cdk-lib";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { AwsAmplifyStackProps } from "../bin/types";
import { getSSMSecret } from "../util";
import { exec } from "child_process";
export class AwsAmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsAmplifyStackProps) {
    super(scope, id, props);

    if(!process.env.GIT_TOKEN){
      console.log("Git token is required ...")
      process.exit(1)
    }
   
    const role = new iam.Role(this, "Role", {
      roleName: props.roleName,
      description: props.roleDesc,
      assumedBy: new iam.ServicePrincipal("amplify.amazonaws.com"),
    });

    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess-Amplify")
    );

    const secret = secretsmanager.Secret.fromSecretNameV2(
      this,
      "githubSecret",
      "test_token"
    );
    secret.grantRead(role);

    const buildYaml = `
version: "1.0"
frontend:
  phases:
    preBuild:
      commands:
        - echo xyz...
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
`;
    const amplifyApp = new amplify.CfnApp(this, "Amplify CDKK", {
      name: "Amplify CDKK",
      buildSpec: buildYaml.trim(),
      environmentVariables: [
        {
          name: "someKey",
          value: "someValue-",
        },
      ],
      basicAuthConfig: {
        enableBasicAuth: true,
        password: "test0123",
        username: "test",
      },
      iamServiceRole: "ced-app-backend",
      autoBranchCreationConfig: {
        framework: "react",
        autoBranchCreationPatterns: ["feature-local-verify"],
        enableAutoBranchCreation: true,
        enableAutoBuild: true,
        enablePerformanceMode: false,
        enablePullRequestPreview: false,
      },
      customRules: [
        {
          source: "**/SOURCE/**",
          target: "**/TARGET/**",
          status: "TRUE",
        },
      ],
      repository: "https://github.com/anujgupta2559/react-boilerplate.git",
      accessToken: process.env.GIT_TOKEN,
    });

    new amplify.CfnBranch(this, "main", {
      appId: amplifyApp.attrAppId,
      branchName: "main",
      enablePullRequestPreview: true,
    });
  }
}
