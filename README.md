## About

This is a training project to explore opportunities of AWS Serverless.
Amazon services that are used: Amplify, Cognito, IAM, API Gateway, Lambda, DynamoDB.

[Schema of AWS Services and interactions]: (https://app.eraser.io/workspace/Ot8JcfetK5mPsqTIno59)

<img width="631" alt="image" src="https://github.com/AnnaTselina/amplify-lambda-wishlist-app/assets/55737365/7626913a-ac04-4fed-991f-b37e2d7f0e22">

Lambda function is using lambda layer to encapsulate node_modules (layer can be reused across miltiple lambda functions).
Unfortunately, native lambda functions can't be written and pushed to AWS in TypeScript. Nice workaround that is implemented in that project is described [here](https://betterprogramming.pub/converting-amplify-lambdas-to-typescript-e97dc9f1eed2).

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
