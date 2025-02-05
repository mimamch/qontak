import { Options } from "./options";
import { PaginationProps, PaginationResponse } from "./pagination";

export type GetWhatsapMessagepTemplatesProps = {
  pagination: PaginationProps;
};
export type GetWhatsapMessagepTemplatesResponse = {
  templates: any;
  pagination: PaginationResponse;
};

export const getWhatsapMessageTemplates =
  (options: Options) => async (props?: GetWhatsapMessagepTemplatesProps) => {
    await options.authenticate();

    const response = await options.axios.get(
      "/api/open/v1/templates/whatsapp",
      {
        params: {
          ...props?.pagination,
        },
      }
    );
    return {
      templates: response.data.data,
      pagination: response.data.meta.pagination,
    } satisfies GetWhatsapMessagepTemplatesResponse;
  };
