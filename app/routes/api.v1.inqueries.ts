import { ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/services/firebase.server";

export async function loader() {
  try {
    const collections = await db.listCollections();

    return new Response(
      JSON.stringify(collections.map((collection) => collection.id)),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching collections:", error);
    return Response.json({ status: 500, response: error });
  }
}

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

    console.log("doc", doc);
    await db.collection("inqueries").add(doc);
    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
