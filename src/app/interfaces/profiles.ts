import { RoutesInterface } from './routes';

export interface ProfilesInterface {
    _id: string;
    name: string;
    description: string;
    routes: Array<RoutesInterface>;
    creator: string;
    status: string;
    created: Date;
    updated: Date;
}
