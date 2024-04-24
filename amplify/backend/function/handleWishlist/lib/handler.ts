import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
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
  constructResponseObject(status, success, message?, data?) {
    return {
      ...this.responseObject,
      statusCode: status,
      body: JSON.stringify({ success, message, data }),
    };
  }
  async handleRoute(event) {
    switch (event.httpMethod) {
      case "GET":
        return await this.getWishlists(event);
      case "POST":
        return await this.createWishlist(event);
      case "PUT":
        return await this.updateWishlist(event);
      case "DELETE":
        return await this.deleteWishlist(event);
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

    const userCognitoIdentityId =
      event.requestContext.identity.cognitoIdentityId;

    try {
      //check if there is user and create if there is no
      const user = await this.dbClient.send(
        new GetCommand({
          TableName: "usersWishlists-dev",
          Key: {
            cognitoIdentityId: userCognitoIdentityId,
          },
        })
      );

      if (!user.Item) {
        await this.dbClient.send(
          new PutCommand({
            TableName: "usersWishlists-dev",
            Item: {
              cognitoIdentityId: userCognitoIdentityId,
              wishlists: {},
            },
          })
        );
      }

      const timestamp = new Date().getTime() * 1000;

      const newWishlist = {
        name: wishlistName,
        id: `wishlist#${timestamp}`,
      };

      const command = new UpdateCommand({
        TableName: "usersWishlists-dev",
        Key: {
          cognitoIdentityId: userCognitoIdentityId,
        },
        UpdateExpression: `SET wishlists.#wishlistKey = :newWishlist`,
        ExpressionAttributeValues: {
          ":newWishlist": newWishlist,
        },
        ExpressionAttributeNames: {
          "#wishlistKey": newWishlist.id,
        },
        ReturnValues: "UPDATED_NEW",
      });

      const response = await this.dbClient.send(command);

      return this.constructResponseObject(
        201,
        true,
        null,
        response.Attributes.wishlists
      );
    } catch (err) {
      return this.constructResponseObject(
        500,
        false,
        err.message || "Internal server error"
      );
    }
  }
  async getWishlists(event) {
    try {
      const wishlists = await this.dbClient.send(
        new GetCommand({
          TableName: "usersWishlists-dev",
          Key: {
            cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
          },
        })
      );

      return this.constructResponseObject(200, true, null, wishlists.Item);
    } catch (err) {
      return this.constructResponseObject(
        500,
        false,
        err.message || "Internal server error"
      );
    }
  }
  async updateWishlist(event) {
    try {
      const userCognitoIdentityId =
        event.requestContext.identity.cognitoIdentityId;
      const parsedBody = JSON.parse(event.body);

      //find wishlist
      const userWishlists = await this.dbClient.send(
        new GetCommand({
          TableName: "usersWishlists-dev",
          Key: {
            cognitoIdentityId: userCognitoIdentityId,
          },
        })
      );

      if (!userWishlists.Item || !parsedBody.id) {
        return this.constructResponseObject(
          400,
          false,
          "User wishlists not found or wishlist id not provided."
        );
      }

      const wishlistToUpdate = userWishlists.Item.wishlists[parsedBody.id];

      const command = new UpdateCommand({
        TableName: "usersWishlists-dev",
        Key: {
          cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
        },
        UpdateExpression: `SET wishlists.#wishlistKey = :updateWishlist`,
        ExpressionAttributeValues: {
          ":updateWishlist": { ...wishlistToUpdate, ...parsedBody.updated },
        },
        ExpressionAttributeNames: {
          "#wishlistKey": wishlistToUpdate.id,
        },
        ReturnValues: "ALL_NEW",
      });

      const response = await this.dbClient.send(command);

      return this.constructResponseObject(
        200,
        true,
        null,
        response.Attributes.wishlists[wishlistToUpdate.id]
      );
    } catch (err) {
      return this.constructResponseObject(
        500,
        false,
        err.message || "Internal server error"
      );
    }
  }
  async deleteWishlist(event) {
    try {
      const userCognitoIdentityId =
        event.requestContext.identity.cognitoIdentityId;

      // //find wishlist
      const userWishlists = await this.dbClient.send(
        new GetCommand({
          TableName: "usersWishlists-dev",
          Key: {
            cognitoIdentityId: userCognitoIdentityId,
          },
        })
      );

      if (!userWishlists.Item || !event.queryStringParameters.id) {
        return this.constructResponseObject(
          400,
          false,
          "User wishlists not found or wishlist id not provided."
        );
      }

      const wishlistToDelete =
        userWishlists.Item.wishlists[event.queryStringParameters.id];

      if (!wishlistToDelete) {
        return this.constructResponseObject(400, false, "Wishlist not found.");
      }

      const command = new UpdateCommand({
        TableName: "usersWishlists-dev",
        Key: {
          cognitoIdentityId: event.requestContext.identity.cognitoIdentityId,
        },
        UpdateExpression: `REMOVE wishlists.#wishlistKey`,
        ExpressionAttributeNames: {
          "#wishlistKey": wishlistToDelete.id,
        },
        ReturnValues: "NONE",
      });

      await this.dbClient.send(command);

      return this.constructResponseObject(200, true, null);
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
