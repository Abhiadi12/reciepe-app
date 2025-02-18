import ProductDetail from "@/components/productDetail/ProductDetail";

export const metadata = {
  title: "Product Detail Page",
  description: "Product detail page",
};

function ProductPage() {
  return (
    <main>
      <ProductDetail />
    </main>
  );
}

export default ProductPage;
