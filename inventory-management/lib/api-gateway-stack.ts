import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class ApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Definir la función Lambda (asegurandose de que el archivo ya esté compilado en dist/)
    const getProductsLambda = new lambda.Function(this, "GetProductsLambda", {
      runtime: lambda.Runtime.NODEJS_18_X, // Runtime de Node.js
      handler: "get.handler", // Nombre del archivo y función exportada
      code: lambda.Code.fromAsset("../lambdas/products/dist"), // Directorio donde está el código compilado
      environment: {
        SECRET_NAME: "DatabaseStackRDSInstanceSec-2o6wDb1On0Zo", // Nombre del secreto para la base de datos
      },
    });

    // Crear un API Gateway REST API
    const api = new apigateway.RestApi(this, "ProductsApi", {
      restApiName: "Products Service",
      description: "Este API expone los productos almacenados en la base de datos.",
    });

    // Crear un recurso /products
    const products = api.root.addResource("products");

    // Vincular el método GET al recurso /products
    products.addMethod("GET", new apigateway.LambdaIntegration(getProductsLambda), {
      operationName: "GetProducts",
    });
  }
}