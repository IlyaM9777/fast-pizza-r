import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>
        {error.data === 'Error: No route matches URL "/order/"' ||
        error.message === 'No route matches URL "/order/"'
          ? "No order with this number was found. Don't put '#' in front of order number when you are searching for your order. Try again."
          : error.data || error.message}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
