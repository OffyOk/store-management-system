import { NextPage } from "next";

interface Props {}

const users: NextPage<Props> = ({}) => {
  return (
    <div className="row-start-1 row-end-7 col-start-2 col-end-6 grid place-content-center text-4xl">
      In Progress
    </div>
  );
};

export default users;
