// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Member Registration', {
	refresh: function(frm) {
		frm.add_custom_button(__('View members fitness journey'), function() {
            frappe.set_route("List", "Report", {"report_name": "Fitness Journey"});
        });
	}
});
