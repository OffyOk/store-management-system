export async function useOrders() {
  const response = await fetch("https://fakestoreapi.com/carts");

  if (!response.ok) {
    throw new Error("Something went wrong: Cannot get orders");
  }

  const data = await response.json();
  return data;
}
// output=  [{...[{},{}]},{...[{},{}]},{...[{},{}]}].map/find แล้วได้ cart,products ด้านในออกมาเป็น {...[{},{}]} สามารถเอามา.map อีกทีดู products เป็นรายตัวได้ productId,quantity แล้วมา  .key=value ได้

// หลังได้ productId มาแล้วก็เอาไป filter หรือ find ต่อเพื่อเอาข้อมูลจากอีกที่ต่อได้
export async function useOrderDetail(id: number) {
  const response = await fetch(`https://fakestoreapi.com/carts/${id}`);

  if (!response.ok) {
    throw new Error("Something went wrong: Cannot get orders");
  }

  const data = await response.json();
  return data;
}
