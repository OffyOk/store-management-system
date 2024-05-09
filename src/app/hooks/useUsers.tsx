export async function useUsers() {
  const response = await fetch("https://fakestoreapi.com/users");

  if (!response.ok) {
    throw new Error("Something went wrong: Cannot get Users information");
  }

  const data = await response.json();
  return data;
}
