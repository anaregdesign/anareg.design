export function loader() {
  return Response.json({
    status: "ok",
    message: "Health check passed",
  });
}
