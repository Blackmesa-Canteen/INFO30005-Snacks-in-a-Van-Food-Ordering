let mongoose = require('./mongoDB'),
    Schema = mongoose.Schema;

// order schema for orders collection
let orderSchema = new Schema({

    /** we can use _id that is auto generated by mongoDB and do some slice at
     * back-end to show partial id in my_orders page
     * */
    // order_id: String,

    /**
     * "foreign key" in one-to-many relationship's many-side.
     *    These two references are used to identify this order belongs to which customer and which van.
     *    These two references are used to do query:
     *
     *    order_van_name should be shown on previous order's detail page
     *
     *    order_customer_id should be used to check whether the order belongs to a logged-in user, so that
     *    can decide whether to show the order detail to this user or not
     *
     */
    <<
    << << < HEAD
    order_customer_id: { type: String, required: true },
    order_van_name: { type: String, required: true },

    // confirming, preparing, ready, complete, cancelled
    status: { type: String, required: true },
    ===
    === =
    order_customer_id: { type: String, required: true },
    order_van_name: { type: String, required: true },

    // confirming, preparing, ready, complete, cancelled
    status: { type: String, required: true },
    >>>
    >>> > vendor - app - dev - fixes - 2

    /**
     * we shouldn't keep customer's last name in order, if one customer
     * changed his lastname, we need to update lastname in both database: Orders and Customers,
     * which increases coupling and bad for maintainability.
     *
     * for showing customer's lastname in vendor app orders page, do queries in Customers collection to find the current
     * last_name based on order_customer_id provided in the Order
     * */
    //customer_last_name: String,

    /** remove timestamp to make start_time can be changed */
    // start_time: {
    //     type: Date,
    //     default: Date.now
    // },

    start_time: { type: Date, default: Date.now },
    end_time: Date,

    /** Line items for an order
     *
     * we just store an array of {snack_name, number}, because on the order monitor page, we just need to show snacks' names
     * and their numbers, and we don't need to show other snack details from db such as snack images on order monitor page.
     * What's more, snack_name is also acting as "primary key" of the snack schema, if we really want to get detailed snack
     * info for a specific order (maybe we don't need to), we can query the snack_name in lineItems collections.
     *
     */
    lineItems: {
        type: [{
            snack_name: { type: String, required: true },
            number: { type: Number, required: true },
            remark: String
        }],
        required: true
    },
    is_given_discount: { type: Boolean, required: true },
    stars: Number,
    cost: { type: Number, required: true },
    refund: Number,
    total_price: Number

});


/* The first parameter is the singular form of the
collection name corresponding to the model. Mongoose
will automatically find collections whose names are the
plural of model names. For the example, the Customer
model corresponds to the customer collection in the database. */
module.exports = mongoose.model('Order', orderSchema);