module.exports = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: env('DB_HOST'),
            port: env.int('DB_PORT'),
            database: env('DB_NAME'),
            user: env('DB_USERNAME'),
            password: env('DB_PASSWORD'),
            ssl: {
                rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
            },
        },
        debug: false,
    },
});