/**
 * Date created : 30/07/2024
 *
 * Author : Nothile Moyo
 *
 * Description : GraphQL file to hold everything
 *
 */

import AuthSchema from "./schemas/AuthSchema";
import ChatSchema from "./schemas/ChatSchema";
import PostSchema from "./schemas/PostSchema";
import ErrorSchema from "./schemas/ErrorSchema";
import FilesSchema from "./schemas/FilesSchema";

const schemas = {
  AuthSchema: AuthSchema,
  ChatSchema: ChatSchema,
  ErrorSchema: ErrorSchema,
  PostSchema: PostSchema,
  FilesSchema: FilesSchema,
};

export default schemas;
