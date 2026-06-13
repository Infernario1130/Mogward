import { notFound } from "next/navigation";
import { productMap } from "@/components/products";

export default async function ProductPage({ params }) {
  const { productId } = await params;
  const Component = productMap[productId];

  if (!Component) return notFound();

  return <Component />;
}