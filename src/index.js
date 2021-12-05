import rapid from "@ovcina/rapidriver";
import {host, getTokenData} from "./helpers.js";

// Example
export async function ping(msg){
    const isLoggedIn = await getTokenData(msg.token);

    rapid.publish(host, "pong", {
        check: isLoggedIn ? true : false,
        sessionID: msg.sessionID,
    });
}

if(process.env.RAPID)
{
    rapid.subscribe(host, [{river: "template", event: "ping", work: ping}]);
}