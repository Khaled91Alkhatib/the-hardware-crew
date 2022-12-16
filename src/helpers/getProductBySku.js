export function getProductBySku(products, sku) {
  if (sku) {
    return products.filter(product => product.sku === sku)[0];
  }
}