// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Trainer Subscription', {
    refresh: function(frm) {
        
        console.log(frm.doc.ratings)

        frm.add_custom_button(__('proceed to book a class'), function(){

            frappe.new_doc('Gym Class Booking');		
		});

        frm.fields_dict["subscription_start_date"].df.onchange = function (){
			set_end_booking_date(frm)
		};
        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'User',
                name: frappe.session.user
            },
            callback: function(r) {
                if (r.message && r.message.full_name) {
                    // Set the member name field to the full name of the user
                    frm.set_value('member', r.message.full_name);
                }
            }
        });


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
    },

    after_save: function(frm) {
		frappe.call({
			method: "gym_app.gym_app.service.rest.calculate_average_ratings",
			args: {
				name: frm.doc.trainer_name,
			},
			callback: function(response) {
				console.log(response.message);
			}
		});
		
	}
});

function set_end_booking_date(frm) {
    var start_date = frm.doc.subscription_start_date;
    if (start_date) {
        var end_date = frappe.datetime.add_days(start_date, 30);
        frm.set_value('subscription_end_date', end_date);
    }
}







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

