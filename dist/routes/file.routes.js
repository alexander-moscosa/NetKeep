"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_controller_1 = require("../controllers/file.controller");
const Auth_1 = require("../middlewares/Auth");
const router = (0, express_1.Router)();
router.post('/upload', Auth_1.verifyToken, file_controller_1.uploadFile);
exports.default = router;
