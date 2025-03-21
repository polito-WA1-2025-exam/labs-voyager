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
### Starting from Businesses
#### show all businesses
```txt
GET /home/businesses
    retrieves a list of all the businesses in alphabetic order

```
#### delete a business and redirects to /home/businesses (eligibility granted to the app administrator)
```txt

```
#### show all the available bags for a particular business
```txt
GET /home/businesses/business-:bID/bags
    
```
#### show the detail of a particuar bag of a particular business
```txt
GET /home/businesses/business-:bID/bags/bag-:bagID
    distinguish between Surprise and Regular bags     
```
#### reserve the bag (eligibility granted to the user)
```txt
PUT /home/businesses/business-:bID/bags/bag-:bagID
    reserve a bag
    Exception: reserve only bags with future pick-up time 
```
#### add a new bag (eligibility granted to the business)
```txt
POST /home/businesses/business-:bID/bags/new-bag
    
```
#### delete a bag and redirect to /home/businesses/business-:bID/bags (eligibility granted to the business)
```txt

```
### Starting from Bags
#### show all bags
```txt
GET /home/bags/
    
```
#### show the detail of a particular bag
```txt
GET /home/bags/bag-:bagID
    distinguish between Surprise and Regular bags     
```
#### redirect to the business owning the bag
```txt

```
#### reserve a bag (eligibility granted to the user)
```txt
PUT /home/bags/bag-:bagID
    reserve a bag
    Exception: reserve only bags with future pick-up time 
```
#### remove a food item from the bag
In case the bag is restored (available again) the food items must be added 
```txt
PUT /home/bags/bag-:bagID
    Exception: only in case of Regular bags and max 2 attemps 
```
#### free a bag
```txt
PUT /home/bags/bag-:bagID
```
### User and shopping cart
#### personal area
#### personal shopping cart
? Do I have a relationship between the booker and the bag?
#### personal shopping cart --> add a bag
#### personal shopping cart --> confirm
#### personal shopping cart --> free a bag