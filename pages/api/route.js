let routes = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { driver, route, status } = req.body;

    routes.push({
      driver,
      route,
      status,
      time: new Date().toLocaleTimeString()
    });

    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json(routes);
  }

  res.status(405).json({ error: "Method not allowed" });
}
