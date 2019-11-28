
export const FindStock = (stock) => {
  for (let i = 1; i < Stocks.length; ++i) {
    if (Stocks[i][0] === stock || Stocks[i][1] === stock) return Stocks[i]; 
  }
  return false;
}

export const AssociateStock = (stock) => {
  let possible = [];
  for (let i = 1; i < Stocks.length && possible.length < 10; ++i) {
    if (Stocks[i][0].indexOf(stock) !== -1 || Stocks[i][1].indexOf(stock) !== -1) possible.push([Stocks[i][0], Stocks[i][1]]); 
  }
  return possible;
}