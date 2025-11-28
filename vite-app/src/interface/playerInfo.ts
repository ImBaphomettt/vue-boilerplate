import {vec3} from "./vector";

export interface PlayerInfo {
    health: number;
    armor: number;
    position: vec3;
    rotation: vec3;
}