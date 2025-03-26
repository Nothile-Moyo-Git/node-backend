/**
 *
 * Author : Nothile Moyo
 *
 * Date created : 12/06/2024
 *
 * Files model definition
 *
 * This file houses the schema definition for the files collection in the backend
 */

import mongoose, { Model } from "mongoose";
import { FilesInterface } from "../@types";

// Setting our types to be used in Mongoose
type FilesModel = Model<FilesInterface>;

// Define our schema for the Files collection in the backend using Mongoose
const fileSchema = new mongoose.Schema<FilesInterface>({
  files: {
    required: true,
    type: [
      {
        fileName: String,
        filePath: String,
      },
    ],
  },
});

// Create our model for exporting
const Files = mongoose.model<FilesInterface, FilesModel>("Files", fileSchema);

export default Files;
