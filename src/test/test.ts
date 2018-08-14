import "mocha";
import "should";
import { extractText, IMessage } from "..";
import Response from "../Response";

describe("scuttlespace-cli-common", () => {
  it("creates a response", () => {
    const resp = new Response("msg", "replyto");
    resp.message.should.equal("msg");
    resp.replyToId.should.equal("replyto");
    (typeof resp.timestamp).should.equal("number");
  });

  it("extracts text from a text message", () => {
    const msg: IMessage<{ text: string }> = {
      author: "author-id",
      content: {
        text: "some-bot-key hello world"
      },
      key: "some-msg-key",
      timestamp: 100,
      type: "post"
    };
    const text = extractText(msg, "some-bot-key");
    text.should.equal("hello world");
  });
});
