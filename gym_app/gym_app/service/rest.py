import frappe

@frappe.whitelist()
def on_update_events(doc, method):
    create_user_or_update(doc)

def create_user_or_update(doc):
    existing_user = frappe.get_all("User", filters={"email": doc.email}, fields=["name"])
    
    if existing_user:
        # User exists, update the existing user
        user_doc = frappe.get_doc("User", existing_user[0].name)
        user_doc.update({
            "first_name": doc.first_name,
            "last_name": doc.last_name,
            "full_name": doc.full_name,
            "enabled": 1,
        })
        user_doc.save()
    else:
        # User does not exist, create a new user
        new_user = frappe.get_doc({
            "doctype": "User",
            "email": doc.email,
            "first_name": doc.first_name,
            "last_name": doc.last_name,
            "enabled": 1,
        })
        new_user.append("roles", {
            "role": "Gym Member",
        })
        new_user.insert(ignore_permissions=True)




    # new_user = frappe.get_doc({
    #         "doctype": "User",
    #         "email": doc.email,
    #         "first_name": doc.first_name,
    #         "last_name": doc.last_name,
    #         "enabled": 1,  
    #     })
    # new_user.append("roles", {
    #         "role": "Gym Member",
    #     })
    # new_user.insert(ignore_permissions=True)

@frappe.whitelist()
def calculate_average_ratings(name):
    doc = frappe.get_doc('Gym Trainer', name)
    trainer_name = doc.full_name

    ratings_list = frappe.get_all(
        'Gym Trainer Subscription',
        filters = {'trainer': trainer_name},
        fields = ['ratings']
    )
    total_ratings = sum([rating.get('ratings', 0) for rating in ratings_list])
    average_ratings = total_ratings / len(ratings_list) if len(ratings_list) > 0 else 0
    

    print(f"\n\n\n {total_ratings} \n\n")

    print(f"\n\n\n {average_ratings} \n\n")
    doc.ratings = average_ratings
    doc.save()


    # def create_customer(doc):
#     frappe.get_doc({
#         "doctype": "Customer",
#         "customer_name": doc.full_name,
#         "customer_group": "Commercial",
#         "territory": "All Territories",
#         "customer_type": "Individual"
#     }).insert(ignore_permissions=True)

# @frappe.whitelist()
# def on_update(doc):
#     update_customer(doc)

# def update_customer(gym_member):
#     existing_customer = frappe.get_doc("Customer", {"email": gym_member.email})
#     if existing_customer:
#         existing_customer.customer_name = gym_member.full_name
#         existing_customer.save(ignore_permissions=True)
