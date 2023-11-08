// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Class Booking', {
	refresh: function(frm) {
		frm.add_custom_button(__('Book a locker'), function(){

            frappe.new_doc('Gym Locker Booking');		
		}, __("NextActions"));

        frm.add_custom_button(__('Subscribe To a trainer plan'), function(){

            frappe.new_doc('Gym Trainer Subscription');		
		},  __("NextActions"));

		// Get the value of the Gym Member Type from the linked Gym Member
        var member_type = frm.doc.member && frm.doc.member.membership_type;

        // Clear the existing custom buttons
        frm.page.clear_menu();

        if (member_type === 'Gold' || member_type === 'Platinum') {
            // Show the "Book a Locker" button
            frm.add_custom_button(__('Book a Locker'), function() {
                // Add your "Book a Locker" button logic here
            });
        } else if (member_type === 'Silver') {
            // Show the "Subscribe to a Trainer Plan" button
            frm.add_custom_button(__('Subscribe to a Trainer Plan'), function() {
                // Add your "Subscribe to a Trainer Plan" button logic here
            });
        }


		frm.fields_dict['class_type'].get_query = function(doc) {
            return {
                filters: [
                    {
                        fieldname: 'class_type',
                        operator: 'in',
                        value: ['Group Class', 'Individual Class']
                    }
                ]
            };
        };


		
	},
    class_type:function(frm) {
        var class_type = frm.doc.class_type;
        if (class_type === 'Group Class') {
            frm.set_value('booking_cost', 3.00);
        } else if (class_type === 'Individual Class') {
            frm.set_value('booking_cost', 5.00);
        }
    },

    member_name: function (frm) {
        // Get the selected member name
        var member_name = frm.doc.member_name;
        
        // Query the Gym Member document to retrieve the associated email
        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'Gym Member',
                name: member_name
            },
            callback: function (r) {
                if (r.message && r.message.email) {
                    // Set the member email field with the retrieved email
                    frm.set_value('member_email', r.message.email);
                }
            }
        });
    }
});
