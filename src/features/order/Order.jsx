// Test ID: 3BF7PNm

import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

import ReturnToMenu from "../../ui/ReturnToMenu";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const {
    id,
    status,
    priority,

    estimatedDelivery,
    cart,
  } = order;
  const totalCartPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const priorityPrice = priority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <>
      {" "}
      <div className="space-y-8 px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Order #{id} </h2>

          <div className="space-x-2">
            <span>status</span>
            {priority && (
              <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
                Priority
              </span>
            )}
            <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
              {status} order
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
          <p className="font-medium">
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
              : "Order should have arrived"}
          </p>
          <p className="text-xs text-stone-500">
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </p>
        </div>

        <ul className="divide-y-2 divide-stone-200 border-b border-t">
          {cart.map((item) => (
            <OrderItem
              item={item}
              key={item.pizzaId}
              ingredients={
                fetcher.data?.find((pizza) => item.pizzaId === pizza.id)
                  .ingredients
              }
              isLoadingIngredients={fetcher.state === "loading"}
            />
          ))}
        </ul>
        <div className="space-y-2 bg-stone-200 px-6 py-5">
          <p className="text-sm font-medium text-stone-600">
            Price pizza: {formatCurrency(totalCartPrice)}
          </p>
          {priority && (
            <p className="text-sm font-medium text-stone-600">
              Price priority: {formatCurrency(priorityPrice)}
            </p>
          )}
          <p className="font-bold">
            To pay on delivery: {formatCurrency(totalPrice)}
          </p>
        </div>
        {!priority && <UpdateOrder order={order} />}
      </div>
      <ReturnToMenu>{null}</ReturnToMenu>
    </>
  );
}

export default Order;
