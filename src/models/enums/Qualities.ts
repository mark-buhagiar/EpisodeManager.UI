export enum QualityId {
    StandardDef = 1,
    P720 = 2,
    P1080 = 3,
}

export enum QualityDescription {
    StandardDef = 'Standard definition',
    P720 = '720p',
    P1080 = '1080p',
}

export type Quality = {
    id: QualityId;
    description: QualityDescription;
};

export const Qualities = [
    { id: QualityId.StandardDef, description: QualityDescription.StandardDef },
    { id: QualityId.P720, description: QualityDescription.P720 },
    { id: QualityId.P1080, description: QualityDescription.P1080 },
];
