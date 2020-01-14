export default function createMenu() {
  const items = []

  for (let i = 1; i <= 5; i++) {
    items.push(createGroup(i))
  }

  return {
    items,
    header: 'Root header',
    footer: 'Root footer',
  }
}

function createGroup(i) {
  const items = []

  for (let j = 1; j <= 5; j++) {
    items.push(createCategoryItem(j))
  }

  return {
    text: `Group ${i}`,
    header: 'header',
    footer: 'footer',
    items,
  }
}

function createCategoryItem(i) {
  const items = []

  for (let j = 1; j <= 5; j++) {
    items.push(createSubcategoryItem(j))
  }

  return {
    text: `Category ${i}`,
    items,
  }
}

function createSubcategoryItem(i) {
  const items = []

  for (let j = 1; j <= 5; j++) {
    items.push(createProductItem(j))
  }

  return {
    text: `Subcategory ${i}`,
    href: `/s/[subcategoryId]`,
    as: `/s/${i}`,
    expanded: i === 1,
    items,
  }
}

function createProductItem(i) {
  return {
    text: `Product ${i}`,
    href: `/p/[productId]`,
    as: `/p/${i}`,
  }
}
