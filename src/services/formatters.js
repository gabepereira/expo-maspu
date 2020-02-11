const formatCurrency = value => {
    return `R$ ${value ? value.toFixed(2) : '0.00'}`;
};

const formatDate = date => {};

export { formatCurrency, formatDate };
