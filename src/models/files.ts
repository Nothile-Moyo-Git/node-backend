/**
 *
 * Date created : 01/04/2024
 *
 * Author : Nothile Moyo
 *
 * File Model description
 * Handles the typing for the image urls that will be used for the carousel on production
 *
 * This model is referenced in the resolver file as object instances which handle the ORM functionality for mongoose
 *
 * Note: Static methods are used here since we don't always need to instantiate our Object (e.g deletion)
 *
 * Note: The typing for this should be done as a generic when updating the type
 *
 */

import mongoose, { Model } from "mongoose";
import { FilesInterface } from "../@types/index";

// Setting our types to be used in Mongoose
type FilesModel = Model<FilesInterface, object, object>;

// Define our schema for the Chat collection in the backend using Mongoose
const fileSchema = new mongoose.Schema<FilesInterface>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create our model for exporting
const Files = mongoose.model<FilesInterface, FilesModel>("File", fileSchema);

export default Files;
