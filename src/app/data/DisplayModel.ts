export class Description {
    title:string;
    byline:string;
    brief:string;
    details:string;

    constructor(title:string, byline:string, brief:string, details:string) {
        this.title = title;
        this.byline = byline;
        this.brief = brief;
        this.details = details;
    }
}

export class Model {
    name:string;
    image2d:string;
    image3d:string;
    description:Description;

    constructor(name:string, image2d:string, image3d:string, description:Description) {
        this.name = name;
        this.image2d = image2d;
        this.image3d = image3d;
        this.description = description;
    }
}
