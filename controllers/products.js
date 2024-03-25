const Product = require("../models/product");


const getALLProducts = async (req,res) => {
  const {company, name, featured, sort, select} = req.query;
  const querryObject ={};

  if(company){
    querryObject.company = company;
  }

  if(featured){
    querryObject.featured = featured;
  }

  if(name){
    querryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(querryObject);

  if(sort){
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  
  if(select){
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  let skip = (page-1)*limit;

  apiData = apiData.skip(skip).limit(limit);

  console.log(querryObject);

  const Products = await apiData;
  res.status(200).json({Products,nbHits:Products.length});
};

const getALLProductsTesting = async (req,res) => {
  const Products = await Product.find(req.query).select("name");
  console.log(req.query);
  res.status(200).json({Products});
};

module.exports = {getALLProducts, getALLProductsTesting};