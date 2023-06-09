// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
    password: process.env.SESSION_SECRET,
    cookieName: "todoApp",
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    },
};