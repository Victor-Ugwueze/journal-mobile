import gql from 'graphql-tag';

export const loginMutation = gql`
      mutation loginMutation($email: String!, $password: String!){
        login(email: $email, password: $password){
          id,
          token
        }
      }
`;

export const signUpMutation = gql`
  mutation signUpMutation($input: NewUserInput!){
      create(input: $input) {
        firstName
        lastName
        email
      }
    }
`; 
