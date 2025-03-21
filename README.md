# Group "GROUP NAME"

## Members
- s347908 Borello Valentina
- s346299 Morea Mattia

## Git guide
### Create new branch from an existing one
```pwsh
git checkout -b "new-branch" "existing-branch"
git push -u origin "new-branch"
```
### Create new separate branch
```pwsh
git branch "new-branch"
git push -u origin "new-branch"
```

### Push one file from one branch to another
```pwsh
git checkout target-branch
git checkout source-branch -- path-to-file
git add .
```
#### Example: Pushing README from lab-1-vale to lab-1
```pwsh
git checkout lab-1
git checkout lab-1-vale -- ./README.md
git add .
```

# Exercise ```Surplus Food```

# Lab Journal
## Lab **1**

## Lab 2
### bag(<u>id</u>, bag_type, size, price, business_from, timestamp_start, timestamp_end, removedItemsCounter*, isAvailable)
business_from: foreign key of table business
### fooditem(<u>id</u>, name, quantity, bag)
food-item one-to-many relation with bag;     
bag: foreign key from bag table
### user(<u>id</u>, username, password, status)  
### business(<u>id</u>, name, address, phone_number, cuisine_type*, food_category*)  

## Lab 3
```txt
[HTTP Method] [URL, optionally with parameter(s)] 
    [One-line about what this API is doing] 
    [Sample request, with body (if any)] 
    [Sample response, with body (if any)] 
    [Error response(s), if any]
```
### Endpoints 
```
GET /                                           # entry point
GET /home                                       # home page
GET /home/businesses                            # show all businesses
GET /home/businesses/:buId/business             # show a particular business
PUT /home/businesses/:buId/business             # modify a particular business
GET /home/businesses/:buId/bags                 # show all the available bags of a particular business
GET /home/businesses/:buId/bags/:bagId/bag      # show details of a particular bag of a particular business
PUT /home/businesses/:buId/bags/:bagId/bag      # modify a particular bag of a particular business
GET /home/bags                                  # show all the available bags
GET /home/bags/:bagId/bag                       # show details of a particular bag
PUT /home/bags/:bagId/bag                       # show details of a particular bag

TODO:
- create a business
- create a bag
- delete a business
- delete a bag
- remove a food item from a bag
TODO User management:
? Do I have a relationship between the booker (user) and the bag?
- manage user page
- reserve a bag / manage shopping cart: add a bag
- free a bag / manage shopping cart: free a bag
- manage shopping cart: confirm cart
```