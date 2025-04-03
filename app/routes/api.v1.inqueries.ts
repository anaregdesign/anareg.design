import { ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/services/firebase.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    // validate honey pot
    const honeypot = formData.get("website");
    if (honeypot) {
      return new Response("OK", { status: 200 });
    }

    const doc = {
      lastName: formData.get("lastName"),
      firstName: formData.get("firstName"),
      affiliation: formData.get("affiliation"),
      department: formData.get("department"),
      email: formData.get("email"),
      inquiry: formData.get("inquiry"),
      consent: formData.get("consent") === "on",
      createdAt: new Date(),
    };

    const customer = {
      lastName: formData.get("lastName"),
      firstName: formData.get("firstName"),
      affiliation: formData.get("affiliation"),
      department: formData.get("department"),
      email: formData.get("email"),
      updatedAt: new Date(),
    };

    console.log("doc", doc);
    await db.collection("inqueries").add(doc);

    // New: Write to "customers" collection using email as the key.
    const customerRef = db
      .collection("customers")
      .doc(customer.email as string);
    const existingCustomerDoc = await customerRef.get();
    if (existingCustomerDoc.exists) {
      // Document exists: update fields without modifying createdAt.
      await customerRef.update({
        ...customer,
        // keep createdAt from existing document
      });
    } else {
      // Document does not exist: create with current createdAt.
      await customerRef.set({
        ...customer,
        createdAt: new Date(),
      });
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
