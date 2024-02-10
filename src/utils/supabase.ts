import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import "dotenv/config";

const PROJECT_URL = process.env["SUPABASE_PROJECT_URL"] || "";
const ANON_KEY = process.env["SUPABASE_ANON_KEY"] || "";

export const supabase = createClient(PROJECT_URL, ANON_KEY);

export async function uploadFile(fileName: string, localFilePath: string) {
  const content = fs.readFileSync(localFilePath);
  const { data, error }  = await supabase
  .storage
  .from("vercel")
  .upload(`${fileName}`, content, {
    cacheControl: "3600",
    upsert: false
  });

  if (error !== null) {
    console.error(error);
  }
  console.log(data);

}
