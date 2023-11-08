// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Member', {
	refresh: function(frm) {
        // Add a query filter to fetch only the "Silver" plan
        // frm.set_query("membership_type", function() {
        //     return {
        //         filters: {
        //             membership_type: "Silver" 
        //         }
        //     };
        // });
    },
	membership_type: function(frm) {
        if (frm.doc.membership_type === 'Silver') {
            frm.set_df_property('locker_number', 'read_only', 1);
        } else {
            frm.set_df_property('locker_number', 'read_only', 0);
        }
    }
});
