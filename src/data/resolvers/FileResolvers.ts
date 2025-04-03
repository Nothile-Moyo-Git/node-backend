/**
 *
 * Author : Nothile Moyo
 *
 * Date Created : 03/04/2025
 *
 * Description : Handle the GraphQL requests for the post middleware. This contains sessions and users
 *
 */

import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../connection";

const client = new MongoClient(MONGODB_URI);
const database = client.db("backend");
const filesCollection = database.collection("files");

/**
 * @name GetFilePathsResolver
 *
 * @description Request the information for the files from the backend so we can reference them in the carousel
 *
 */
export const GetFilePathsResolver = async () => {
  try {
    // Fetch the file names and paths from the backend and turn this into an array
    const filesCursor = filesCollection.find();
    const files = await filesCursor.toArray();

    return {
      status: 200,
      files,
    };
  } catch (error) {
    console.log("Request error: 500, read below");
    console.log(error);

    return {
      status: 500,
      files: [],
    };
  }
};
