"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genareteUserId = void 0;
const genareteUserId = (lasUser) => {
    if (!lasUser) {
        return (1).toString().padStart(5, '0');
    }
    const lastUserId = parseInt(lasUser.id);
    return (lastUserId + 1).toString().padStart(5, '0');
};
exports.genareteUserId = genareteUserId;
