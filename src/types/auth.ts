export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthPayload {
  uid: string;
  email: string;
  user: User;
}

export interface SignUpResponse {
  signUp: AuthPayload;
}
