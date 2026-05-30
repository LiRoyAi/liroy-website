const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const ENDPOINT = `https://${DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`);
  const { data } = await res.json();
  return data;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: { url: string; altText: string | null };
    }>;
  };
  tags: string[];
  isPreorder: boolean;
}

const PRODUCT_FRAGMENT = `
  id
  title
  handle
  description
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 1) {
    edges {
      node {
        url
        altText
      }
    }
  }
  tags
`;

type CollectionData = {
  collection: {
    products: {
      edges: Array<{ node: Omit<ShopifyProduct, "isPreorder"> }>;
    };
  } | null;
};

export async function getCollectionByHandle(
  handle: string
): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<CollectionData>(
      `query getCollection($handle: String!) {
        collection(handle: $handle) {
          products(first: 24) {
            edges {
              node {
                ${PRODUCT_FRAGMENT}
              }
            }
          }
        }
      }`,
      { handle }
    );

    if (!data.collection) return [];

    return data.collection.products.edges.map(({ node }) => ({
      ...node,
      isPreorder: node.tags.includes("preorder"),
    }));
  } catch {
    return [];
  }
}
