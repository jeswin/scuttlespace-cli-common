import ApolloClient from "apollo-client";
import { ICallContext } from "standard-api";

export { default as Response } from "./Response";

export interface IConfig {
  hostname: string;
  botMention: string;
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
  pub: string,
  messageSource: IMessageSource,
  config: IConfig,
  opts: {
    apolloClient: ApolloClient<any>;
  },
  context: ICallContext
) => Promise<IHandlerResponse | undefined>;

export interface IScuttlespaceCommandsModule {
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
