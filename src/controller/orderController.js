const order = require('../model/order')

module.exports = {

    //GET /order/list - return all orders
    allOrder: async (req, res) => {
        try {
            const orders = await order.getAllOrders();
            return res.status(200).json(orders);
        } catch (error) {
           return res.status(500).json({ message: error.message }) 
        }
    },

    //GET /order/:id - returns a specific order.
    showOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const numericId = parseInt(id);
            const orderFound = await order.getOrderById(numericId);
            return res.status(200).json(orderFound);
        } catch (error) {
            return res.status(404).json({ message: 'Order Not Founddd'})
        }
    },

    //POST /order - create a new order
    createOrder: async (req, res) => {
        try {
            const { value, itens } = req.body;
            const newOrder = await order.createOrder(value, itens);
            return res.status(201).json(newOrder);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    //PUT /order/:id - update order 
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { value, itens } = req.body;
            const orderFound = await order.getOrderById(id);
            orderFound.value = value ?? orderFound.value;
            orderFound.itens = itens ?? orderFound.itens;
            order.updateOrder(orderFound);
            return res.status(200).json(orderFound);
        } catch (error) {
            return res.status(404).json({ message: 'Order Not Found'})
        } 
    },

    //DELETE /order/:id - delete order 
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const userDeleted = await order.deleteOrder(id);
            return res.status(200).json(userDeleted);
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}