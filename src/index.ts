import { ICallContext } from "standard-api";
import Response from "./Response";

export { default as Response } from "./Response";

export interface IMessage {
  id: string;
  sender: string;
  root: string;
  text: string;
  timestamp: number;
}

export interface IMessageSource {
  get(id: string): Promise<IMessage>;
}

export interface IConfig {
  graphqlHost: string;
  graphqlPort: number;
}

export type HandlerFunc = (
  command: string,
  messageId: string,
  sender: string,
  config: IConfig,
  context: ICallContext
) => Promise<Response | undefined>;
