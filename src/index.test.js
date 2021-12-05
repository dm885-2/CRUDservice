import {ping} from "./index.js";

test('ping responds with pong', () => {
    ping({token: "",}, (channel, message) => {
        expect(channel).toBe("pong");
        expect(message.check).toBe(false);
    });
});