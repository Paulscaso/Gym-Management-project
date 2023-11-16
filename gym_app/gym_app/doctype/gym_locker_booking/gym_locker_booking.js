// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Locker Booking', {
	refresh: function(frm) {
		frm.add_custom_button(__('proceed to subscribe to a trainer'), function(){

            frappe.new_doc('Gym Trainer Subscription');		
		});

		frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'User',
                name: frappe.session.user
            },
            callback: function(r) {
                if (r.message && r.message.full_name) {
                    // Set the member name field to the full name of the user
                    frm.set_value('member_name', r.message.full_name);
                }
            }
        });

		frm.set_query("locker_number", function() {
            return {
                filters: {
                    locker_status: 'Available'
                }
            };
        });

		frm.set_query("member_name", function() {
			return {
				filters: [
					["membership_type", "in", ["Gold", "Platinum"]]
				]
			};
		});

		frm.fields_dict["booking_date"].df.onchange = function (){
			set_end_booking_date(frm)
		};

		frm.set_value('amount_paid', 2.00);
		
	}
});

function set_end_booking_date(frm) {
    var start_date = frm.doc.booking_date;
    if (start_date) {
        var end_date = frappe.datetime.add_days(start_date, 30);
        frm.set_value('booking_end_date', end_date);
    }
}
