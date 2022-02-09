import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2  p-5">
      <input
        type="file"
        className="file:border-0 file:rounded-xl file:px-5 file:text-white file:bg-purple-400
        file:transition-colors file:cursor-pointer file:hover:bg-white file:hover:text-purple-400"
      />
      <p className="first-letter:text-7xl first-letter:hover:font-bold first-line:text-indigo-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
        deleniti. Eaque dolorum earum aperiam vitae perferendis, iusto
        recusandae labore id saepe ratione neque officiis, maxime iure, facilis
        possimus consequuntur excepturi!
      </p>
    </div>
  );
};

export default Home;
