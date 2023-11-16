// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Member Subscription', {
	refresh: function(frm) {
		frm.set_value('locker_booking_cost', 70.00);

        frm.fields_dict['subscription_date'].$input.on('change', function() {
            setSubscriptionEndDate(frm);
        });

        frm.add_custom_button(__('Track your fitness'), function() {
            var member_name = frm.doc.member_name;
            frappe.set_route('Form', 'Member Registration', member_name);
        }, __("Utilities"));

        frm.add_custom_button(__('Rate your trainer'), function() {
            var trainer = frm.doc.trainer;

            // Check if a trainer is selected
            if (!trainer) {
                frappe.msgprint(__('Please select a trainer.'));
                return;
            }

            // Prompt to rate the trainer
            frappe.prompt([
                {
                    fieldname: 'ratings',
                    label: __('Rate Your Trainer'),
                    fieldtype: 'Rating',
                    reqd: 1,
                }
            ], function(values) {
                // Update the ratings field with the selected value
                frm.set_value('trainer_ratings', values.ratings);

                // Display success message
                frappe.msgprint(__('Trainer successfully rated.'));
            }, __('Rate Trainer'), 'Submit');
        }, __("Utilities"));

        frm.add_custom_button(__('Update Subscription Status'), function() {
            updateSubscriptionStatus(frm);
        });

        

	},
    onload: function(frm) {
        // Check and update subscription status on form load
        updateSubscriptionStatus(frm);
    }
});
function updateSubscriptionStatus(frm) {
    // Get the subscription date
    var currentDate = frm.doc.subscription_date;

    // Get the subscription end date and status fields
    var subscriptionEndDate = frm.doc.subscription_end_date;
    var status = frm.doc.status;

    // Check if the subscription end date is more than 30 days from the current date
    if (subscriptionEndDate && frappe.datetime.add_days(currentDate, 30) >= subscriptionEndDate) {
        // Update the status to "Expired"
        frappe.model.set_value(frm.doctype, frm.docname, 'status', 'Expired');

        // Prevent editing if the status is "Expired"
        if (frm.doc.status === 'Expired') {
            frm.set_read_only();
            frappe.msgprint('Your subscription has expired. Subscribe to a new subscription.');
        }
    }
}
function setSubscriptionEndDate(frm) {
    // Get the current subscription date
    var subscriptionDate = frm.doc.subscription_date;

    if (subscriptionDate) {
        // Set the Subscription End Date to 30 days after the Subscription Date
        var subscriptionEndDate = frappe.datetime.add_days(subscriptionDate, 30);
        frappe.model.set_value(frm.doctype, frm.docname, 'subscription_end_date', subscriptionEndDate);
    }
}
// // Function to toggle Class Booking field visibility based on the Membership Type
// function toggleClassBookingVisibility(frm) {
//     var membershipType = frm.doc.membership_type;

//     // Define the prefix to check for
//     var hideFieldPrefix = 'Basic';

//     // Check if the Membership Type starts with the hide prefix
//     var hideField = membershipType.toLowerCase().startsWith(hideFieldPrefix).toUpperCase;

//     // Toggle visibility of Class Booking field
//     frm.toggle_display('class_booking', !hideField);

//     // If hiding the field, clear its value
//     if (hideField) {
//         frm.set_value('class_booking', '');
//     }
// }






