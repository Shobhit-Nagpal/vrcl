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
exports.uploadFile = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const fs_1 = __importDefault(require("fs"));
require("dotenv/config");
const PROJECT_URL = process.env["SUPABASE_PROJECT_URL"] || "";
const ANON_KEY = process.env["SUPABASE_ANON_KEY"] || "";
exports.supabase = (0, supabase_js_1.createClient)(PROJECT_URL, ANON_KEY);
function uploadFile(fileName, localFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = fs_1.default.readFileSync(localFilePath);
        const { data, error } = yield exports.supabase
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
    });
}
exports.uploadFile = uploadFile;
