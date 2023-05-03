# Vercel Blob Storage

This plugin lets you use Vercel's Blob Storage to store files for Medusa.

## WARNING: WORK IN PROGRESS

This plugin is not ready for any application usage whether beta, alpha or production. This plugin does not work at the moment. Do not utilize this plugin until this warning message is taken off.

[Learn more about Vercel Blob Storage](https://vercel.com/storage/blob)

## Features (All of the features are TODO)

- [] Store product images on Vercel Blob Storage
- [] Support for importing and exporting data through CSV files, such as Products or Prices.
- [] Support for Bucket Policies and User Permissions.

---

## Prerequisites

- [Medusa backend](https://docs.medusajs.com/development/backend/install)
- [Access to Vercel Blob Storage](https://vercel.com/storage/blob)

---

## How to Install

1\. Run the following command in the directory of the Medusa backend:

  ```bash
  npm install medusa-file-vercel
  ```

2\. Set the following environment variables in `.env`:

  ```bash
  VERCEL_BLOB_READ_WRITE_TOKEN=<YOUR_BLOB_READ_WRITE_TOKEN>
  ```

3\. In `medusa-config.js` add the following at the end of the `plugins` array:

  ```js
  const plugins = [
    // ...
    {
      resolve: `medusa-file-vercel`,
      options: {
          vercel_token: process.env.VERCEL_BLOB_READ_WRITE_TOKEN,
      },
    },
  ]
  ```

---

## Test the Plugin

1\. Run the following command in the directory of the Medusa backend to run the backend:

  ```bash
  npm run start
  ```

2\. Upload an image for a product using the admin dashboard or using [the Admin APIs](https://docs.medusajs.com/api/admin#tag/Upload).

---

## Additional Resources

- [Vercel Blob Storage Documentation](https://vercel.com/storage/blob)