import { ICallContext } from "standard-api";
import Response from "./Response";

export { default as Response } from "./Response";

export interface IConfig {
  graphqlHost: string;
  graphqlPort: number;
}

export interface IMessage<TContent> {
  author: string;
  branch?: string | string[];
  channel?: string;
  content: TContent;
  key: string;
  mentions?: string[];
  root?: string;
  timestamp: number;
  type: string;
}

export interface IMessageSource {
  get(id: string): Promise<IMessage<any>>;
}

export interface IHandlerResponse {
  message?: string;
}

export type HandlerFunc = (
  message: IMessage<any>,
  messageSource: IMessageSource,
  context: ICallContext
) => Promise<IHandlerResponse | undefined>;

export interface IScuttleSpaceModule {
  handle: HandlerFunc;
  init(config: IConfig): Promise<void>;
}

export function extractText(source: IMessage<any>, botPublicKey: string) {
  const text = source && source.content && source.content.text;

  return text
    ? text
        .substring(text.indexOf(botPublicKey) + botPublicKey.length + 1)
        .trim()
    : undefined;
}
