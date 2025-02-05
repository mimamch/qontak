import axios from "axios";
import { sendWhatsappMessageOutboundDirect } from "./message";
import { Options, ExposedOptions } from "./options";
import { getAuth } from "./auth";
import { getIntegrationWhatsappChannels } from "./integrations";
import { getWhatsapMessageTemplates } from "./template";

export const createClient = (options: ExposedOptions) => {
  const a = axios.create({
    baseURL: options.baseUrl ?? "https://service-chat.qontak.com",
  });
  const opt: Options = {
    ...options,
    axios: a,
    async authenticate() {
      const response = await getAuth({
        axios: a,
        username: options.username,
        password: options.password,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
      });

      this.axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.access_token}`;
    },
  };

  return {
    sendWhatsappMessageOutboundDirect: sendWhatsappMessageOutboundDirect(opt),
    getIntegrationWhatsappChannels: getIntegrationWhatsappChannels(opt),
    getWhatsapMessageTemplates: getWhatsapMessageTemplates(opt),
  };
};
