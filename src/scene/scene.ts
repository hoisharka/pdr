import { Group } from "./group";
export class Scene{
  constructor(
    public _id: string,
    public title: string,
    public groups: Group[]){}
}
