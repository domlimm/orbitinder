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
