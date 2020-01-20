import gql from 'graphql-tag';
// good example on auth header mutations: https://www.apollographql.com/docs/tutorial/mutations/
export const PRODUCTS = gql`
  query {
    products {
      sku
      name
      category_id
      date_created
      enabled
      count
      last_restock
    }
  }
`;

export const CATEGORIES = gql`
  query {
    categories {
      id
      name
      sku_code
      products {
        sku
      }
    }
  }
`;

// mutations: https://devhoot.ooo/build-a-react-graphql-app-with-apollo-client-powered-by-hasura-engine/
export const ADD_PRODUCT = gql`
  mutation($name: String!, $sku: String!, $count: Int!, $cat_id: Int!, $date_added: date!){
    insert_products(
      objects: [
        {
          name: $name,
          sku: $sku,
          count: $count,
          category_id: $cat_id,
          date_created: $date_added
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

export const CATEGORIES_SUBSCRIPTION = gql`
  subscription {
    categories {
      id
      name
      sku_code
      products {
        sku
      }
    }
  }
`;