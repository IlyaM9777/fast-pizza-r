import { useSelector } from "react-redux";
import Button from "./Button";

function ReturnToMenu({ children }) {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        children
      ) : (
        <span className="flex flex-col items-center space-y-7 text-xl capitalize">
          {username},
          <Button to="/menu" type="primary">
            Return to menu/Continue ordering
          </Button>
        </span>
      )}
    </div>
  );
}

export default ReturnToMenu;
