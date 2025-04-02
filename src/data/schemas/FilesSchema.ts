/**
 * Date created : 24/10/2024
 *
 * Author : Nothile Moyo
 *
 * Description : GraphQL file schema description file
 *
 * Queries and mutations for the file info in the database is hooked up here
 *
 */

import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

// Defining our query in order to get all the fileNames
// Queries have a name, and the fields have a type which is a GraphQLObjectType
// They also have args which are parameters passed through from the front end
// resolve is being the field
const FileQueries = new GraphQLObjectType({
  name: "fileQueries",
  fields: {
    GetFilesResponse: {
      type: new GraphQLObjectType({
        name: "getFiles",
        fields: {
          filePath: {
            type: GraphQLString,
          },
          fileName: {
            type: GraphQLString,
          },
        },
      }),
      resolve: () => {},
    },
  },
});

// Defining our
const FileMutations = new GraphQLObjectType({
  name: "fileMutations",
  fields: {
    AddFileDetailsResponse: {
      type: new GraphQLObjectType({
        name: "AddFile",
        fields: {
            
        },
      }),
      resolve: () => {},
    },
  },
});

const FilesSchema = new GraphQLSchema({
  query: FileQueries,
  mutation: FileMutations,
});

export default FilesSchema;
