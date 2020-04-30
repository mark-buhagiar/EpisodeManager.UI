import React from 'react';
import QualityIndicator from '../qualityIndicator/QualityIndicator';
import { QualityId, QualityDescription } from '../../models/enums/Qualities';
import './QualitiesLegend.scss';

const QualitiesLegend: React.FC = (): JSX.Element => {
    return (
        <div className="qualities-legend">
            <div>
                <QualityIndicator qualityId={QualityId.StandardDef} /> {QualityDescription.StandardDef}
            </div>
            <div>
                <QualityIndicator qualityId={QualityId.P720} /> {QualityDescription.P720}
            </div>
            <div>
                <QualityIndicator qualityId={QualityId.P1080} /> {QualityDescription.P1080}
            </div>
        </div>
    );
};

export default QualitiesLegend;
