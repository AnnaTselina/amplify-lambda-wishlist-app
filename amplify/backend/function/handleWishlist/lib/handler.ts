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
        return await this.createWishlist(event);
      default:
        return this.constructResponseObject(
          404,
          true,
          "No handler for this route"
        );
    }
  }
  async createWishlist(event) {
    const wishlistName = JSON.parse(event.body).name;

    if (!wishlistName) {
      return this.constructResponseObject(
        400,
        false,
        "Wishlist name has to be provided."
      );
    }

    try {
      await this.dbClient.send(
        new PutCommand({
          TableName: "WishlistsTable-dev",
          Item: {
            id: uuidv4(),
            name: wishlistName,
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
