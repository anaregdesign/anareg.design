import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/services/firebase.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const xForwardedFor = request.headers.get("x-forwarded-for");
    const xRealIp = request.headers.get("x-real-ip");
    const ipAddress = xForwardedFor ?? xRealIp ?? null;

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
      ipAddress: ipAddress,
    };

    const customer = {
      lastName: formData.get("lastName"),
      firstName: formData.get("firstName"),
      affiliation: formData.get("affiliation"),
      department: formData.get("department"),
      email: formData.get("email"),
      updatedAt: new Date(),
      ipAddress: ipAddress,
    };

    console.log("doc", doc);
    await db.collection("inqueries").add(doc);

    const customerRef = db
      .collection("customers")
      .doc(customer.email as string);
    const existingCustomerDoc = await customerRef.get();

    if (existingCustomerDoc.exists) {
      await customerRef.update({
        ...customer,
      });
    } else {
      await customerRef.set({
        ...customer,
        createdAt: new Date(),
      });
    }

    return redirect("/complete");
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
