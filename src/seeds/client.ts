"use strict";

module.exports = {
  up: (queryInterface) => {
    const adminData = [
      {
        name: "Client",
        email: "client@therecruitsgroup.com",
        password:
          "$2y$10$RgPC89cNwan/L0arzrDkveLqnI.CkeFcslp9eoDuOcLhkP3hje.cG",
        role: "client",
        status: "accepted",
      },
    ];

    return queryInterface.bulkInsert("clients", adminData, {});
  },
  down: (queryInterface) => {
    return queryInterface.sequelize.query(
      "TRUNCATE TABLE clients RESTART IDENTITY CASCADE"
    );
  },
};
