"use strict";

module.exports = {
  up: (queryInterface) => {
    const adminData = [
      {
        name: "Recruiter",
        email: "therecruitsgroup@gmail.com",
        password:
          "$2b$10$MXvmXJnV7jJhZKPFp0wyquMUNq3.64AFil00wiCxmyK0/jGmx2uaC",
        role: "recruiter",
        status: "accepted",
      },
    ];

    return queryInterface.bulkInsert("admins", adminData, {});
  },
  down: (queryInterface) => {
    return queryInterface.sequelize.query(
      "TRUNCATE TABLE admins RESTART IDENTITY CASCADE"
    );
  },
};
