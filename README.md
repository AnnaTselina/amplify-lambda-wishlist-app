## About

This is a training project to explore opportunities of AWS Serverless.
Amazon services that are used: Amplify, Cognito, IAM, API Gateway, Lambda, DynamoDB.

[Schema of AWS Services and interactions]: (https://app.eraser.io/workspace/Ot8JcfetK5mPsqTIno59)

<img width="485" alt="image" src="https://github.com/AnnaTselina/amplify-lambda-wishlist-app/assets/55737365/bbf2c68b-f5b9-4f4b-8d48-0c9de268e2fe">

Lambda function is using lambda layer to encapsulate node_modules (layer can be reused across miltiple lambda functions).
Unfortunately, native lambda functions can't be written and pushed to AWS in TypeScript. Nice workaround that is implemented in that project is described [here](https://medium.com/@anuragchitti1103/creating-lambda-layer-with-node-js-6a5ecd7c7553).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
