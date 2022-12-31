module.exports = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: env('DB_HOST'),
            port: env.int('DB_PORT'),
            database: env('DB_NAME'),
            user: env('DB_USERNAME'),
            password: env('DB_PASSWORD'),
            // dialectOptions: {
            //     ssl: {
            //         require: true, // This will help you. But you will see nwe error
            //         rejectUnauthorized: false // This line will fix new error
            //     }
            // },
        },
        debug: false,
    },
});