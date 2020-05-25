import React from 'react';
import { QualityId, QualityDescription } from '../../models/enums/Qualities';
import './QualityIndicator.scss';

interface Props {
    qualityId: QualityId;
}

const QualityIndicator: React.FC<Props> = ({ qualityId }): JSX.Element => {
    const getQualityIndicator = (): string => {
        switch (qualityId) {
            case QualityId.StandardDef:
                return 'standard-def';
            case QualityId.P720:
                return 'p720';
            case QualityId.P1080:
                return 'p1080';
            default:
                return '';
        }
    };

    const getQualityDescription = (): string => {
        switch (qualityId) {
            case QualityId.StandardDef:
                return QualityDescription.StandardDef;
            case QualityId.P720:
                return QualityDescription.P720;
            case QualityId.P1080:
                return QualityDescription.P1080;
            default:
                return '';
        }
    };

    return (
        <div
            data-testid="episode-quality-indicator"
            title={getQualityDescription()}
            className={`quality-indicator ${getQualityIndicator()}`}
        ></div>
    );
};

export default QualityIndicator;
