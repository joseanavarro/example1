import { PubPano } from "../models/pubPano";

export class PubTour {
    Title: string;
    Description: string;
    lat: string;
    lon: string;
    panos: PubPano[];
    portal_id: number;
    user_id: string;
    City: string;
    Street: string;
    Country: string;
    Postal_code: string;
    Address: string;
}