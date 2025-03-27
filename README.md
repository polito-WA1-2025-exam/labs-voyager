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

# Tasks
### [ ] DAO: Add Filter Businesses by type, food category, cuisine type
- define a type for Business (restaurant or store)
- define set of food category and cuisine type (discrete variables)
### [ ] DAO: Add CRUD for foodItem
### [X] DAO: getFoodItemsOfBag()
### [ ] Change Business.phoneNumber from Integer to String

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

### API Endpoints 

**List all businesses**

URL: `/api/businesses`

HTTP Method: GET.

Description: Retrieve all the businesses.

Response: `200 OK` (Success) or `500 Internal Server Error` (generic error). In case of success, returns an array of businesses in JSON format; else, returns an error message.

Response body:
```
{
  "id": 5,
  "name": "Burger King",
  "address": "Via X",
  "phone_number": 333,
  "cuisine_type": "fast food",
  "food_category": "meat",
  "list_bags": []
}

``` 
<br>

**Show details of a particular business**

URL: `/api/businesses/:buId/`

HTTP Method: GET.

Description: Retrieve the business represented by <buId>.

Response: `200 OK` (Success), `404 Not Found` (business not found in the database) or `500 Internal Server Error` (generic error). In case of success, returns an array of businesses in JSON format; else, returns an error message.

Response body:
```
{
  "id": 5,
  "name": "Burger King",
  "address": "Via X",
  "phone_number": 333,
  "cuisine_type": "fast food",
  "food_category": "meat",
  "list_bags": []
}
```
<br>

**Insert a new business**

URL: `/api/businesses` 

HTTP Method: POST.

Description: Insert a new business object.

Request body:
```
insert request
```

Response: `insert possible responses`

Response body: *none*
<br>

**Update an existing business**

URL: `/api/businesses/:buId/ `

HTTP Method: PUT.

Description: Update the business represented by <buId>.

Request body:
```
insert request
```

Response: `insert possible responses`

Response body: *none*
<br>

**List all bags**

URL: `/api/bags`

HTTP Method: GET.

Description: Retrieve all the bags.

Response: `200 OK` (Success) or `500 Internal Server Error` (generic error). In case of success, returns an array of businesses in JSON format; else, returns an error message.

Response body:
```
{
  "bag_type": "Regular",
  "food_items": [],
  "price": 15.9,
  "size": "large",
  "business_from": 1,
  "timestamp_start": null,
  "timestamp_end": null,
  "is_available": true,
  "removedItemsCounter": 0
}
```
<br>

**List all bags of a specific business**

URL: `/api/businesses/:buId/bags`

HTTP Method: GET.

Description: Retrieve all the bags.

Response: `200 OK` (Success), `404 Not Found` (business not found in the database) or `500 Internal Server Error` (generic error). In case of success, returns an array of businesses in JSON format; else, returns an error message.

Response body:
```
{
  "bag_type": "Regular",
  "food_items": [],
  "price": 15.9,
  "size": "large",
  "business_from": 1,
  "timestamp_start": null,
  "timestamp_end": null,
  "is_available": true,
  "removedItemsCounter": 0
}
```
<br>

**Show details of a particular bag**

URL: `/api/bags/:bagId`

HTTP Method: GET.

Description: Retrieve the business represented by <buId>.

Response: `200 OK` (Success), `404 Not Found` (bag not found in the database) or `500 Internal Server Error` (generic error). In case of success, returns an array of businesses in JSON format; else, returns an error message.

Response body:
```
{
  "bag_type": "Regular",
  "food_items": [],
  "price": 15.9,
  "size": "large",
  "business_from": 1,
  "timestamp_start": null,
  "timestamp_end": null,
  "is_available": true,
  "removedItemsCounter": 0
}
```
<br>

**Insert a new bag**

URL: `/api/bags` 

HTTP Method: POST.

Description: Insert a new business object.

Request body:
```
insert request
```

Response: `insert possible responses`

Response body: *none*
<br>

**Update an existing bag**

URL: `/api/bags/:bagId`

HTTP Method: PUT.

Description: Update the business represented by <buId>.

Request body:
```
insert request
```

Response: `insert possible responses`

Response body: *none*
<br>

TODO:
- create a business
- create a bag
- delete a business
- delete a bag
- remove a food item from a bag


TODO User management:
- ? Do I have a relationship between the booker (user) and the bag?
- manage user page
- reserve a bag / manage shopping cart: add a bag
- free a bag / manage shopping cart: free a bag
- manage shopping cart: confirm cart

## Lab 4
### Template page 
#### Header
#### Navigation bar
- home shortcut through application icon
- login link
- shopping cart link
#### Sidebar (on the right - depends on the page)
- filters
#### Footer 
- home shortcut through application icon
- copyright 
### Home: index.html
- visualize a list of all businesses (starting from tabular form)
- businesses must be visualized in alphabetic order w.r.t. name
- for each business we must visualize name, address, phone_number, cuisine_type, food_category, (type of store)
- sidebar
  - filter by availability of bags
  - filter by cuisine type
  - filter by food category
  - filter by type of business

### Visualize bags per business: business.html
- visualize the list of all bags (starting from tabular form)
- for each bag we must visualize bag_type, food_items, size, price, timestamp_start, timestamp_end
- you cannot visualize the food items for the surprise bag
- you can select only one bag per business
- select quantity button + & -
- select size menu
- select pick-up time
- reserve button
- error-message pop-up
- sidebar
  - filter by availability of bags
  - order by pick-up time
  - order by price 

### Login page: login.html
- form to insert username and password 
- user authentication

### Shopping cart page: cart.html
- visualize the bags reserved by the user
- in case of a regular bag, user can remove up to 2 food items leaving the price unchanged
- in case of regular bags, user can visualize the food items
- user can release the bag
- user can confim the order