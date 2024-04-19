import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export interface IWishlistEventHandler {
  dbClient: DynamoDBDocumentClient;
}
