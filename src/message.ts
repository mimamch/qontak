import { Options } from "./options";
import { PaginationResponse } from "./pagination";

export type SendMessageParameters = {
  header?: {
    format: (string & {}) | "DOCUMENT" | "VIDEO" | "IMAGE";
    params: {
      key: string;
      value: string;
    }[];
  };

  body?: {
    key: string;
    value: string;
    value_text: string;
  }[];

  buttons?: {
    index: string;
    type: string;
    value: string;
  }[];
};

export type MessageTemplate = SendMessageParameters & {
  id: string;
  organization_id: string;
  name: string;
  language: string;
  footer: null | null;
  status: string;
  category: string;
  quality_rating_text: string | null;
  quality_rating: any;
  type: string;
  analysis: any;
  probability: any;
};

export type BroadcastsWhatsappDirect = {
  to_number: string;
  to_name?: string;
  message_template_id: string;
  channel_integration_id: string;
  language: {
    code: (string & {}) | "id" | "en";
  };
  parameters?: SendMessageParameters;
  name?: string;
};

export type MessageStatusCount = {
  failed: number;
  delivered: number;
  read: number;
  pending: number;
  sent: number;
};

export type BroadcastsWhatsappDirectResponse = {
  id: string;
  name: string;
  organization_id: string;
  channel_integration_id: string;
  contact_list_id: string | null;
  contact_id: string;
  target_channel: string;
  send_at?: string;
  execute_status?: string;
  execute_type?: string;
  parameters: SendMessageParameters;
  created_at: string;
  message_status_count: MessageStatusCount;
  message_template: MessageTemplate;
  contact_extra?: {
    [key: string]: string;
  };
  division_id: any;
  message_broadcast_error: string | null;
  sender_name: string;
  sender_email: string;
  channel_account_name: string;
  channel_phone_number: string;
  message_broadcast_plan_id: string | null;
};

export const sendWhatsappMessageOutboundDirect =
  (options: Options) => async (props: BroadcastsWhatsappDirect) => {
    await options.authenticate();

    const response = await options.axios.post(
      "/api/open/v1/broadcasts/whatsapp/direct",
      {
        to_name: props.to_name ?? props.to_number,
        to_number: props.to_number,
        message_template_id: props.message_template_id,
        channel_integration_id: props.channel_integration_id,
        language: props.language,
        parameters: props.parameters,
        name: props.name,
      }
    );
    return response.data.data as BroadcastsWhatsappDirectResponse;
  };

type GetLogWhatsappMessageOutboundDirectResponse = {
  data: {
    id: string;
    organization_id: string;
    messages_broadcast_id: string;
    contact_phone_number: string;
    contact_full_name: string;
    status: string;
    whatsapp_message_id: string;
    whatsapp_error_message: string;
    messages_response: {
      messages: {
        id: string;
      }[];
      meta: {
        api_status: string;
        version: string;
      };
      sent: {
        statuses: {
          id: string;
          status: string;
          timestamp: string;
          recipient_id: string;
        }[];
      };
      delivered: {
        statuses: {
          id: string;
          recipient_id: string;
          status: string;
          timestamp: string;
        }[];
      };
    };
    created_at: string;
  };

  meta: {
    pagination: PaginationResponse;
  };
};

/**
 * @param id direct message id
 */
export const getLogWhatsappMessageOutboundDirect =
  (options: Options) => async (id: string) => {
    await options.authenticate();
    const response = await options.axios.get(
      `/api/open/v1/broadcasts/${id}/whatsapp/log`
    );
    return response.data as GetLogWhatsappMessageOutboundDirectResponse;
  };
