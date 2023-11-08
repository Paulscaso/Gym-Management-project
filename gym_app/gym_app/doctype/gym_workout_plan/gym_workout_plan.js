// Copyright (c) 2023, Paul Kimotho and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gym Workout Plan', {
	refresh: function(frm) {
		frm.set_df_property('route', 'read_only', 1);

	},
	plan_level: function(frm) {
        var planLevel = frm.doc.plan_level;
        var planType = frm.doc.plan_type;
        frm.set_value('plan_name', `${planLevel} ${planType} Plan`);
    },
    plan_type: function(frm) {
        var planLevel = frm.doc.plan_level;
        var planType = frm.doc.plan_type;
        frm.set_value('plan_name', `${planLevel} ${planType} Plan`);
    }

	
});
