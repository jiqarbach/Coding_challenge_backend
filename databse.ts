import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    <string>process.env.DB_NAME,
    <string>process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(<string>process.env.DB_PORT, 10),
        dialect: 'mysql'
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log(
            `Connected to Mysql database on port ${process.env.DB_PORT}`
        );
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize