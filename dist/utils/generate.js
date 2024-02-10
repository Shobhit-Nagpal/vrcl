"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = void 0;
const MAX_LEN = 5;
function generateID() {
    let id = "";
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < MAX_LEN; i++) {
        id += subset[Math.floor(Math.random() * subset.length)];
    }
    return id;
}
exports.generateID = generateID;
