import express, { type Request, type Response } from "express";
import { getMostRecentRedirection } from "./services/prisma/redirection";
import { createUserConnection } from "./services/prisma/userConnection";
import adminRouter from "./routes/admin";

const app = express();
const port = 3000;

// Express config
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  void (async () => {
    // Get the redirection
    const redirection = await getMostRecentRedirection();

    // Create a user connection asynchronously
    void createUserConnection(
      req.ip,
      req.headers["user-agent"] ?? "",
      redirection?.id ?? "",
    );

    // Redirect the user
    if (redirection != null) {
      res.redirect(redirection.link);
    } else {
      res.status(404).send("Redirection link not found");
    }
  })();
});

// Import Routers
app.use(adminRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
