import type { SelectionSetNode, DocumentNode } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  ID: string;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: number;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A date and time, represented as an ISO-8601 string */
  DateTime: any;
};

export type Query = {
  __typename?: "Query";
  snippets: Array<Snippet>;
  snippetsAggregate: SnippetAggregateSelection;
  snippetsConnection: SnippetsConnection;
  tags: Array<Tag>;
  tagsAggregate: TagAggregateSelection;
  tagsConnection: TagsConnection;
  devices: Array<Device>;
  devicesAggregate: DeviceAggregateSelection;
  devicesConnection: DevicesConnection;
};

export type QuerySnippetsArgs = {
  where?: InputMaybe<SnippetWhere>;
  options?: InputMaybe<SnippetOptions>;
};

export type QuerySnippetsAggregateArgs = {
  where?: InputMaybe<SnippetWhere>;
};

export type QuerySnippetsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<SnippetWhere>;
  sort?: InputMaybe<Array<InputMaybe<SnippetSort>>>;
};

export type QueryTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
};

export type QueryTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
};

export type QueryTagsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<TagWhere>;
  sort?: InputMaybe<Array<InputMaybe<TagSort>>>;
};

export type QueryDevicesArgs = {
  where?: InputMaybe<DeviceWhere>;
  options?: InputMaybe<DeviceOptions>;
};

export type QueryDevicesAggregateArgs = {
  where?: InputMaybe<DeviceWhere>;
};

export type QueryDevicesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  where?: InputMaybe<DeviceWhere>;
  sort?: InputMaybe<Array<InputMaybe<DeviceSort>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createSnippets: CreateSnippetsMutationResponse;
  deleteSnippets: DeleteInfo;
  updateSnippets: UpdateSnippetsMutationResponse;
  createTags: CreateTagsMutationResponse;
  deleteTags: DeleteInfo;
  updateTags: UpdateTagsMutationResponse;
  createDevices: CreateDevicesMutationResponse;
  deleteDevices: DeleteInfo;
  updateDevices: UpdateDevicesMutationResponse;
};

export type MutationCreateSnippetsArgs = {
  input: Array<SnippetCreateInput>;
};

export type MutationDeleteSnippetsArgs = {
  where?: InputMaybe<SnippetWhere>;
  delete?: InputMaybe<SnippetDeleteInput>;
};

export type MutationUpdateSnippetsArgs = {
  where?: InputMaybe<SnippetWhere>;
  update?: InputMaybe<SnippetUpdateInput>;
  connect?: InputMaybe<SnippetConnectInput>;
  disconnect?: InputMaybe<SnippetDisconnectInput>;
  create?: InputMaybe<SnippetRelationInput>;
  delete?: InputMaybe<SnippetDeleteInput>;
  connectOrCreate?: InputMaybe<SnippetConnectOrCreateInput>;
};

export type MutationCreateTagsArgs = {
  input: Array<TagCreateInput>;
};

export type MutationDeleteTagsArgs = {
  where?: InputMaybe<TagWhere>;
  delete?: InputMaybe<TagDeleteInput>;
};

export type MutationUpdateTagsArgs = {
  where?: InputMaybe<TagWhere>;
  update?: InputMaybe<TagUpdateInput>;
  connect?: InputMaybe<TagConnectInput>;
  disconnect?: InputMaybe<TagDisconnectInput>;
  create?: InputMaybe<TagRelationInput>;
  delete?: InputMaybe<TagDeleteInput>;
  connectOrCreate?: InputMaybe<TagConnectOrCreateInput>;
};

export type MutationCreateDevicesArgs = {
  input: Array<DeviceCreateInput>;
};

export type MutationDeleteDevicesArgs = {
  where?: InputMaybe<DeviceWhere>;
};

export type MutationUpdateDevicesArgs = {
  where?: InputMaybe<DeviceWhere>;
  update?: InputMaybe<DeviceUpdateInput>;
};

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = "ASC",
  /** Sort by field values in descending order. */
  Desc = "DESC",
}

export type CreateDevicesMutationResponse = {
  __typename?: "CreateDevicesMutationResponse";
  info: CreateInfo;
  devices: Array<Device>;
};

export type CreateInfo = {
  __typename?: "CreateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
};

export type CreateSnippetsMutationResponse = {
  __typename?: "CreateSnippetsMutationResponse";
  info: CreateInfo;
  snippets: Array<Snippet>;
};

export type CreateTagsMutationResponse = {
  __typename?: "CreateTagsMutationResponse";
  info: CreateInfo;
  tags: Array<Tag>;
};

export type DateTimeAggregateSelectionNonNullable = {
  __typename?: "DateTimeAggregateSelectionNonNullable";
  min: Scalars["DateTime"];
  max: Scalars["DateTime"];
};

export type DateTimeAggregateSelectionNullable = {
  __typename?: "DateTimeAggregateSelectionNullable";
  min?: Maybe<Scalars["DateTime"]>;
  max?: Maybe<Scalars["DateTime"]>;
};

export type DeleteInfo = {
  __typename?: "DeleteInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesDeleted: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type Device = {
  __typename?: "Device";
  id: Scalars["ID"];
  isBlocked: Scalars["Boolean"];
  code: Scalars["String"];
  userAgent: Scalars["String"];
  lastUse?: Maybe<Scalars["DateTime"]>;
};

export type DeviceAggregateSelection = {
  __typename?: "DeviceAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  code: StringAggregateSelectionNonNullable;
  userAgent: StringAggregateSelectionNonNullable;
  lastUse: DateTimeAggregateSelectionNullable;
};

export type DeviceEdge = {
  __typename?: "DeviceEdge";
  cursor: Scalars["String"];
  node: Device;
};

export type DevicesConnection = {
  __typename?: "DevicesConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<DeviceEdge>;
};

export type IdAggregateSelectionNonNullable = {
  __typename?: "IDAggregateSelectionNonNullable";
  shortest: Scalars["ID"];
  longest: Scalars["ID"];
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type Snippet = {
  __typename?: "Snippet";
  id: Scalars["ID"];
  title: Scalars["String"];
  slug: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  snippet?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  tags: Array<Tag>;
  tagsAggregate?: Maybe<SnippetTagTagsAggregationSelection>;
  tagsConnection: SnippetTagsConnection;
};

export type SnippetTagsArgs = {
  where?: InputMaybe<TagWhere>;
  options?: InputMaybe<TagOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type SnippetTagsAggregateArgs = {
  where?: InputMaybe<TagWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type SnippetTagsConnectionArgs = {
  where?: InputMaybe<SnippetTagsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<SnippetTagsConnectionSort>>;
};

export type SnippetAggregateSelection = {
  __typename?: "SnippetAggregateSelection";
  count: Scalars["Int"];
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
  description: StringAggregateSelectionNullable;
  snippet: StringAggregateSelectionNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  updatedAt: DateTimeAggregateSelectionNullable;
};

export type SnippetEdge = {
  __typename?: "SnippetEdge";
  cursor: Scalars["String"];
  node: Snippet;
};

export type SnippetsConnection = {
  __typename?: "SnippetsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<SnippetEdge>;
};

export type SnippetTagsConnection = {
  __typename?: "SnippetTagsConnection";
  edges: Array<SnippetTagsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type SnippetTagsRelationship = {
  __typename?: "SnippetTagsRelationship";
  cursor: Scalars["String"];
  node: Tag;
};

export type SnippetTagTagsAggregationSelection = {
  __typename?: "SnippetTagTagsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<SnippetTagTagsNodeAggregateSelection>;
};

export type SnippetTagTagsNodeAggregateSelection = {
  __typename?: "SnippetTagTagsNodeAggregateSelection";
  tag: StringAggregateSelectionNonNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  updatedAt: DateTimeAggregateSelectionNullable;
};

export type StringAggregateSelectionNonNullable = {
  __typename?: "StringAggregateSelectionNonNullable";
  shortest: Scalars["String"];
  longest: Scalars["String"];
};

export type StringAggregateSelectionNullable = {
  __typename?: "StringAggregateSelectionNullable";
  shortest?: Maybe<Scalars["String"]>;
  longest?: Maybe<Scalars["String"]>;
};

export type Tag = {
  __typename?: "Tag";
  tag: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  snippets: Array<Snippet>;
  snippetsAggregate?: Maybe<TagSnippetSnippetsAggregationSelection>;
  snippetsConnection: TagSnippetsConnection;
};

export type TagSnippetsArgs = {
  where?: InputMaybe<SnippetWhere>;
  options?: InputMaybe<SnippetOptions>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagSnippetsAggregateArgs = {
  where?: InputMaybe<SnippetWhere>;
  directed?: InputMaybe<Scalars["Boolean"]>;
};

export type TagSnippetsConnectionArgs = {
  where?: InputMaybe<TagSnippetsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
  directed?: InputMaybe<Scalars["Boolean"]>;
  sort?: InputMaybe<Array<TagSnippetsConnectionSort>>;
};

export type TagAggregateSelection = {
  __typename?: "TagAggregateSelection";
  count: Scalars["Int"];
  tag: StringAggregateSelectionNonNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  updatedAt: DateTimeAggregateSelectionNullable;
};

export type TagEdge = {
  __typename?: "TagEdge";
  cursor: Scalars["String"];
  node: Tag;
};

export type TagsConnection = {
  __typename?: "TagsConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<TagEdge>;
};

export type TagSnippetsConnection = {
  __typename?: "TagSnippetsConnection";
  edges: Array<TagSnippetsRelationship>;
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type TagSnippetSnippetsAggregationSelection = {
  __typename?: "TagSnippetSnippetsAggregationSelection";
  count: Scalars["Int"];
  node?: Maybe<TagSnippetSnippetsNodeAggregateSelection>;
};

export type TagSnippetSnippetsNodeAggregateSelection = {
  __typename?: "TagSnippetSnippetsNodeAggregateSelection";
  id: IdAggregateSelectionNonNullable;
  title: StringAggregateSelectionNonNullable;
  slug: StringAggregateSelectionNonNullable;
  description: StringAggregateSelectionNullable;
  snippet: StringAggregateSelectionNullable;
  createdAt: DateTimeAggregateSelectionNonNullable;
  updatedAt: DateTimeAggregateSelectionNullable;
};

export type TagSnippetsRelationship = {
  __typename?: "TagSnippetsRelationship";
  cursor: Scalars["String"];
  node: Snippet;
};

export type UpdateDevicesMutationResponse = {
  __typename?: "UpdateDevicesMutationResponse";
  info: UpdateInfo;
  devices: Array<Device>;
};

export type UpdateInfo = {
  __typename?: "UpdateInfo";
  bookmark?: Maybe<Scalars["String"]>;
  nodesCreated: Scalars["Int"];
  nodesDeleted: Scalars["Int"];
  relationshipsCreated: Scalars["Int"];
  relationshipsDeleted: Scalars["Int"];
};

export type UpdateSnippetsMutationResponse = {
  __typename?: "UpdateSnippetsMutationResponse";
  info: UpdateInfo;
  snippets: Array<Snippet>;
};

export type UpdateTagsMutationResponse = {
  __typename?: "UpdateTagsMutationResponse";
  info: UpdateInfo;
  tags: Array<Tag>;
};

export type DeviceCreateInput = {
  isBlocked?: Scalars["Boolean"];
  code: Scalars["String"];
  userAgent: Scalars["String"];
  lastUse?: InputMaybe<Scalars["DateTime"]>;
};

export type DeviceOptions = {
  /** Specify one or more DeviceSort objects to sort Devices by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DeviceSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

/** Fields to sort Devices by. The order in which sorts are applied is not guaranteed when specifying many fields in one DeviceSort object. */
export type DeviceSort = {
  id?: InputMaybe<SortDirection>;
  isBlocked?: InputMaybe<SortDirection>;
  code?: InputMaybe<SortDirection>;
  userAgent?: InputMaybe<SortDirection>;
  lastUse?: InputMaybe<SortDirection>;
};

export type DeviceUpdateInput = {
  isBlocked?: InputMaybe<Scalars["Boolean"]>;
  code?: InputMaybe<Scalars["String"]>;
  userAgent?: InputMaybe<Scalars["String"]>;
  lastUse?: InputMaybe<Scalars["DateTime"]>;
};

export type DeviceWhere = {
  OR?: InputMaybe<Array<DeviceWhere>>;
  AND?: InputMaybe<Array<DeviceWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  isBlocked?: InputMaybe<Scalars["Boolean"]>;
  isBlocked_NOT?: InputMaybe<Scalars["Boolean"]>;
  code?: InputMaybe<Scalars["String"]>;
  code_NOT?: InputMaybe<Scalars["String"]>;
  code_IN?: InputMaybe<Array<Scalars["String"]>>;
  code_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  code_CONTAINS?: InputMaybe<Scalars["String"]>;
  code_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  code_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  code_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  code_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  code_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  userAgent?: InputMaybe<Scalars["String"]>;
  userAgent_NOT?: InputMaybe<Scalars["String"]>;
  userAgent_IN?: InputMaybe<Array<Scalars["String"]>>;
  userAgent_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  userAgent_CONTAINS?: InputMaybe<Scalars["String"]>;
  userAgent_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  userAgent_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  userAgent_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  userAgent_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  userAgent_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  lastUse?: InputMaybe<Scalars["DateTime"]>;
  lastUse_NOT?: InputMaybe<Scalars["DateTime"]>;
  lastUse_IN?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  lastUse_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  lastUse_LT?: InputMaybe<Scalars["DateTime"]>;
  lastUse_LTE?: InputMaybe<Scalars["DateTime"]>;
  lastUse_GT?: InputMaybe<Scalars["DateTime"]>;
  lastUse_GTE?: InputMaybe<Scalars["DateTime"]>;
};

export type SnippetConnectInput = {
  tags?: InputMaybe<Array<SnippetTagsConnectFieldInput>>;
};

export type SnippetConnectOrCreateInput = {
  tags?: InputMaybe<Array<SnippetTagsConnectOrCreateFieldInput>>;
};

export type SnippetConnectOrCreateWhere = {
  node: SnippetUniqueWhere;
};

export type SnippetConnectWhere = {
  node: SnippetWhere;
};

export type SnippetCreateInput = {
  title: Scalars["String"];
  slug: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  snippet?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<SnippetTagsFieldInput>;
};

export type SnippetDeleteInput = {
  tags?: InputMaybe<Array<SnippetTagsDeleteFieldInput>>;
};

export type SnippetDisconnectInput = {
  tags?: InputMaybe<Array<SnippetTagsDisconnectFieldInput>>;
};

export type SnippetOnCreateInput = {
  title: Scalars["String"];
  slug: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  snippet?: InputMaybe<Scalars["String"]>;
};

export type SnippetOptions = {
  /** Specify one or more SnippetSort objects to sort Snippets by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SnippetSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type SnippetRelationInput = {
  tags?: InputMaybe<Array<SnippetTagsCreateFieldInput>>;
};

/** Fields to sort Snippets by. The order in which sorts are applied is not guaranteed when specifying many fields in one SnippetSort object. */
export type SnippetSort = {
  id?: InputMaybe<SortDirection>;
  title?: InputMaybe<SortDirection>;
  slug?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  snippet?: InputMaybe<SortDirection>;
  createdAt?: InputMaybe<SortDirection>;
  updatedAt?: InputMaybe<SortDirection>;
};

export type SnippetTagsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<SnippetTagsAggregateInput>>;
  OR?: InputMaybe<Array<SnippetTagsAggregateInput>>;
  node?: InputMaybe<SnippetTagsNodeAggregationWhereInput>;
};

export type SnippetTagsConnectFieldInput = {
  where?: InputMaybe<TagConnectWhere>;
  connect?: InputMaybe<Array<TagConnectInput>>;
};

export type SnippetTagsConnectionSort = {
  node?: InputMaybe<TagSort>;
};

export type SnippetTagsConnectionWhere = {
  AND?: InputMaybe<Array<SnippetTagsConnectionWhere>>;
  OR?: InputMaybe<Array<SnippetTagsConnectionWhere>>;
  node?: InputMaybe<TagWhere>;
  node_NOT?: InputMaybe<TagWhere>;
};

export type SnippetTagsConnectOrCreateFieldInput = {
  where: TagConnectOrCreateWhere;
  onCreate: SnippetTagsConnectOrCreateFieldInputOnCreate;
};

export type SnippetTagsConnectOrCreateFieldInputOnCreate = {
  node: TagOnCreateInput;
};

export type SnippetTagsCreateFieldInput = {
  node: TagCreateInput;
};

export type SnippetTagsDeleteFieldInput = {
  where?: InputMaybe<SnippetTagsConnectionWhere>;
  delete?: InputMaybe<TagDeleteInput>;
};

export type SnippetTagsDisconnectFieldInput = {
  where?: InputMaybe<SnippetTagsConnectionWhere>;
  disconnect?: InputMaybe<TagDisconnectInput>;
};

export type SnippetTagsFieldInput = {
  create?: InputMaybe<Array<SnippetTagsCreateFieldInput>>;
  connect?: InputMaybe<Array<SnippetTagsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<SnippetTagsConnectOrCreateFieldInput>>;
};

export type SnippetTagsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SnippetTagsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<SnippetTagsNodeAggregationWhereInput>>;
  tag_EQUAL?: InputMaybe<Scalars["String"]>;
  tag_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  tag_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  tag_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  tag_GT?: InputMaybe<Scalars["Int"]>;
  tag_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  tag_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  tag_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  tag_GTE?: InputMaybe<Scalars["Int"]>;
  tag_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  tag_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  tag_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  tag_LT?: InputMaybe<Scalars["Int"]>;
  tag_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  tag_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  tag_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  tag_LTE?: InputMaybe<Scalars["Int"]>;
  tag_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  tag_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  tag_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  createdAt_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
};

export type SnippetTagsUpdateConnectionInput = {
  node?: InputMaybe<TagUpdateInput>;
};

export type SnippetTagsUpdateFieldInput = {
  where?: InputMaybe<SnippetTagsConnectionWhere>;
  update?: InputMaybe<SnippetTagsUpdateConnectionInput>;
  connect?: InputMaybe<Array<SnippetTagsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<SnippetTagsDisconnectFieldInput>>;
  create?: InputMaybe<Array<SnippetTagsCreateFieldInput>>;
  delete?: InputMaybe<Array<SnippetTagsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<SnippetTagsConnectOrCreateFieldInput>>;
};

export type SnippetUniqueWhere = {
  id?: InputMaybe<Scalars["ID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type SnippetUpdateInput = {
  title?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  snippet?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<SnippetTagsUpdateFieldInput>>;
};

export type SnippetWhere = {
  OR?: InputMaybe<Array<SnippetWhere>>;
  AND?: InputMaybe<Array<SnippetWhere>>;
  id?: InputMaybe<Scalars["ID"]>;
  id_NOT?: InputMaybe<Scalars["ID"]>;
  id_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_NOT_IN?: InputMaybe<Array<Scalars["ID"]>>;
  id_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_NOT_CONTAINS?: InputMaybe<Scalars["ID"]>;
  id_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_STARTS_WITH?: InputMaybe<Scalars["ID"]>;
  id_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  id_NOT_ENDS_WITH?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  title_NOT?: InputMaybe<Scalars["String"]>;
  title_IN?: InputMaybe<Array<Scalars["String"]>>;
  title_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  title_CONTAINS?: InputMaybe<Scalars["String"]>;
  title_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  title_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  title_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  title_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  title_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  slug_NOT?: InputMaybe<Scalars["String"]>;
  slug_IN?: InputMaybe<Array<Scalars["String"]>>;
  slug_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  slug_CONTAINS?: InputMaybe<Scalars["String"]>;
  slug_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  slug_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  slug_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  slug_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  slug_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  description_NOT?: InputMaybe<Scalars["String"]>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  description_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  description_CONTAINS?: InputMaybe<Scalars["String"]>;
  description_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  description_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  description_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  description_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  description_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  snippet?: InputMaybe<Scalars["String"]>;
  snippet_NOT?: InputMaybe<Scalars["String"]>;
  snippet_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  snippet_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  snippet_CONTAINS?: InputMaybe<Scalars["String"]>;
  snippet_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  snippet_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  snippet_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  snippet_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  snippet_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  createdAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_IN?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  updatedAt_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  updatedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  /** @deprecated Use `tags_SOME` instead. */
  tags?: InputMaybe<TagWhere>;
  /** @deprecated Use `tags_NONE` instead. */
  tags_NOT?: InputMaybe<TagWhere>;
  tagsAggregate?: InputMaybe<SnippetTagsAggregateInput>;
  /** Return Snippets where all of the related Tags match this filter */
  tags_ALL?: InputMaybe<TagWhere>;
  /** Return Snippets where none of the related Tags match this filter */
  tags_NONE?: InputMaybe<TagWhere>;
  /** Return Snippets where one of the related Tags match this filter */
  tags_SINGLE?: InputMaybe<TagWhere>;
  /** Return Snippets where some of the related Tags match this filter */
  tags_SOME?: InputMaybe<TagWhere>;
  /** @deprecated Use `tagsConnection_SOME` instead. */
  tagsConnection?: InputMaybe<SnippetTagsConnectionWhere>;
  /** @deprecated Use `tagsConnection_NONE` instead. */
  tagsConnection_NOT?: InputMaybe<SnippetTagsConnectionWhere>;
  tagsConnection_ALL?: InputMaybe<SnippetTagsConnectionWhere>;
  tagsConnection_NONE?: InputMaybe<SnippetTagsConnectionWhere>;
  tagsConnection_SINGLE?: InputMaybe<SnippetTagsConnectionWhere>;
  tagsConnection_SOME?: InputMaybe<SnippetTagsConnectionWhere>;
};

export type TagConnectInput = {
  snippets?: InputMaybe<Array<TagSnippetsConnectFieldInput>>;
};

export type TagConnectOrCreateInput = {
  snippets?: InputMaybe<Array<TagSnippetsConnectOrCreateFieldInput>>;
};

export type TagConnectOrCreateWhere = {
  node: TagUniqueWhere;
};

export type TagConnectWhere = {
  node: TagWhere;
};

export type TagCreateInput = {
  tag: Scalars["String"];
  snippets?: InputMaybe<TagSnippetsFieldInput>;
};

export type TagDeleteInput = {
  snippets?: InputMaybe<Array<TagSnippetsDeleteFieldInput>>;
};

export type TagDisconnectInput = {
  snippets?: InputMaybe<Array<TagSnippetsDisconnectFieldInput>>;
};

export type TagOnCreateInput = {
  tag: Scalars["String"];
};

export type TagOptions = {
  /** Specify one or more TagSort objects to sort Tags by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TagSort>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type TagRelationInput = {
  snippets?: InputMaybe<Array<TagSnippetsCreateFieldInput>>;
};

export type TagSnippetsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]>;
  count_LT?: InputMaybe<Scalars["Int"]>;
  count_LTE?: InputMaybe<Scalars["Int"]>;
  count_GT?: InputMaybe<Scalars["Int"]>;
  count_GTE?: InputMaybe<Scalars["Int"]>;
  AND?: InputMaybe<Array<TagSnippetsAggregateInput>>;
  OR?: InputMaybe<Array<TagSnippetsAggregateInput>>;
  node?: InputMaybe<TagSnippetsNodeAggregationWhereInput>;
};

export type TagSnippetsConnectFieldInput = {
  where?: InputMaybe<SnippetConnectWhere>;
  connect?: InputMaybe<Array<SnippetConnectInput>>;
};

export type TagSnippetsConnectionSort = {
  node?: InputMaybe<SnippetSort>;
};

export type TagSnippetsConnectionWhere = {
  AND?: InputMaybe<Array<TagSnippetsConnectionWhere>>;
  OR?: InputMaybe<Array<TagSnippetsConnectionWhere>>;
  node?: InputMaybe<SnippetWhere>;
  node_NOT?: InputMaybe<SnippetWhere>;
};

export type TagSnippetsConnectOrCreateFieldInput = {
  where: SnippetConnectOrCreateWhere;
  onCreate: TagSnippetsConnectOrCreateFieldInputOnCreate;
};

export type TagSnippetsConnectOrCreateFieldInputOnCreate = {
  node: SnippetOnCreateInput;
};

export type TagSnippetsCreateFieldInput = {
  node: SnippetCreateInput;
};

export type TagSnippetsDeleteFieldInput = {
  where?: InputMaybe<TagSnippetsConnectionWhere>;
  delete?: InputMaybe<SnippetDeleteInput>;
};

export type TagSnippetsDisconnectFieldInput = {
  where?: InputMaybe<TagSnippetsConnectionWhere>;
  disconnect?: InputMaybe<SnippetDisconnectInput>;
};

export type TagSnippetsFieldInput = {
  create?: InputMaybe<Array<TagSnippetsCreateFieldInput>>;
  connect?: InputMaybe<Array<TagSnippetsConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<TagSnippetsConnectOrCreateFieldInput>>;
};

export type TagSnippetsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TagSnippetsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TagSnippetsNodeAggregationWhereInput>>;
  id_EQUAL?: InputMaybe<Scalars["ID"]>;
  title_EQUAL?: InputMaybe<Scalars["String"]>;
  title_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  title_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  title_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  title_GT?: InputMaybe<Scalars["Int"]>;
  title_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  title_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  title_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  title_GTE?: InputMaybe<Scalars["Int"]>;
  title_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  title_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  title_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  title_LT?: InputMaybe<Scalars["Int"]>;
  title_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  title_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  title_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  title_LTE?: InputMaybe<Scalars["Int"]>;
  title_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  title_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  title_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_EQUAL?: InputMaybe<Scalars["String"]>;
  slug_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  slug_GT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  slug_GTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  slug_LT?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  slug_LTE?: InputMaybe<Scalars["Int"]>;
  slug_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  slug_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  slug_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  description_EQUAL?: InputMaybe<Scalars["String"]>;
  description_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  description_GT?: InputMaybe<Scalars["Int"]>;
  description_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  description_GTE?: InputMaybe<Scalars["Int"]>;
  description_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  description_LT?: InputMaybe<Scalars["Int"]>;
  description_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  description_LTE?: InputMaybe<Scalars["Int"]>;
  description_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  description_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  description_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  snippet_EQUAL?: InputMaybe<Scalars["String"]>;
  snippet_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]>;
  snippet_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  snippet_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]>;
  snippet_GT?: InputMaybe<Scalars["Int"]>;
  snippet_AVERAGE_GT?: InputMaybe<Scalars["Float"]>;
  snippet_LONGEST_GT?: InputMaybe<Scalars["Int"]>;
  snippet_SHORTEST_GT?: InputMaybe<Scalars["Int"]>;
  snippet_GTE?: InputMaybe<Scalars["Int"]>;
  snippet_AVERAGE_GTE?: InputMaybe<Scalars["Float"]>;
  snippet_LONGEST_GTE?: InputMaybe<Scalars["Int"]>;
  snippet_SHORTEST_GTE?: InputMaybe<Scalars["Int"]>;
  snippet_LT?: InputMaybe<Scalars["Int"]>;
  snippet_AVERAGE_LT?: InputMaybe<Scalars["Float"]>;
  snippet_LONGEST_LT?: InputMaybe<Scalars["Int"]>;
  snippet_SHORTEST_LT?: InputMaybe<Scalars["Int"]>;
  snippet_LTE?: InputMaybe<Scalars["Int"]>;
  snippet_AVERAGE_LTE?: InputMaybe<Scalars["Float"]>;
  snippet_LONGEST_LTE?: InputMaybe<Scalars["Int"]>;
  snippet_SHORTEST_LTE?: InputMaybe<Scalars["Int"]>;
  createdAt_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MIN_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_MAX_LTE?: InputMaybe<Scalars["DateTime"]>;
};

export type TagSnippetsUpdateConnectionInput = {
  node?: InputMaybe<SnippetUpdateInput>;
};

export type TagSnippetsUpdateFieldInput = {
  where?: InputMaybe<TagSnippetsConnectionWhere>;
  update?: InputMaybe<TagSnippetsUpdateConnectionInput>;
  connect?: InputMaybe<Array<TagSnippetsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<TagSnippetsDisconnectFieldInput>>;
  create?: InputMaybe<Array<TagSnippetsCreateFieldInput>>;
  delete?: InputMaybe<Array<TagSnippetsDeleteFieldInput>>;
  connectOrCreate?: InputMaybe<Array<TagSnippetsConnectOrCreateFieldInput>>;
};

/** Fields to sort Tags by. The order in which sorts are applied is not guaranteed when specifying many fields in one TagSort object. */
export type TagSort = {
  tag?: InputMaybe<SortDirection>;
  createdAt?: InputMaybe<SortDirection>;
  updatedAt?: InputMaybe<SortDirection>;
};

export type TagUniqueWhere = {
  tag?: InputMaybe<Scalars["String"]>;
};

export type TagUpdateInput = {
  tag?: InputMaybe<Scalars["String"]>;
  snippets?: InputMaybe<Array<TagSnippetsUpdateFieldInput>>;
};

export type TagWhere = {
  OR?: InputMaybe<Array<TagWhere>>;
  AND?: InputMaybe<Array<TagWhere>>;
  tag?: InputMaybe<Scalars["String"]>;
  tag_NOT?: InputMaybe<Scalars["String"]>;
  tag_IN?: InputMaybe<Array<Scalars["String"]>>;
  tag_NOT_IN?: InputMaybe<Array<Scalars["String"]>>;
  tag_CONTAINS?: InputMaybe<Scalars["String"]>;
  tag_NOT_CONTAINS?: InputMaybe<Scalars["String"]>;
  tag_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  tag_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]>;
  tag_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  tag_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  createdAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]>>;
  createdAt_LT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GT?: InputMaybe<Scalars["DateTime"]>;
  createdAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_NOT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_IN?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  updatedAt_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  updatedAt_LT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_LTE?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GT?: InputMaybe<Scalars["DateTime"]>;
  updatedAt_GTE?: InputMaybe<Scalars["DateTime"]>;
  /** @deprecated Use `snippets_SOME` instead. */
  snippets?: InputMaybe<SnippetWhere>;
  /** @deprecated Use `snippets_NONE` instead. */
  snippets_NOT?: InputMaybe<SnippetWhere>;
  snippetsAggregate?: InputMaybe<TagSnippetsAggregateInput>;
  /** Return Tags where all of the related Snippets match this filter */
  snippets_ALL?: InputMaybe<SnippetWhere>;
  /** Return Tags where none of the related Snippets match this filter */
  snippets_NONE?: InputMaybe<SnippetWhere>;
  /** Return Tags where one of the related Snippets match this filter */
  snippets_SINGLE?: InputMaybe<SnippetWhere>;
  /** Return Tags where some of the related Snippets match this filter */
  snippets_SOME?: InputMaybe<SnippetWhere>;
  /** @deprecated Use `snippetsConnection_SOME` instead. */
  snippetsConnection?: InputMaybe<TagSnippetsConnectionWhere>;
  /** @deprecated Use `snippetsConnection_NONE` instead. */
  snippetsConnection_NOT?: InputMaybe<TagSnippetsConnectionWhere>;
  snippetsConnection_ALL?: InputMaybe<TagSnippetsConnectionWhere>;
  snippetsConnection_NONE?: InputMaybe<TagSnippetsConnectionWhere>;
  snippetsConnection_SINGLE?: InputMaybe<TagSnippetsConnectionWhere>;
  snippetsConnection_SOME?: InputMaybe<TagSnippetsConnectionWhere>;
};

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface DateTimeAggregateInputNullable {
  min?: boolean;
  max?: boolean;
}
export interface SnippetAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  title?: StringAggregateInputNonNullable;
  slug?: StringAggregateInputNonNullable;
  description?: StringAggregateInputNullable;
  snippet?: StringAggregateInputNullable;
  createdAt?: DateTimeAggregateInputNonNullable;
  updatedAt?: DateTimeAggregateInputNullable;
}

export declare class SnippetModel {
  public find(args?: {
    where?: SnippetWhere;

    options?: SnippetOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Snippet[]>;
  public create(args: {
    input: SnippetCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateSnippetsMutationResponse>;
  public update(args: {
    where?: SnippetWhere;
    update?: SnippetUpdateInput;
    connect?: SnippetConnectInput;
    disconnect?: SnippetDisconnectInput;
    create?: SnippetCreateInput;
    connectOrCreate?: SnippetConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateSnippetsMutationResponse>;
  public delete(args: {
    where?: SnippetWhere;
    delete?: SnippetDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: SnippetWhere;

    aggregate: SnippetAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<SnippetAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface DateTimeAggregateInputNullable {
  min?: boolean;
  max?: boolean;
}
export interface TagAggregateSelectionInput {
  count?: boolean;
  tag?: StringAggregateInputNonNullable;
  createdAt?: DateTimeAggregateInputNonNullable;
  updatedAt?: DateTimeAggregateInputNullable;
}

export declare class TagModel {
  public find(args?: {
    where?: TagWhere;

    options?: TagOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Tag[]>;
  public create(args: {
    input: TagCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateTagsMutationResponse>;
  public update(args: {
    where?: TagWhere;
    update?: TagUpdateInput;
    connect?: TagConnectInput;
    disconnect?: TagDisconnectInput;
    create?: TagCreateInput;
    connectOrCreate?: TagConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateTagsMutationResponse>;
  public delete(args: {
    where?: TagWhere;
    delete?: TagDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: TagWhere;

    aggregate: TagAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<TagAggregateSelection>;
}

export interface IdAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNonNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface StringAggregateInputNullable {
  shortest?: boolean;
  longest?: boolean;
}
export interface DateTimeAggregateInputNonNullable {
  min?: boolean;
  max?: boolean;
}
export interface DateTimeAggregateInputNullable {
  min?: boolean;
  max?: boolean;
}
export interface DeviceAggregateSelectionInput {
  count?: boolean;
  id?: IdAggregateInputNonNullable;
  code?: StringAggregateInputNonNullable;
  userAgent?: StringAggregateInputNonNullable;
  lastUse?: DateTimeAggregateInputNullable;
}

export declare class DeviceModel {
  public find(args?: {
    where?: DeviceWhere;

    options?: DeviceOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Device[]>;
  public create(args: {
    input: DeviceCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateDevicesMutationResponse>;
  public update(args: {
    where?: DeviceWhere;
    update?: DeviceUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateDevicesMutationResponse>;
  public delete(args: {
    where?: DeviceWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: DeviceWhere;

    aggregate: DeviceAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<DeviceAggregateSelection>;
}

export interface ModelMap {
  Snippet: SnippetModel;
  Tag: TagModel;
  Device: DeviceModel;
}
