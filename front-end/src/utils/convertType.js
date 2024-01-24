const convertType = (s) => {
  switch (s) {
    case 'tech':
      return 'Technologies';
    case 'phone':
      return 'Phone';
    case 'tablet':
      return 'Tablet';
    case 'laptop':
      return 'Laptop';
    case 'desktop':
      return 'Desktop';
    case 'tivi':
      return 'Television';
    case 'fridge':
      return 'Refrigerator';
    case 'refrigerator':
      return 'Refrigerator';
    case 'camera':
      return 'Camera';
    case 'headphone':
      return 'Headphone';
    case 'accesory':
      return 'Accessory';
    case 'fashion':
      return 'Fashion';
    case 'women':
      return "Women's Fashion";
    case 'men':
      return "Men's Fashion";
    case 'shirt':
      return 'Shirt';
    case 'pants':
      return 'Pants';
    case 'handbag':
      return 'Handbag';
    case 'furniture':
      return 'Furniture';
    case 'clothes':
      return 'Clothes';
    case 'books':
      return 'Books';
    case 'jewelry':
      return 'Jewelry';
    case 'electronics':
      return 'Electronics';
    case 'sneaker':
      return 'Sneaker';
    case 'travel':
      return 'Travel';
    case 'gadget':
      return 'Gadget';
    case 'toys':
      return 'Toys';
    case 'education':
      return 'Education';
    case 'book':
      return 'Book';
    case 'paper':
      return 'Paper';
    case 'pen':
      return 'Pen';
    case 'bag':
      return 'Bag';
    case 'calculator':
      return 'Calculator';
    case 'ruler':
      return 'Ruler';
    case 'beauty':
      return 'Beauty';
    case 'perfume':
      return 'Perfume';
    case 'lipstick':
      return 'Lipstick';
    case 'essentialoil':
      return 'Essential Oil';
    case 'suncream':
      return 'Sunscreen';
    case 'showergel':
      return 'Shower Gel';
    case 'mask':
      return 'Face Mask';
    case 'toothpaste':
      return 'Toothpaste';
    case 'fitness':
      return 'Fitness';
    case 'other':
      return 'Other';
    case 'table':
      return 'Table';
    case 'chair':
      return 'Chair';
    case 'picture':
      return 'Picture';
    case 'sofa':
      return 'Sofa';
    case 'washingmachine':
      return 'Washing Machine';
    default:
      return '';
  }
};

export default convertType;
