import gql from 'graphql-tag';

export const PRODUCTS = gql`
  query getProducts {
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
  query getCategories {
    categories {
      name
      id
    }
  }
`;
