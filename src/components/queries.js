import gql from 'graphql-tag';
// good example on auth header mutations: https://www.apollographql.com/docs/tutorial/mutations/
export const PRODUCTS = gql`
  query {
    products {
      sku
      name
      category_id
      category {
        name
      }
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
  mutation(
    $name: String!
    $sku: String!
    $count: Int!
    $cat_id: Int!
    $date_added: date!
    $last_restock: date
  ) {
    insert_products(
      objects: [
        {
          name: $name
          sku: $sku
          count: $count
          category_id: $cat_id
          date_created: $date_added
          last_restock: $last_restock
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

export const ADD_RESTOCK = gql`
  mutation($product_id: Int!, $date: date!, $count: Int!) {
    insert_restocks(
      objects: [{ product_id: $product_id, date: $date, count: $count }]
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

export const PRODUCTS_SUBSCRIPTION = gql`
  subscription {
    products {
      id
      sku
      name
      category {
        name
      }
      date_created
      enabled
      count
      last_restock
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation($id: Int!) {
    delete_products(where: { id: { _eq: $id } }) {
      returning {
        sku
      }
    }
  }
`;

export const TOGGLE_ACTIVE = gql`
  mutation($id: Int!, $enabled: Boolean!) {
    update_products(where: { id: { _eq: $id } }, _set: { enabled: $enabled }) {
      returning {
        sku
        enabled
      }
    }
  }
`;
