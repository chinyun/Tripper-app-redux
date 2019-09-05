export const getData = (datas) => {
  const total = datas[0].expense,
    traffic = datas[0].traffic_expense,
    food = datas[0].food_expense,
    living = datas[0].living_expense,
    ticket = datas[0].ticket_expense,
    shopping = datas[0].shopping_expense;

  const getPercentage = (target) => {
    if (total === '0') {
      return 0;
    }
    const num = target / total;
    num.toFixed(3);
    let result = (num * 100).toString();
    return result.slice(0, 4);
  };

  const trafficPercentage = getPercentage(traffic),
    foodPercentage = getPercentage(food),
    livingPercentage = getPercentage(living),
    ticketPercentage = getPercentage(ticket),
    shoppingPercentage = getPercentage(shopping);

  const data = [{ 
    name: '交通',
    cost: traffic,
    percentage: `${trafficPercentage}`,
    color: 'traffic-color'
  }, { 
    name: '飲食',
    cost: food,
    percentage: `${foodPercentage}`,
    color: 'food-color'
  }, { 
    name: '住宿',
    cost: living,
    percentage: `${livingPercentage}`,
    color: 'living-color'
  }, {
    name: '票券',
    cost: ticket,
    percentage: `${ticketPercentage}`,
    color: 'ticket-color'
  }, {
    name: '購物',
    cost: shopping,
    percentage: `${shoppingPercentage}`,
    color: 'shopping-color'
  }];

  return data;
};
