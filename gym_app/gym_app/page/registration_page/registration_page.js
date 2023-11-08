frappe.pages['registration-page'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Add a new member',
		single_column: true
	});

	page.set_title('Gym Registration Page')
	page.set_indicator('Not Done', 'red')

	$(frappe.render_template("registration_page",{})).appendTo(page.body)
}