import { MedaljeStruct } from "./medaljeStruct";
import { TakmicarClass } from "./takmicarClass";

export class MedaljeClass
{
    zemlja : string;
    br_zlatnih : string;
    br_bronzanih : string;
    br_srebrnih : string;
    osvajaci : Object;
    sportovi_disc : Array<MedaljeStruct>;
}