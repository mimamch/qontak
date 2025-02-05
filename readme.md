# Mekari Qontak "Whatsapp" Package Library

Visit Official API Documentation [Docs Qontak](https://docs.qontak.com).
And Visit [Mekari Qontak](https://qontak.com) for more information.

## Installation

```bash
npm install @mimamch/qontak
```

## Usage

### Import package into your code

```js
import qontak from "@mimamch/qontak";
// or for CommonJS
const qontak = require("@mimamch/qontak");
```

### Create instance

```js
const client = qontak.createClient({
  username: "YOUR_USERNAME",
  password: "YOUR_PASSWORD",
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
});
```

### 🚀 Send your first OTP message

⚠️ **Note**: You need to create an OTP template first in the Qontak dashboard.

```js
await client.sendWhatsappMessageOutboundDirect({
  message_template_id: "YOUR_TEMPLATE_ID",
  channel_integration_id: "YOUR_CHANNEL_INTEGRATION_ID",
  to_number: "TARGET_PHONE_NUMBER",
  language: {
    code: "id", // "en" or "id"
  },
  parameters: {
    body: [
      {
        key: "1",
        value: "123456",
        value_text: "123456",
      },
    ],
    buttons: [
      {
        index: "0",
        type: "url",
        value: "123456",
      },
    ],
  },
});
```
