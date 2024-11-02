import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const routes = {
  "/api/auth": "http://localhost:4000/auth",
  "/api/users": "http://localhost:4000/users",
  "/api/msgs": "http://localhost:4001/msgs",
};

for (const route in routes) {
  const target = routes[route];
  app.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
}

const PORT = 8080

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
