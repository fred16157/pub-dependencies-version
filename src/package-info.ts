class PackageInfo {
    name: string;
    latest: string;
    versions: string[];
    constructor(json: string | any) {
        if(typeof json === "string") {
            json = JSON.parse(json);
        }
        this.name = json.name;
        this.latest = json.latest.version;
        this.versions = [];
        for(let version of json.versions) {
            this.versions.push(version.version);
        }
    }
}

export default PackageInfo;