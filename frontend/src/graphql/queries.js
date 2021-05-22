import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(input: { email: $email, password: $password, name: $name }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const LOG_IN = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
