const order = require('../model/order')

module.exports = {

    //GET /order/list - retorna todas as orders
    allOrder: (req, res) => {
        const orders = order.getAllOrders();
        return res.status(200).json(orders);
    },

    //GET /order/:id - retorna uma order baseada no id
    showOrder: (req, res) => {
        const { id } = req.params;
        const orderFound = order.getOrderById(id);
        if(!orderFound) {
            return res.status(404).json({ message: 'Order Not Found'})
        }
        return res.status(200).json(orderFound);
    },
    //POST /order - cria um novo pedido
    createOrder: (req, res) => {
        const { value, itens } = req.body;
        const newOrder = order.createOrder(value, itens);
        return res.status(201).json(newOrder);
    },

    //GET /order/list - lista todos os pedidos


    //PUT /order/:id - atualiza um pedido baseado no id
    update: (req, res) => {
        const { id } = req.params;
        const { value, itens } = req.body;
        const orderFound = order.getOrderById(id);
        if(!orderFound) {
            return res.status(404).json({ message: 'Order Not Found'})
        }
        orderFound.value = value ?? orderFound.value;
        orderFound.itens = itens ?? orderFound.itens;

        order.updateOrder(orderFound);
        return res.status(200).json(orderFound);
    },

    //DELETE /order/:id - deleta um pedido baseado no id
    delete: (req, res) => {
        const { id } = req.params;
        const userDeleted = order.deleteOrder(id);
        return res.status(200).json(userDeleted);
    }
}