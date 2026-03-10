const BASE_URL = process.env.BACKEND_BASE_URL;

export async function POST(req) {
  try {
    const { message } = await req.json();
    const res = await fetch(`${BASE_URL}/bot/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    console.log("response status:", res.status);

    const data = await res.json();

    console.log("data...", data);

    return Response.json(data);
  } catch (error) {
    console.error("chat api error:", error);
    return Response.json({ reply: "Server error" }, { status: 500 });
  }
}