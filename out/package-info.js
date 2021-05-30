"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PackageInfo {
    constructor(json) {
        if (typeof json === "string") {
            json = JSON.parse(json);
        }
        this.name = json.name;
        this.latest = json.latest.version;
        this.versions = [];
        for (let version of json.versions) {
            this.versions.push(version.version);
        }
    }
}
exports.default = PackageInfo;
//# sourceMappingURL=package-info.js.map