import { Options } from "./options";
import { PaginationProps, PaginationResponse } from "./pagination";

export type GetIntegrationWhatsappChannelsProps = {
  pagination?: PaginationProps;
  target_channel?: string;
};

export type Channel = {
  id: string;
  target_channel: string;
  webhook: string;
  settings: {
    domain_server?: string;
    authorization?: string;
    pin?: string;
    account_name?: string;
    server_wa_id?: string;
    phone_number?: string;
    phone_number_id?: string;
  };
  organization_id: string;
  created_at: string;
  is_active: boolean;
};

export type GetIntegrationWhatsappChannelsResponse = {
  channels: Channel[];
  pagination: PaginationResponse;
};

export const getIntegrationWhatsappChannels =
  (options: Options) => async (props?: GetIntegrationWhatsappChannelsProps) => {
    await options.authenticate();

    const response = await options.axios.get("/api/open/v1/integrations", {
      params: {
        ...props?.pagination,
        target_channel: props?.target_channel ?? "wa_cloud",
      },
    });
    return {
      channels: response.data.data,
      pagination: response.data.meta.pagination,
    } satisfies GetIntegrationWhatsappChannelsResponse;
  };
