import * as cdk from "aws-cdk-lib";
import * as rds from "aws-cdk-lib/aws-rds";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class DatabaseStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Crear una VPC (Requisito para RDS)
    // La VPC proporciona aislamiento de red y seguridad.
    const vpc = new ec2.Vpc(this, "DatabaseVpc", {
      ipAddresses: ec2.IpAddresses.cidr("10.1.0.0/16"), // Cambia el bloque CIDR principal para evitar conflictos con otras vpc existentes
      maxAzs: 2, // Necesitamos al menos 2 AZs para cumplir con los requisitos de RDS
      subnetConfiguration: [
        {
          cidrMask: 24, // Máscara de subred
          name: "PublicSubnet", // Subred pública
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24, // Máscara de subred
          name: "PrivateSubnet", // Subred privada
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Crear un grupo de seguridad para la base de datos
    const securityGroup = new ec2.SecurityGroup(this, "DatabaseSecurityGroup", {
      vpc,
      allowAllOutbound: true, // Permitir conexiones salientes
      description: "Reglas de seguridad para RDS PostgreSQL",
    });

    // Agregar una regla de entrada al grupo de seguridad para permitir conexiones desde una IP pública
    securityGroup.addIngressRule(
      ec2.Peer.ipv4('0.0.0.0/0'), // Cambia esto a IPs públicas admitidas para mayor seguridad
      ec2.Port.tcp(5432), // Puerto PostgreSQL
      'Permitir acceso al puerto 5432 para PostgreSQL'
    );

    // Crear una instancia de RDS con PostgreSQL v.13 como motor de base de datos.
    const database = new rds.DatabaseInstance(this, "RDSInstance", {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_13,
      }),
      instanceType: ec2.InstanceType.of(
        // db.t3.micro,
        ec2.InstanceClass.BURSTABLE3, // clase económica, optimizada para cargas pequeñas dentro del plan gratuito.
        ec2.InstanceSize.MICRO // Tamaño micro compatible con plan gratuito.
      ),
      credentials: rds.Credentials.fromGeneratedSecret("postgres"), // Usuario administrador generado automáticamente
      vpc, // La instancia de base de datos estará conectada a la VPC creada anteriormente.
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC, // Asegurar que la base de datos esté en una subred pública
      },
      securityGroups: [securityGroup], // Asignar el grupo de seguridad creado anteriormente
      multiAz: false, // Sin alta disponibilidad (Multi-AZ) para mantener costos bajos.
      allocatedStorage: 10, // Almacenamiento en GB
      maxAllocatedStorage: 19, // Escala hasta 19GB para no salirse del plan gratuito
      databaseName: "InventoryDB", // Nombre inicial de la base de datos.
      publiclyAccessible: true, // Hacer pública la base de datos (para pruebas)
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Eliminar la base de datos al destruir el stack
    });

    // Output 1: Dirección del endpoint de la base de datos (usada para conectarse).
    new cdk.CfnOutput(this, "DatabaseEndpoint", {
      value: database.dbInstanceEndpointAddress,
    });

    // Output 2: ARN del secreto en AWS Secrets Manager (contiene usuario y contraseña).
    new cdk.CfnOutput(this, "DatabaseSecret", {
      value: database.secret?.secretArn || "No secret generated",
    });
  }
}
