const convertBackType = (s) => {
  switch (s.toLowerCase()) {
    case 'technologies':
      return 'tech';
    case 'phone':
      return 'phone';
    case 'tablet':
      return 'tablet';
    case 'laptop':
      return 'laptop';
    case 'desktop':
      return 'desktop';
    case 'television':
      return 'tivi';
    case 'refrigerator':
      return 'fridge';
    case 'camera':
      return 'camera';
    case 'headphone':
      return 'headphone';
    case 'accessory':
      return 'accessory';
    case 'fashion':
      return 'fashion';
    case "women's fashion":
      return 'women';
    case "men's fashion":
      return 'men';
    case 'shirt':
      return 'shirt';
    case 'pants':
      return 'pants';
    case 'handbag':
      return 'handbag';
    case 'furniture':
      return 'furniture';
    case 'clothes':
      return 'clothes';
    case 'books':
      return 'books';
    case 'jewelry':
      return 'jewelry';
    case 'electronics':
      return 'electronics';
    case 'sneaker':
      return 'sneaker';
    case 'travel':
      return 'travel';
    case 'gadget':
      return 'gadget';
    case 'toys':
      return 'toys';
    case 'education':
      return 'education';
    case 'book':
      return 'book';
    case 'paper':
      return 'paper';
    case 'pen':
      return 'pen';
    case 'bag':
      return 'bag';
    case 'calculator':
      return 'calculator';
    case 'ruler':
      return 'ruler';
    case 'beauty':
      return 'beauty';
    case 'perfume':
      return 'perfume';
    case 'lipstick':
      return 'lipstick';
    case 'essential oil':
      return 'essentialoil';
    case 'sunscreen':
      return 'suncream';
    case 'shower gel':
      return 'showergel';
    case 'face mask':
      return 'mask';
    case 'toothpaste':
      return 'toothpaste';
    case 'fitness':
      return 'fitness';
    case 'other':
      return 'other';
    case 'table':
      return 'table';
    case 'chair':
      return 'chair';
    case 'picture':
      return 'picture';
    case 'sofa':
      return 'sofa';
    case 'washing machine':
      return 'washingmachine';
    default:
      return '';
  }
};

export default convertBackType;
