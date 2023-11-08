# # Copyright (c) 2023, Paul Kimotho and contributors
# # For license information, please see license.txt

import frappe
from datetime import datetime
from frappe.utils import add_to_date
from frappe.model.document import Document

class GymClassBooking(Document):

    def generate_weekly_summary():
        today = datetime.now().strftime('%Y-%m-%d')
        start_date = add_to_date(today, days=-10, as_string=True)
        end_date = today

        # Get all Gym Class Booking records within the specified date range
        bookings = frappe.get_all(
            "Gym Class Booking",
            filters={"booked_at": [">=", start_date, "<=", end_date]},
            fields=["member_name","member_email", "class_name", "booked_at"]
        )

        member_bookings = {}
        for booking in bookings:
            member_email = booking.member_email
            print(f"\n\n  {member_email} \n\n")
            class_name = booking.class_name
            booked_at = booking.booked_at

            if member_email not in member_bookings:
                member_bookings[member_email] = []

            member_bookings[member_email].append(f"{class_name} on {booked_at}")

        for member_email, bookings in member_bookings.items():
            email_content = f"Hello {member_email},\n\nH ere is your weekly summary of classes attended:\n\n"
            email_content += "\n".join(bookings)
            email_content += "\n\nThank you for choosing our gym!"

            frappe.sendmail(
                recipients=[member_email],  # Assuming 'member_email' contains the member_email's email
                cc='',
                subject="Gym Weekly Summary",
                content=email_content,
                reference_doctype='',
                reference_name='',
                now=True
            )

    # Call the generate_weekly_summary function to generate and send the emails
    generate_weekly_summary()