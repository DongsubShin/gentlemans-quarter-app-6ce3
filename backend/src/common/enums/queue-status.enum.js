"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueStatus = void 0;
var QueueStatus;
(function (QueueStatus) {
    QueueStatus["WAITING"] = "WAITING";
    QueueStatus["IN_PROGRESS"] = "IN_PROGRESS";
    QueueStatus["COMPLETED"] = "COMPLETED";
    QueueStatus["CANCELLED"] = "CANCELLED";
})(QueueStatus || (exports.QueueStatus = QueueStatus = {}));
