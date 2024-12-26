import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID

export const client = createThirdwebClient({
    clientId : process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string,
});
