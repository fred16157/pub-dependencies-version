class PackageInfo {
    name: string;
    latest: string;
    versions: VersionInfo[];
    constructor(json: string | any) {
        if(typeof json === "string") {
            json = JSON.parse(json);
        }
        this.name = json.name;
        this.latest = json.latest.version;
        this.versions = [];
        for(let version of json.versions) {
            this.versions.push(new VersionInfo({ version: version.version, releaseDate: version.published } ));
        }
        this.versions.sort((a, b) => {
           return -1 * a.releaseDate.getTime() - b.releaseDate.getTime();
        });
    }
}

class VersionInfo {
    version: string;
    releaseDate: Date;
    constructor(data: any) {
        this.version = data.version;
        this.releaseDate = new Date(data.releaseDate);
    }
}

export default PackageInfo;