# Copyright (c) 2023, Paul Kimotho and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class GymLockerBooking(Document):
    def validate(doc):
        # print(f"\n\n\n{doc.locker_number}")
        locker_number = doc.locker_number
        frappe.db.set_value('Locker Master', locker_number, 'locker_status', 'Taken')
    pass
	# def on_submit(doc, method):
	# 	locker_number = doc.locker_number

	# 	frappe.db.set_value('Locker Master', locker_number, 'locker_status', 'Taken')




