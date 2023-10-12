import bodyParser from "body-parser";
import express, { type Request, type Response } from "express";
import { createRedirection } from "../services/prisma/redirection";
import fs from "fs";
import path from "path";
import expressBasicAuth from "express-basic-auth";

const router = express.Router();

// HTTP Basic Auth
const users: Record<string, string> = {};
users[process.env.ADMIN_USER_NAME ?? "admin"] =
  process.env.ADMIN_USER_PASSWORD ?? "admin";

router.use(
  expressBasicAuth({
    users,
    challenge: true,
  }),
);

router.get("/admin", (req: Request, res: Response) => {
  fs.readFile(
    path.join(__dirname, "../views", "updateRedirection.html"),
    "utf8",
    (err, data) => {
      if (err != null) {
        return res.status(500).send("Internal Server Error");
      }
      res.send(data);
    },
  );
});

router.post(
  "/admin",
  express.json(),
  bodyParser.urlencoded({ extended: true }),
  (req: Request, res: Response) => {
    void (async () => {
      console.log(req.body);

      const { link } = req.body;
      await createRedirection(link);

      res.send("Redirection link updated.");
    })();
  },
);

export default router;
