const { Client } = require('pg');

//configuration of the connection with the database
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'orders_manager',
    user: 'gustavo',
    password: "123456"
})
client.connect();

const order = {

/*
method: GET
route: /order/list

--return all orders
*/
    getAllOrders: async () => {
        try {
            const result = await client.query(`
            SELECT 
                o.orderId,
                o.value,
                o.creationDate,
                i.productId,
                i.name,
                i.quantity,
                i.price
            FROM "Order" o
            LEFT JOIN Items i ON o.orderId = i.orderId
        `);

        //group the items within each order.
        const ordersMap = {};
        for (const row of result.rows) {
            if (!ordersMap[row.orderid]) {
                ordersMap[row.orderid] = {
                    orderId: row.orderid,
                    value: row.value,
                    creationDate: row.creationdate,
                    itens: []
                };
            }
            if (row.productid) {
                ordersMap[row.orderid].itens.push({
                    productId: row.productid,
                    name: row.name,
                    quantity: row.quantity,
                    price: row.price
                });
            }
        }

        return Object.values(ordersMap);

        } catch (error) {
            throw new Error('Error retrieving orders.' + error.message);
        }
    },


/*
method: //
route: //

--function to found order with id passed as a parameter
*/
    getOrderById: async (id) => {
        try {
            const result = await client.query(`SELECT 
                o.orderid,
                o.value,
                o.creationDate,
                i.productid,
                i.name,
                i.quantity,
                i.price
                FROM "Order" o 
                LEFT JOIN Items i ON o.orderId = i.orderId 
                WHERE o.orderId = $1`, [id]
            );

            if(result.rows.length === 0) throw new Error('Order Not Found')
                    
            const order = {
                orderId: result.rows[0].orderid,
                value: result.rows[0].value,
                creationDate: result.rows[0].creationdate,
                itens: result.rows.filter(row => row.productid !== null).map(row => ({
                    productId: row.productid,
                    name: row.name,
                    quantity: row.quantity,
                    price: row.price
                }))
            };

            return order;
        } catch (error) {
            throw new Error('Order Not Found' + error.message)
        }
    },


/*
method: POST
route: /order

--function to create orders with information passed as a parameter
*/
    createOrder: async (value, itens) => {
        try {
            await client.query('BEGIN');

            const newOrder = await client.query(`INSERT INTO "Order" (value, creationDate) VALUES ($1, $2)
                RETURNING *`,
            [value, new Date()])

            const itensList = itens ?? []

            for(const item of itensList) {
               await client.query(
                    `INSERT INTO Items (orderId, name, quantity, price) 
                     VALUES ($1, $2, $3, $4)`,
                    [newOrder.rows[0].orderid, item.name, item.quantity, item.price]
                );
            }

            await client.query('COMMIT')

            // Retorna a order com os itens
            const result = newOrder.rows[0];
            result.itens = itensList;
            return result;
            
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Erro ao criar order: ' + error.message);
        }
    },


/*
method: PUT
route: /order/:id

--function to update an order with an already updated order passed as a parameter.
*/
    updateOrder: async (orderToUpdate) => {
        try {
            await client.query('BEGIN');
        
            //update value the order
            const updated = await client.query(`
                UPDATE "Order"
                SET value = $1
                WHERE orderId = $2
                RETURNING *`,
                [orderToUpdate.value, orderToUpdate.orderid]
            );

            //verify if order exist
            if(updated.rows.length === 0) throw new Error('Order Not Found')

            //delete old itens
            await client.query(`
                DELETE FROM Items WHERE orderId = $1`,
                [orderToUpdate.orderid]
            );

            //insert new itens
            const itensList = orderToUpdate.itens ?? [];
            for(const item of itensList) {
                await client.query(`
                   INSERT INTO Items (orderId, name, quantity, price)
                   VALUES ($1, $2, $3, $4)`,
                    [orderToUpdate.orderid, item.name, item.quantity, item.price ]
                );
            }
            await client.query('COMMIT');

            //return update order with as itens
            const result = updated.rows[0];
            result.itens = itensList;

            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Error to update order:' + error.message);
        }
    },


/*
method: DELETE
route: /order/:id

--function delete order with id passed as a parameter
*/
    deleteOrder: async (id) => {
        try {
            //select items first to display when deleting.
            const itens = await client.query(`SELECT * FROM Items WHERE orderId = $1`, [id])

            //delete itens first bacause forign key
            await client.query(`DELETE FROM Items WHERE orderId = $1`, [id]);

            //delete order
            const orderTodelete = await client.query(`DELETE FROM "Order" WHERE orderid = $1 RETURNING *`,[id]);
            if(orderTodelete.rows.length === 0) {
                throw new Error('Order Not Found')
            }

            const result = orderTodelete.rows[0];
            result.itens = itens.rows;

            return result
        } catch (error) {
            throw new Error('Error to delete order: ' + error.message);
        }
    }
}

module.exports = order;