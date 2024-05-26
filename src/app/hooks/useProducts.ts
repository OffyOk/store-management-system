export async function useProducts(id: string = "") {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    throw new Error("Something went wrong: Cannot get product");
  }

  const data = await response.json();
  return data;
}
// output=  [{},{},{}].map/find แล้วได้ product ออกมาเป็น {}สามารถ.key=value ได้
