export default function UsersView({ params }: { params: { id: number } }) {
  return (
    <>
      <div>User View/{params.id}</div>
      <div>In Progress</div>
    </>
  );
}
