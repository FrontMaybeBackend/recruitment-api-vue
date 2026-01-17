import {JobTypeEnum, PositionTypeEnum} from "@/types/enums";

export interface Application {
    id?: number;
    name: string;
    email: string;
    surname: string;
    phone: string;
    experience: string;
    jobTypeEnum: JobTypeEnum;

    positionTypeEnum: PositionTypeEnum;


}