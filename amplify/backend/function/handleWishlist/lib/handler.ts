import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { IWishlistEventHandler } from "./types";

class WishlistEventHandler implements IWishlistEventHandler {
  dbClient: DynamoDBDocumentClient;
  responseObject = {
    statusCode: null,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: {},
  };
  constructor(dbClient: DynamoDBDocumentClient) {
    this.dbClient = dbClient;
  }
  constructResponseObject(status, success, message?) {
    return {
      ...this.responseObject,
      statusCode: status,
      body: JSON.stringify({ success, message }),
    };
  }
  async handleRoute(event) {
    switch (event.httpMethod) {
      case "POST":
        return await this.createWishlist();
      default:
        return this.constructResponseObject(
          404,
          true,
          "No handler for this route"
        );
    }
  }
  async createWishlist() {
    try {
      await this.dbClient.send(
        new PutCommand({
          TableName: "WishlistsTable-dev",
          Item: {
            id: uuidv4(),
            name: "First ie",
          },
        })
      );
      return this.constructResponseObject(201, true);
    } catch (err) {
      return this.constructResponseObject(
        500,
        false,
        err.message || "Internal server error"
      );
    }
  }
}

export default WishlistEventHandler;
