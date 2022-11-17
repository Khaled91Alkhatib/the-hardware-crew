export function getProducts(products, cat) {

  const productInRange = products.filter(product => {
    return (product.display && product.category.toLowerCase() === cat.toLowerCase());
  });

  return productInRange;
}