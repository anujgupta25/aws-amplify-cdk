#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsAmplifyStack } from "../lib/aws-amplify-stack";
import { stackConfig } from "./config";

(function () {
  //   if (!process.env.GIT_TOKEN) {
  //     console.error("Github token not found");
  //     process.exit(1);
  //   }

  const app = new cdk.App();
  new AwsAmplifyStack(app, "amplify-stack", stackConfig);

  function func1() {
    console.log("From func1");
  }

  function func2() {
    console.log("From func2");
  }
})();
