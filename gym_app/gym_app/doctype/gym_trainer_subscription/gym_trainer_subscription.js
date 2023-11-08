// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Trainer Subscription', {
    refresh: function(frm) {
        // frm.fields_dict['subscription_plan'].get_query = function(doc) {
        //     return {
        //         filters: [
        //             {
        //                 fieldname: 'subscription_plan',
        //                 operator: 'in',
        //                 value: ['one-on-one training', 'group training']
        //             }
        //         ]
        //     };
        // };

        // frm.fields_dict['subscription_plan'].df.onchange = () => {
        //     var subscription_plan = frm.doc.subscription_plan;
        //     if (subscription_plan === 'one-on-one training') {
        //         frm.set_value('subscription_cost', 25.00);
        //     } else if (subscription_plan === 'group training') {
        //         frm.set_value('subscription_cost', 15.00);
        //     }
        // };

        // Show the read-only field
        // frm.fields_dict['subscription_cost'].hidden = 1;
    }
});







// frappe.ui.form.on('Gym Trainer Subscription', {
//     refresh: function(frm) {
//         // Add a custom script for the "Subscription Plan" field change event
//         frm.fields_dict['subscription_plan'].get_query = function(doc) {
//             return {
//                 filters: {
//                     // Define your filters based on the "Subscription Plan" options
					// subscription_plan: "one-on-one training",
					// subscription_plan: "group training"
//                 },
				
//             };
//         };

//         frm.fields_dict['subscription_plan'].on('change', function() {
//             var subscription_plan = frm.doc.subscription_plan;
//             if (subscription_plan === 'one-on-one training') {
//                 frm.set_value('subscription_cost', 25.00);
//             } else if (subscription_plan === 'group training') {
//                 frm.set_value('subscription_cost', 15.00);
//             }
//         });
//     }
// });

