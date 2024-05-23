export async function useUserna(id: string = "") {
  const response = await fetch(`https://fakestoreapi.com/users/${id}`);

  if (!response.ok) {
    throw new Error("Something went wrong: Cannot get Users information");
  }

  const data = await response.json();
  return {
    props: {
      initialData: data,
    },
  };
}
