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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./shared/logger");
process.on('uncaughtException', (error) => {
    logger_1.errorLogger.error(error);
    process.exit(1);
});
let server;
function bootStrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.mongoURI);
            logger_1.logger.info('Connected to database');
            server = app_1.default.listen(config_1.default.port, () => {
                logger_1.logger.info(`Application listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            logger_1.errorLogger.error('Error connecting to database: ', error);
        }
        process.on('unhandledRejection', (error) => {
            if (server) {
                server.close(() => {
                    logger_1.errorLogger.error(error);
                    process.exit(1);
                });
            }
            else {
                logger_1.errorLogger.error(error);
                process.exit(1);
            }
        });
    });
}
bootStrap();
// process.on('SIGTERM', () => {
//   logger.info('SIGTERM signal received: closing HTTP server')
//   if (server) {
//     server.close(() => {
//       console.log('HTTP server closed')
//     })
//   }
// })
