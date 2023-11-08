import frappe
from frappe.model.mapper import get_mapped_doc
from frappe.utils import flt

@frappe.whitelist()
def on_update_events(doc,method):
    create_customer(doc)
    create_user(doc)

def create_customer(doc):
    frappe.get_doc({
        "doctype": "Customer",
        "customer_name": doc.full_name,
        "customer_group": "Commercial",
        "territory": "All Territories",
        "customer_type": "Individual"
    }).insert(ignore_permissions=True)


def create_user(doc):

    new_user = frappe.get_doc({
            "doctype": "User",
            "email": doc.email,
            "first_name": doc.first_name,
            "enabled": 1,  
        })
    new_user.append("roles", {
            "role": "Gym Member",
        })
    new_user.insert(ignore_permissions=True)
    

    
    # user = frappe.get_all("User", filters={"email": doc.email})
    
    # if not user:
    #     new_user = frappe.get_doc({
    #         "doctype": "User",
    #         "email": doc.email,
    #         "first_name": doc.first_name,
    #         "last_name": doc.last_name,
    #         "send_welcome_email": 0,
    #         "enabled": 1,  
    #     })
    # #     print(f"\n\n\n {new_user} \n\n")
    #     new_user.append("roles", {
    #         "role": "Gym Member",
    #     })

    #     new_user.insert()
