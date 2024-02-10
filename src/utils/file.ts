import fs from "fs";
import path from "path";

export function getAllFiles(dir: string) {
  let response: string[] = [];
  const allPaths = fs.readdirSync(dir); 
  allPaths.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      response = response.concat(getAllFiles(fullPath));
    } else {
      response.push(fullPath);
    }
  })
  return response;
}
