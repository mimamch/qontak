import { Options } from "./options";

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
