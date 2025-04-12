/**
 * Date created : 02/04/2024
 *
 * Author : Nothile Moyo
 *
 * Description : GraphQL file schema description file
 *
 * Queries and mutations for the file info in the database is hooked up here
 *
 */

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { GetFilePathsResolver } from "../resolvers/FileResolvers";

const FileType = new GraphQLObjectType({
  name: "files",
  fields: {
    filePath: { type: GraphQLString },
    fileName: { type: GraphQLString },
  },
});

// Defining our query in order to get all the fileNames
// Queries have a name, and the fields have a type which is a GraphQLObjectType
// They also have args which are parameters passed through from the front end
// resolve is being the field
const FileQueries = new GraphQLObjectType({
  name: "fileQueries",
  fields: {
    GetFilePathsResponse: {
      type: new GraphQLObjectType({
        name: "getFilePaths",
        fields: {
          status: {
            type: GraphQLInt,
          },
          files: {
            type: new GraphQLList(FileType),
          },
        },
      }),
      resolve: GetFilePathsResolver,
    },
  },
});

const FilesSchema = new GraphQLSchema({
  query: FileQueries,
});

export default FilesSchema;
