import { SecretsManager } from "aws-sdk";
import { Client } from "pg";

export const handler = async (event: any) => {
  const secretsManager = new SecretsManager();
  const secretName = "DatabaseStackRDSInstanceSec-2o6wDb1On0Zo";

  try {
    const secret = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    const credentials = JSON.parse(secret.SecretString || "{}");

    const client = new Client({
      host: credentials.DB_HOST,
      user: credentials.DB_USER,
      password: credentials.DB_PASSWORD,
      database: credentials.DB_NAME,
      port: parseInt(credentials.DB_PORT),
    });

    await client.connect();
    const res = await client.query("SELECT * FROM products;");
    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener productos", error }),
    };
  }
};
