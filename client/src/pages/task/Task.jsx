import React from "react";

const Task = () => {
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
  const [category, setCategory] = React.useState(null);

  const handleChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
    console.log(category);
  };
// const filterData = category
//   ? data.filter(item => item.category === category)
//   : data; 
const filterData = React.useMemo(()=>{
    if(!category){
      return data;
    }
else return data.filter(item => item.category === category)
 

},[category])
  
//   const uniqueData = data.filter(
//   (item, index, self) =>
//     index === self.findIndex(obj => obj.category === item.category)
// );

const uniqueData = data.reduce((acc,item)=>{
if(acc.find(x=>x.category===item.category)){
return acc;
}
else{
return [...acc,item];
}
},[])

console.log("uniqueData", uniqueData);
  return (
    <div>
      <h1 className="text-3xl font-bold">Task Page</h1>
      <p className="text-xl"> This is a task page</p>
      <select
        className="border-2 border-gray-400 rounded-sm "
        name="category"
        id="category"
        onChange={handleChange}        
        value={category}
      >
        {uniqueData.map((item) => (
          <option value={item.category}>{item.category}</option>
        ))}
      </select>
      <ol>
        {filterData?.map((item) => (
          <li key={item.id}>
            {/* <h2>{item.category}</h2> */}
            <p>{item.product}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Task;
