"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getAllFiles(dir) {
    let response = [];
    const allPaths = fs_1.default.readdirSync(dir);
    allPaths.forEach(file => {
        const fullPath = path_1.default.join(dir, file);
        if (fs_1.default.statSync(fullPath).isDirectory()) {
            response = response.concat(getAllFiles(fullPath));
        }
        else {
            response.push(fullPath);
        }
    });
    return response;
}
exports.getAllFiles = getAllFiles;
