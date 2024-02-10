"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const simple_git_1 = __importDefault(require("simple-git"));
const generate_1 = require("./utils/generate");
const path_1 = __importDefault(require("path"));
const file_1 = require("./utils/file");
const supabase_1 = require("./utils/supabase");
const redis_1 = require("redis");
const app = (0, express_1.default)();
const client = (0, redis_1.createClient)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
client.on("error", err => console.log("Redis Client Error", err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
    });
}
main().catch((err) => console.log(err));
app.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoURL = req.body.repoURL;
    console.log(repoURL);
    const repoID = (0, generate_1.generateID)();
    yield (0, simple_git_1.default)().clone(repoURL, path_1.default.join(__dirname, `out/${repoID}`));
    const files = (0, file_1.getAllFiles)(path_1.default.join(__dirname, `out/${repoID}`));
    for (let i = 0; i < files.length; i++) {
        yield (0, supabase_1.uploadFile)(files[i].slice(__dirname.length + 1), files[i]);
    }
    client.lPush("build-queue", repoID);
    res.status(200).json({ id: repoID });
}));
app.listen(3000, () => {
    console.log(`App listening on port 3000!`);
});
