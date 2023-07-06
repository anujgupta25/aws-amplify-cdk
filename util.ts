const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

export const getSSMSecret = async (secretName : string) => {
  const client = new SecretsManagerClient({
    region: "ap-south-1",
  });

  const command = new GetSecretValueCommand({
    SecretId: secretName,
  });
  const res = await client.send(command);

  return res.SecretString
};