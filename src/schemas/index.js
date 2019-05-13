import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation loginMutation($email: String!, $password: String!){
    login(email: $email, password: $password){
      user{
        id
      }
      errors {
        field
        message
      }
      token
    }
  }
`;

export const signUpMutation = gql`
  mutation signUpMutation($input: NewUserInput!){
    create(input: $input) {
      token
      errors {
        field
        message
      }
    }
  }
`; 


export const createEntryMutation = gql`
  mutation createEntryMutation($input: NewEntryInput!){
    createEntry(input: $input) {
        entry{
          title
          body
        }
        errors {
          field
          message
        }
      }
    }
`; 

export const listAllEntries = gql`
   query {
    listAllEntries {
      id
      title
      body
      createdAt
      updatedAt
    }
  }
`;

export const updateEntryMutation = gql`
  mutation updateEntry($input: UpdateEntryInput!){
  updateEntry(input: $input) {
    errors{
      field
      message
    }
    entry{
      id
    }
  }
}
`;
