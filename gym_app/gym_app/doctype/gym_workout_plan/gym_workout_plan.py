# Copyright (c) 2023, Paul Kimotho and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.website.website_generator import WebsiteGenerator

class GymWorkoutPlan(Document):
	def after_insert(doc):
		doc.route = doc.name
		doc.save()
