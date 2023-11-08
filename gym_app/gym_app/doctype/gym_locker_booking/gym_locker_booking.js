// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Locker Booking', {
	refresh: function(frm) {
		frm.add_custom_button(__('Subscribe To a trainer plan'), function(){

            frappe.new_doc('Gym Trainer Subscription');		
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

		frm.set_value('amount_paid', 2.00);
		
	}
});
