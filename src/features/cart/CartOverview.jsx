import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuanitiy } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuanitiy);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-yellow-500 px-4 py-4 text-sm uppercase text-stone-800 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-700 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">🛒 Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
