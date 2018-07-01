import "mocha";
import "should";
import Response from "../Response";

describe("scuttlespace-cli-common", () => {
  it("creates a response", () => {
    const resp = new Response("msg", "replyto");
    resp.message.should.equal("msg");
    resp.replyToId.should.equal("replyto");
    (typeof resp.timestamp).should.equal("number");
  });
});
