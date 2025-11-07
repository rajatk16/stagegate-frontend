export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: unknown; output: unknown };
};

export type AuthPayload = {
  __typename: 'AuthPayload';
  email: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
  user: User;
};

export type AuthStatus = {
  __typename: 'AuthStatus';
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  uid: Scalars['ID']['output'];
};

export type ContactInfo = {
  __typename: 'ContactInfo';
  phone: Maybe<Scalars['String']['output']>;
  secondaryEmail: Maybe<Scalars['String']['output']>;
  website: Maybe<Scalars['String']['output']>;
};

export type ContactInfoInput = {
  phone?: InputMaybe<Scalars['String']['input']>;
  secondaryEmail?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type Location = {
  __typename: 'Location';
  city: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
};

export type LocationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename: 'Mutation';
  signUp: AuthPayload;
  updateUser: User;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Occupation = {
  __typename: 'Occupation';
  company: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

export type OccupationInput = {
  company?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename: 'Query';
  authStatus: Maybe<AuthStatus>;
  me: Maybe<User>;
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SocialMedia = {
  __typename: 'SocialMedia';
  handle: Scalars['String']['output'];
  platform: Scalars['String']['output'];
};

export type SocialMediaInput = {
  handle: Scalars['String']['input'];
  platform: Scalars['String']['input'];
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  contactInfo?: InputMaybe<ContactInfoInput>;
  location?: InputMaybe<LocationInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<OccupationInput>;
  socialMedia?: InputMaybe<Array<SocialMediaInput>>;
};

export type User = {
  __typename: 'User';
  bio: Maybe<Scalars['String']['output']>;
  contactInfo: Maybe<ContactInfo>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Maybe<Location>;
  name: Scalars['String']['output'];
  occupation: Maybe<Occupation>;
  socialMedia: Maybe<Array<SocialMedia>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  signUp: {
    __typename: 'AuthPayload';
    uid: string;
    email: string;
    user: { __typename: 'User'; id: string; name: string; email: string; createdAt: unknown };
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    __typename: 'User';
    bio: string | null;
    createdAt: unknown;
    email: string;
    id: string;
    name: string;
    contactInfo: {
      __typename: 'ContactInfo';
      phone: string | null;
      secondaryEmail: string | null;
      website: string | null;
    } | null;
    location: { __typename: 'Location'; city: string | null; country: string | null } | null;
    occupation: {
      __typename: 'Occupation';
      company: string | null;
      title: string | null;
    } | null;
    socialMedia: Array<{ __typename: 'SocialMedia'; handle: string; platform: string }> | null;
  } | null;
};
