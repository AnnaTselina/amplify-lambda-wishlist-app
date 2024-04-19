import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import WishlistEventHandler from "./handler.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const wishlistEventHandlerInstance = new WishlistEventHandler(ddbDocClient);
  console.log(`EVENT: ${JSON.stringify(event)}`);

  if (event.path !== "/wishlist") {
    return wishlistEventHandlerInstance.constructResponseObject(
      500,
      false,
      "Internal server error"
    );
  }

  return await wishlistEventHandlerInstance.handleRoute(event);
};
