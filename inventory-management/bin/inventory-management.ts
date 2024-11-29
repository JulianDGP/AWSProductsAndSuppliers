#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InventoryManagementStack } from '../lib/inventory-management-stack';
import { DatabaseStack } from '../lib/database-stack';

const app = new cdk.App();

// Carga el stack principal
new InventoryManagementStack(app, 'InventoryManagementStack', {
});

// Carga el stack de la base de datos
new DatabaseStack(app, 'DatabaseStack');

