
import {Model} from "./DisplayModel";

export const MODELS : Model[] = [
    {
        id: 0,
        name: "Product1",
        image2d: "P_ONE.svg",
        image3d: "P_ONE.svg",
        description: {
            title: "Product One",
            byline: "Not just any product.",
            brief: "A simple paragraph. Not too many sentences, not too many syllables.",
            details: "Lorum Ipsum"
        },
        active: 'active'
    },
    {
        id: 1,
        name: "Product2",
        image2d: "P_ONE.svg",
        image3d: "P_ONE.svg",
        description: {
            title: "Product Two",
            byline: "Not like any other product.",
            brief: "A simple paragraph. Worded differently from PRODUCT ONE.",
            details: "Lorum Ipsum"
        },
        active: ''
    },
    {
        id: 2,
        name: "Product3",
        image2d: "P_ONE.svg",
        image3d: "P_ONE.svg",
        description: {
            title: "Product Three",
            byline: "Not like the other products.",
            brief: "A simple paragraph. Worded differently from PRODUCT ONE and PRODUCT TWO.",
            details: "Lorum Ipsum"
        },
        active: ''
    }
];
