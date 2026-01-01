import { redirect } from "react-router-dom";
import store from "../store";
import { clearCart } from "../features/cart/cartSlice";
import supabase from "./supabase";
import toast from "react-hot-toast";

const API_URL = "https://react-fast-pizza-api.jonas.io/api";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
export async function getMenu() {
  let { data } = await supabase.from("menu").select("*");

  return data;
}
export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

export async function getOrder(id) {
  let { data, error } = await supabase
    .from("ordersPizza")
    .select("*")
    .single()

    // Filters
    .eq("id", id);
  if (error) {
    toast.error(
      "Your order wasn't found. Check your order number and try again.",
    );
    throw new Error(
      "Your order wasn't found. Check your order number and try again.",
    );
  }
  return data;
}

export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export async function createOrder(newOrder) {
  try {
    4;
    const { data, error } = await supabase
      .from("ordersPizza")
      .insert([{ ...newOrder }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const { error } = await supabase
      .from("ordersPizza")
      .update({ ...updateObj })
      .eq("id", id)
      .select();
    if (error) throw new Error(error.message);
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}

export async function createOrderAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  // If evrything is okay, create new order an redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  toast.success(`Order #${newOrder.id} was successfully created.`);
  return redirect(`/order/${newOrder.id}`);
}

export async function updateOrderAction({ request, params }) {
  const data = { priority: true };

  await updateOrder(params.orderId, data);
  return null;
}
