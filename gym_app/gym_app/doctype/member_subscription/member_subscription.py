# Copyright (c) 2023, Paul Kimotho and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class MemberSubscription(Document):
	def before_save(self):
		membership_cost = self.membership_cost or 0.00
		trainer_cost = self.trainer_cost or 0.00
		locker_booking_cost = 70.00
		class_booking_cost = self.class_booking_cost or 0.00

		total_subscription_cost = membership_cost + trainer_cost + locker_booking_cost + class_booking_cost
		self.total_subscription_costs = total_subscription_cost
	
	def validate(doc):
        # print(f"\n\n\n{doc.locker_number}")
			locker_number = doc.locker_booking
			frappe.db.set_value('Locker Master', locker_number, 'locker_status', 'Taken')



# def calculate_total_subscription_cost(doc, handler=""):
# 	membership_cost = doc.membership_cost or 0.00
# 	trainer_cost = doc.trainer_cost or 0.00
# 	locker_booking_cost = doc.locker_booking_cost or 0.00
# 	class_booking_cost = doc.class_booking_cost or 0.00

# 	total_subscription_cost = membership_cost + trainer_cost + locker_booking_cost + class_booking_cost
# 	doc.total_subscription_cost = total_subscription_cost

# frappe.model.before_save('Member Subscription', calculate_total_subscription_cost)
