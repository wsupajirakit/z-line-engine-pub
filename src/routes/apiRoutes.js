"use strict";

const express = require("express");
const router = express.Router();

const webhookController = require("../controllers/webhookController");
const modelController = require("../controllers/modelController");
const hookController = require("../controllers/hookController");
const auditLogController = require("../controllers/auditLogController");
const webhookLogController = require("../controllers/webhookLogController");
const systemConfigController = require("../controllers/systemConfigController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const roleController = require("../controllers/roleController");
const menuController = require("../controllers/menuController");
const groupController = require("../controllers/groupController");
const broadcastController = require("../controllers/broadcastController");
const autoReplyController = require("../controllers/autoReplyController");
const versionController = require("../controllers/versionController");
const internalCacheController = require("../controllers/internalCacheController");

const validateSignature = require("../middleware/lineSignature");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const shouldSkipAuth = (req) => {
  const skipPaths = [
    "/webhook",
    "/version",
    "/api/auth/login",
    "/auth/login",
    "/migration",
    "/api/internal/cache",
  ];
  if (skipPaths.includes(req.path)) return true;
  return /^\/[^/]+\/webhook$/.test(req.path);
};

router.use((req, res, next) => {
  if (shouldSkipAuth(req)) return next();
  return authenticate(req, res, next);
});

router.post("/:alias/webhook", validateSignature, webhookController.handleWebhook);
router.post("/webhook", validateSignature, webhookController.handleWebhook);
router.get("/model", modelController.getModels);
router.get("/version", versionController.getVersion);

router.post("/api/auth/login", authController.login);
router.post("/api/auth/logout", authController.logout);
router.post("/api/auth/refresh", authController.refresh);

router.get("/migration", hookController.migration);
router.post("/hook", hookController.createHook);
router.put("/hook/:id", hookController.updateHook);
router.patch("/hook/status", hookController.updateHookStatus);
router.delete("/hook/:id", hookController.deleteHook);
router.get("/hook", hookController.getAllHooks);
router.get("/hook/:id", hookController.getHookById);
router.get("/hook/:id/quota", hookController.getHookQuota);
router.post("/hook/:id/push", hookController.pushMessage);
router.get("/hook/group/:groupId", hookController.getHooksByGroup);

router.post("/audit/logs", auditLogController.createLog);
router.get("/audit/logs", auditLogController.listLogs);
router.get("/audit/logs/:auditLogId", auditLogController.getLog);

router.post("/webhook/logs", webhookLogController.createLog);
router.get("/webhook/logs", webhookLogController.listLogs);
router.get("/webhook/logs/:logId", webhookLogController.getLog);
router.put("/webhook/logs/:logId", webhookLogController.updateLog);
router.delete("/webhook/logs/:logId", webhookLogController.deleteLog);
router.get("/stats", webhookLogController.getStats);

router.post("/config", systemConfigController.createConfig);
router.get("/configs", systemConfigController.listConfigs);
router.get("/config/:id", systemConfigController.getConfig);
router.put("/config/:id", systemConfigController.updateConfig);
router.delete("/config/:id", systemConfigController.deleteConfig);

router.get("/api/users", authorize("user.manage"), userController.listUsers);
router.get("/api/users/:id", authorize("user.manage"), userController.getUserById);
router.post("/api/users", authorize("user.manage"), userController.createUser);
router.put("/api/users/:id", authorize("user.manage"), userController.updateUser);
router.delete("/api/users/:id", authorize("user.manage"), userController.deleteUser);
router.patch("/api/users/change-password", userController.resetPassword);
router.post("/api/users/generate-temp-key", userController.generateTempKey);
router.post("/api/users/reset-password-temp", userController.resetPasswordWithTempKey);
router.post("/api/users/:id/kill-sessions", authorize("user.manage"), userController.killUserSessions);

router.get("/api/roles", authorize("role.manage"), roleController.listRoles);
router.get("/api/roles/:id", authorize("role.manage"), roleController.getRoleById);
router.post("/api/roles", authorize("role.manage"), roleController.createRole);
router.put("/api/roles/:id", authorize("role.manage"), roleController.updateRole);
router.delete("/api/roles/:id", authorize("role.manage"), roleController.deleteRole);

router.get("/api/menus", authorize("menu.manage"), menuController.listMenus);
router.get("/api/menus/:id", authorize("menu.manage"), menuController.getMenuById);
router.post("/api/menus", authorize("menu.manage"), menuController.createMenu);
router.put("/api/menus/:id", authorize("menu.manage"), menuController.updateMenu);
router.delete("/api/menus/:id", authorize("menu.manage"), menuController.deleteMenu);

router.get("/api/groups", authorize("group.manage"), groupController.listGroups);
router.get("/api/groups/:id", authorize("group.manage"), groupController.getGroupById);
router.post("/api/groups", authorize("group.manage"), groupController.createGroup);
router.put("/api/groups/:id", authorize("group.manage"), groupController.updateGroup);
router.delete("/api/groups/:id", authorize("group.manage"), groupController.deleteGroup);

router.get("/api/broadcasts", authorize("broadcast.manage"), broadcastController.listBroadcasts);
router.get("/api/broadcasts/:id", authorize("broadcast.manage"), broadcastController.getBroadcastById);
router.post("/api/broadcasts", authorize("broadcast.manage"), broadcastController.createBroadcast);
router.put("/api/broadcasts/:id", authorize("broadcast.manage"), broadcastController.updateBroadcast);
router.delete("/api/broadcasts/:id", authorize("broadcast.manage"), broadcastController.deleteBroadcast);
router.post("/api/broadcasts/:id/send", authorize("broadcast.manage"), broadcastController.sendBroadcastNow);

router.get("/api/auto-replies", authorize("auto_reply.manage"), autoReplyController.listAutoReplies);
router.get("/api/auto-replies/findbyhook", authorize("auto_reply.manage"), autoReplyController.listAutoRepliesByHookId);
router.get("/api/auto-replies/:id", authorize("auto_reply.manage"), autoReplyController.getAutoReplyById);
router.post("/api/auto-replies", authorize("auto_reply.manage"), autoReplyController.createAutoReply);
router.put("/api/auto-replies/:id", authorize("auto_reply.manage"), autoReplyController.updateAutoReply);
router.patch("/api/auto-replies/:id/active", authorize("auto_reply.manage"), autoReplyController.updateAutoReplyActive);
router.delete("/api/auto-replies/:id", authorize("auto_reply.manage"), autoReplyController.deleteAutoReply);

router.get("/api/internal/cache", internalCacheController.getInternalCache);

module.exports = router;
