"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "Teknologi",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pendidikan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kesehatan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Lingkungan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Seni & Budaya",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
