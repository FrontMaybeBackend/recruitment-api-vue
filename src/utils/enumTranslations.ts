import { JobTypeEnum, PositionTypeEnum } from '@/types/enums';

export const jobTypeLabels: Record<string, string> = {
    [JobTypeEnum.REMOTE]: 'Zdalnie',
    [JobTypeEnum.HYBRID]: 'Hybrydowo',
    [JobTypeEnum.ONSITE]: 'Stacjonarnie',
};

export const positionTypeLabels: Record<string, string> = {
    [PositionTypeEnum.JUNIOR]: 'Junior',
    [PositionTypeEnum.MID]: 'Mid',
    [PositionTypeEnum.SENIOR]: 'Senior',
};

export const jobTypeOptions = Object.entries(jobTypeLabels).map(([value, label]) => ({
    value,
    label
}));

export const positionTypeOptions = Object.entries(positionTypeLabels).map(([value, label]) => ({
    value,
    label
}));
