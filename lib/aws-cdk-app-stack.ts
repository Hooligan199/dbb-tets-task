import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';


export class AwsCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    new ecr.Repository(this, 'MyEcrRepository', {
            repositoryName: 'dbb-task',
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      isDefault: true, 
    });

    const securityGroup = new ec2.SecurityGroup(this, 'WebAppSecurityGroup', {
      vpc,
      description: 'Allow HTTP & HTTPS',
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP traffic'
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allow HTTPS traffic'
    );
  }
}

