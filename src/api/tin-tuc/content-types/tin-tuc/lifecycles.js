'use strict';

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.slug) {
      let uniqueSlug = data.slug;
      let count = 1;

      // Kiểm tra xem slug đã tồn tại chưa
      while (await isSlugExists(uniqueSlug)) {
        uniqueSlug = `${data.slug}-${count}`;
        count++;
      }

      // Gán lại slug sau khi đảm bảo là duy nhất
      data.slug = uniqueSlug;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.slug) {
      let uniqueSlug = data.slug;
      let count = 1;

      // Kiểm tra xem slug đã tồn tại chưa
      while (await isSlugExists(uniqueSlug, event.params.where.id)) {
        uniqueSlug = `${data.slug}-${count}`;
        count++;
      }

      // Gán lại slug sau khi đảm bảo là duy nhất
      data.slug = uniqueSlug;
    }
  },
};

async function isSlugExists(slug, excludeId = null) {
  const existingEntry = await strapi.db.query('api::tin-tuc.tin-tuc').findOne({
    where: {
      slug,
      ...(excludeId && { id: { $ne: excludeId } }),
    },
  });
  return existingEntry !== null;
}
