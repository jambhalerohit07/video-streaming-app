const data = [
  {
    id: 1,
    category: "Electronics",
    product: "Laptop",
  },
  {
    id: 2,
    category: "Furniture",
    product: "Office Chair",
  },
  {
    id: 3,
    category: "Electronics",
    product: "Smartphone",
  },
  {
    id: 4,
    category: "Appliances",
    product: "Refrigerator",
  },
  {
    id: 5,
    category: "Fashion",
    product: "Leather Jacket",
  },
  {
    id: 6,
    category: "Books",
    product: "JavaScript Guide",
  },
  {
    id: 7,
    category: "Sports",
    product: "Football",
  },
  {
    id: 8,
    category: "Beauty",
    product: "Face Serum",
  },
  {
    id: 9,
    category: "Home Decor",
    product: "Wall Clock",
  },
  {
    id: 10,
    category: "Groceries",
    product: "Organic Honey",
  },
];
const uniqueData = data.reduce((acc, item) => {
  if (acc.find((x) => x.category === item.category)) {
    return acc;
  } else {
    return [...acc, item];
  }
}, []);

console.log("uniqueDatauniqueDatauniqueData", uniqueData);
