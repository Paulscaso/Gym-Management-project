// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Members', {
	refresh: function(frm) {
        frm.fields_dict['first_name'].df.onchange = function() {
            set_full_name(frm);
        };

        frm.fields_dict['last_name'].df.onchange = function() {
            set_full_name(frm);
        };

        frm.fields_dict['subscription_start_date'].df.onchange = function() {
            set_end_subscription_date(frm);
        };
    },
	membership_type: function(frm) {
        if (frm.doc.membership_type === 'Silver') {
            frm.set_df_property('locker_number', 'read_only', 1);
        } else {
            frm.set_df_property('locker_number', 'read_only', 0);
        }
    },


});

function set_full_name(frm) {
    var first_name = frm.doc.first_name || '';
    var last_name = frm.doc.last_name || '';
    var full_name = first_name + ' ' + last_name;
    frm.set_value('full_name', full_name);
}

function set_end_subscription_date(frm) {
    var start_date = frm.doc.subscription_start_date;
    if (start_date) {
        var end_date = frappe.datetime.add_days(start_date, 30);
        frm.set_value('subscription_end_date', end_date);
    }
}
