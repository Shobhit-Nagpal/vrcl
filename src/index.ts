import express from "express";
import cors from "cors";
import simpleGit from 'simple-git';
import { generateID } from "./utils/generate";
import path from "path";
import { getAllFiles } from "./utils/file";
import { uploadFile } from "./utils/supabase";
import { createClient } from "redis";

const app = express();
const client = createClient();
app.use(cors());
app.use(express.json());

client.on("error", err => console.log("Redis Client Error", err));

async function main() {
  await client.connect();
}
main().catch((err) => console.log(err));

app.post("/upload", async (req, res) => {
  const repoURL = req.body.repoURL;
  console.log(repoURL);
  const repoID = generateID();
  await simpleGit().clone(repoURL, path.join(__dirname, `out/${repoID}`));

  const files = getAllFiles(path.join(__dirname, `out/${repoID}`));

  for (let i = 0 ; i < files.length ; i++) {
    await uploadFile(files[i].slice(__dirname.length + 1), files[i]);
  }

  client.lPush("build-queue", repoID);

  res.status(200).json({id: repoID});
})

app.listen(3000, () => {
  console.log(`App listening on port 3000!`);
})
