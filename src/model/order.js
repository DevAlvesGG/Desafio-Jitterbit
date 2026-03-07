const uuid = require('uuid').v4;

//array de orders
let orders = [
    {
        id: uuid(),
        value: 100,
        creationDate: new Date(),
        itens: [
            {
                id: uuid(),
                name: 'Produto 1',
                price: 50,
                quantity: 2
            }
        ]
    },
    {
        id: uuid(),
        value: 200,
        creationDate: new Date(),
        itens: [
            {
                id: uuid(),
                name: 'Produto 2',
                price: 100,
                quantity: 2
            }
        ]
    }
]

const order = {

    //retorna todas as orders
    getAllOrders: () => {
        return orders
    },

    //retorna uma order baseada no id
    getOrderById: (id) => {
        return orders.find(order => order.id === id)
    },

    //cria uma order
    createOrder: (value, itens) => {
        const newOrder = {
            id: uuid(),
            value: value,
            creationDate: new Date(),
            itens: itens ?? []
        };
        orders.push(newOrder);
        return newOrder;
    },

    //atualiza uma order baseada no id
    updateOrder: (orderToUpdate) => {
        orders = orders.map(order => order.id === orderToUpdate.id ? orderToUpdate : order)
    },

    //deleta uma order baseada no id
    deleteOrder: (id) => {
        const orderIndex = orders.findIndex(order => order.id === id);
        if(orderIndex === -1) throw new Error('Order Not Found');
        const orderDeleted = orders.splice(orderIndex, 1);
        return orderDeleted;
    }
}

module.exports = order;