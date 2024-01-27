const products = ((product, amount) => {
    const result = [];
    for (let i = 0; i < amount; i++)
    {
      const cpy = {...product};
      cpy._id = i + cpy._id;
      result.push(cpy);
    }
    return result;
  })({
    assets: {thumbnail: 'https://media.istockphoto.com/id/1354823135/photo/violet-t-shirt-template-men-isolated-on-white-tee-shirt-blank-as-design-mockup-front-view.jpg?s=1024x1024&w=is&k=20&c=42T1swRTZxbYZJTXgB5Sd_BH3acg88Xg3Ws4zHB3UHw='},
    name: "Cool Shirt",
    brand: "NIKE",
    _id: "kehvkjrvleyvlryebvlivblqvybl",
    price: {
      currency: "USD",
      value: 29.99
    }
  }, 20);