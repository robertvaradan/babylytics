# Babylytics

Babylytics is a simple baby tracking application designed to help parents keep track of a baby's feeding and diaper change log. I made this because my wife and I ran out of space on the paper log our hospital gave us and our printer was out of ink.

## Features

-   **Progressive web app**: This application was optimized for installation on the homescreen of a mobile device.
-   **User Authentication**: Secure user authentication using Clerk, ensuring that only authorized users can access and modify data.
-   **Feeding and Diaper Tracking**: Easy-to-use interfaces for logging feedings and diaper changes, with automatic timestamping and data storage.
-   **Data Storage**: Data is stored securely using Convex, a cloud-based database solution.
-   **Real-time Updates**: The application updates in real-time, ensuring that users have access to the most recent data.
-   **Customizable**: The application is highly customizable, allowing users to tailor the experience to their specific needs.

## Getting Started

Access my live verison of the website [here](https://baby.woolly.one)

Theoretically you can run this yourself, but it requires a bit of setup. You'll need a Convex project, Clerk project, and Google Cloud project (for Google Oauth) to host. All of these are free for developers.

1. Clone the repository: `git clone https://github.com/your-username/babylytics.git`
2. Install dependencies: `npm install`
3. Start the application: `npm run dev`
4. Start Convex backend `npx convex dev`
5. Open the application in your web browser: `http://localhost:3000`

## Technical Details

-   **Frontend**: The application is built using Next.js.
-   **Backend**: The application uses Convex for data storage and Clerk for user authentication.
-   **Database**: The application stores data in a Convex database.
-   **Authentication**: User authentication is handled by Clerk.

## License

Babylytics is licensed under the MIT License. See LICENSE for more information.

## Acknowledgments

-   Clerk: for providing a seamless user authentication experience
-   Convex: for providing a secure and scalable data storage solution
-   Next.js: for providing a robust framework for building the application

## Dependencies

Install with `npm install` before use.

-   `@clerk/nextjs`: for user authentication
-   `convex`: for data storage
-   `next`: for building the application
-   `react`: for building the user interface
-   `typescript`: for type checking and code compilation

## Environment Variables

The application requires the following environment variables to be set in `.env.local`:

-   `CONVEX_DEPLOYMENT`: the Convex deployment name, which you will get from the Convex dashboard
-   `NEXT_PUBLIC_CONVEX_URL`: the development Convex URL
-   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: the Clerk publishable key
-   `CLERK_SECRET_KEY`: the Clerk secret key
-   `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: the Clerk sign-in URL, which should currently be set to `/auth/login`
-   `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: the Clerk sign-up URL, which should currently be set to `/auth/signup`
-   `CONVEX_JWT_ISSUER_URL`: the Convex JWT issuer URL
