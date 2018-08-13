import { Msg } from "ssb-typescript";
import { ICallContext } from "standard-api";
import Response from "./Response";

export { default as Response } from "./Response";

export interface IMessageSource {
  get(id: string): Promise<Msg<any>>;
}

export interface IHandlerResponse {
  message?: string;
}

export interface IConfig {
  graphqlHost: string;
  graphqlPort: number;
}

export interface IScuttleSpaceModule {
  handle(
    message: Msg<any>,
    msgSource: IMessageSource
  ): Promise<IHandlerResponse | void>;
}

export type HandlerFunc = (
  command: string,
  messageId: string,
  sender: string,
  config: IConfig,
  context: ICallContext
) => Promise<Response | undefined>;

export function extractText(source: Msg<any>, botPublicKey: string) {
  const text =
    source.value && source.value.content && source.value.content.text;

  return text
    ? text
        .substring(text.indexOf(botPublicKey) + botPublicKey.length + 1)
        .trim()
    : undefined;
}
