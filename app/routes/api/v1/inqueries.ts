import { ActionFunctionArgs } from "@remix-run/node";
import { firestore } from "~/services/firebase.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const doc = {
      name: formData.get("name"),
      affiliation: formData.get("affiliation"),
      department: formData.get("department"),
      email: formData.get("email"),
      inquiry: formData.get("inquiry"),
      consent: formData.get("consent") === "on",
      createdAt: new Date(),
    };
    await firestore.collection("inqueries").add(doc);
    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
