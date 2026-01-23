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

export type ChangeOrgMemberRoleInput = {
  organizationId: Scalars['ID']['input'];
  role: OrganizationMemberRole;
  userId: Scalars['ID']['input'];
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

export type CreateEventInput = {
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  eventType: EventType;
  format: EventFormat;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<EventLocationInput>;
  name: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEventPayload = {
  __typename: 'CreateEventPayload';
  event: Event;
};

export type CreateOrganizationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type Event = {
  __typename: 'Event';
  coverImage: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  eventType: EventType;
  format: EventFormat;
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  location: Maybe<EventLocation>;
  members: EventMembers;
  name: Scalars['String']['output'];
  organization: Organization;
  slug: Scalars['String']['output'];
  startDate: Maybe<Scalars['DateTime']['output']>;
  status: EventStatus;
  tagline: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  viewerEventRole: Maybe<EventMemberRole>;
  viewerOrgRole: Maybe<OrganizationMemberRole>;
  website: Maybe<Scalars['String']['output']>;
};

export type EventMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export enum EventFormat {
  Hybrid = 'HYBRID',
  InPerson = 'IN_PERSON',
  Online = 'ONLINE',
}

export type EventLocation = {
  __typename: 'EventLocation';
  address: Maybe<Scalars['String']['output']>;
  city: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
};

export type EventLocationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type EventMember = {
  __typename: 'EventMember';
  event: Event;
  role: EventMemberRole;
  user: User;
};

export enum EventMemberRole {
  Guest = 'GUEST',
  Organizer = 'ORGANIZER',
  Reviewer = 'REVIEWER',
}

export type EventMembers = {
  __typename: 'EventMembers';
  pagination: Maybe<Pagination>;
  results: Array<EventMember>;
};

export enum EventStatus {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export enum EventType {
  Conference = 'CONFERENCE',
  Hackathon = 'HACKATHON',
  Meetup = 'MEETUP',
  Other = 'OTHER',
  Webinar = 'WEBINAR',
  Workshop = 'WORKSHOP',
}

export type JoinOrganizationInput = {
  organizationId: Scalars['ID']['input'];
};

export type LeaveOrganizationInput = {
  organizationId: Scalars['ID']['input'];
};

export type LeaveOrganizationPayload = {
  __typename: 'LeaveOrganizationPayload';
  success: Scalars['Boolean']['output'];
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
  changeOrgMemberRole: OrganizationMember;
  createEvent: CreateEventPayload;
  createOrganization: Organization;
  deleteProfilePicture: User;
  joinOrganization: OrganizationMember;
  leaveOrganization: LeaveOrganizationPayload;
  removeOrgMember: RemoveOrgMemberPayload;
  signUp: AuthPayload;
  updateOrganization: Organization;
  updateProfilePicture: User;
  updateUser: User;
};

export type MutationChangeOrgMemberRoleArgs = {
  input: ChangeOrgMemberRoleInput;
};

export type MutationCreateEventArgs = {
  input: CreateEventInput;
};

export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};

export type MutationJoinOrganizationArgs = {
  input: JoinOrganizationInput;
};

export type MutationLeaveOrganizationArgs = {
  input: LeaveOrganizationInput;
};

export type MutationRemoveOrgMemberArgs = {
  input: RemoveOrgMemberInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};

export type MutationUpdateProfilePictureArgs = {
  url: Scalars['String']['input'];
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

export type Organization = {
  __typename: 'Organization';
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  logo: Maybe<Scalars['String']['output']>;
  members: OrganizationMembers;
  name: Scalars['String']['output'];
  owner: User;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  viewerRole: Maybe<OrganizationMemberRole>;
  website: Maybe<Scalars['String']['output']>;
};

export type OrganizationMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganizationMember = {
  __typename: 'OrganizationMember';
  organization: Organization;
  role: OrganizationMemberRole;
  user: User;
};

export enum OrganizationMemberRole {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Owner = 'OWNER',
}

export type OrganizationMembers = {
  __typename: 'OrganizationMembers';
  pagination: Maybe<Pagination>;
  results: Array<OrganizationMember>;
};

export type Pagination = {
  __typename: 'Pagination';
  cursor: Maybe<Scalars['String']['output']>;
  pageSize: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename: 'Query';
  authStatus: Maybe<AuthStatus>;
  me: Maybe<User>;
  myOrganizations: Array<Organization>;
  organizationBySlug: Organization;
  organizationEvents: Array<Event>;
  searchOrganizations: Array<Organization>;
};

export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String']['input'];
};

export type QueryOrganizationEventsArgs = {
  organizationId: Scalars['ID']['input'];
};

export type QuerySearchOrganizationsArgs = {
  excludeMyOrganizations?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type RemoveOrgMemberInput = {
  organizationId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type RemoveOrgMemberPayload = {
  __typename: 'RemoveOrgMemberPayload';
  success: Scalars['Boolean']['output'];
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

export type UpdateOrganizationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['ID']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
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
  profilePicture: Maybe<Scalars['String']['output']>;
  socialMedia: Maybe<Array<SocialMedia>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChangeOrgMemberRoleMutationVariables = Exact<{
  input: ChangeOrgMemberRoleInput;
}>;

export type ChangeOrgMemberRoleMutation = {
  changeOrgMemberRole: {
    __typename: 'OrganizationMember';
    role: OrganizationMemberRole;
    user: { __typename: 'User'; id: string };
  };
};

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;

export type CreateOrganizationMutation = {
  createOrganization: {
    __typename: 'Organization';
    id: string;
    name: string;
    slug: string;
    description: string | null;
    website: string | null;
    logo: string | null;
    createdAt: unknown;
    updatedAt: unknown;
    owner: { __typename: 'User'; id: string; name: string; email: string };
  };
};

export type DeleteProfilePictureMutationVariables = Exact<{ [key: string]: never }>;

export type DeleteProfilePictureMutation = {
  deleteProfilePicture: {
    __typename: 'User';
    name: string;
    email: string;
    profilePicture: string | null;
  };
};

export type JoinOrganizationMutationVariables = Exact<{
  input: JoinOrganizationInput;
}>;

export type JoinOrganizationMutation = {
  joinOrganization: {
    __typename: 'OrganizationMember';
    organization: { __typename: 'Organization'; id: string; slug: string };
  };
};

export type LeaveOrganizationMutationVariables = Exact<{
  input: LeaveOrganizationInput;
}>;

export type LeaveOrganizationMutation = {
  leaveOrganization: { __typename: 'LeaveOrganizationPayload'; success: boolean };
};

export type RemoveOrgMemberMutationVariables = Exact<{
  input: RemoveOrgMemberInput;
}>;

export type RemoveOrgMemberMutation = {
  removeOrgMember: { __typename: 'RemoveOrgMemberPayload'; success: boolean };
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

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;

export type UpdateOrganizationMutation = {
  updateOrganization: {
    __typename: 'Organization';
    id: string;
    name: string;
    slug: string;
    website: string | null;
    isPublic: boolean;
    description: string | null;
  };
};

export type UpdateProfilePictureMutationVariables = Exact<{
  url: Scalars['String']['input'];
}>;

export type UpdateProfilePictureMutation = {
  updateProfilePicture: { __typename: 'User'; id: string; profilePicture: string | null };
};

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  updateUser: {
    __typename: 'User';
    bio: string | null;
    createdAt: unknown;
    email: string;
    id: string;
    name: string;
    updatedAt: unknown;
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
  };
};

export type AuthStatusQueryVariables = Exact<{ [key: string]: never }>;

export type AuthStatusQuery = {
  authStatus: { __typename: 'AuthStatus'; emailVerified: boolean } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    __typename: 'User';
    bio: string | null;
    createdAt: unknown;
    updatedAt: unknown;
    email: string;
    id: string;
    name: string;
    profilePicture: string | null;
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

export type MyOrganizationsQueryVariables = Exact<{ [key: string]: never }>;

export type MyOrganizationsQuery = {
  myOrganizations: Array<{
    __typename: 'Organization';
    id: string;
    name: string;
    slug: string;
    description: string | null;
    website: string | null;
    logo: string | null;
    viewerRole: OrganizationMemberRole | null;
    owner: { __typename: 'User'; id: string };
  }>;
};

export type OrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type OrganizationBySlugQuery = {
  organizationBySlug: {
    __typename: 'Organization';
    id: string;
    name: string;
    slug: string;
    description: string | null;
    website: string | null;
    logo: string | null;
    viewerRole: OrganizationMemberRole | null;
    isPublic: boolean;
  };
};

export type OrganizationEventsQueryVariables = Exact<{
  organizationId: Scalars['ID']['input'];
}>;

export type OrganizationEventsQuery = {
  organizationEvents: Array<{
    __typename: 'Event';
    id: string;
    name: string;
    slug: string;
    eventType: EventType;
    tagline: string | null;
    startDate: unknown | null;
    endDate: unknown | null;
    website: string | null;
    coverImage: string | null;
    format: EventFormat;
    status: EventStatus;
    isPublic: boolean;
    viewerOrgRole: OrganizationMemberRole | null;
    viewerEventRole: EventMemberRole | null;
  }>;
};

export type OrgMembersQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type OrgMembersQuery = {
  organizationBySlug: {
    __typename: 'Organization';
    id: string;
    viewerRole: OrganizationMemberRole | null;
    members: {
      __typename: 'OrganizationMembers';
      results: Array<{
        __typename: 'OrganizationMember';
        role: OrganizationMemberRole;
        user: {
          __typename: 'User';
          id: string;
          name: string;
          email: string;
          profilePicture: string | null;
        };
      }>;
    };
  };
};

export type SearchOrganizationsQueryVariables = Exact<{
  query: Scalars['String']['input'];
  excludeMyOrganizations?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type SearchOrganizationsQuery = {
  searchOrganizations: Array<{
    __typename: 'Organization';
    id: string;
    name: string;
    slug: string;
    description: string | null;
    logo: string | null;
    website: string | null;
  }>;
};
