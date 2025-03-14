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
### bag(<u>id</u>, bag_type, size, price, business_from, timestamp_start, timestamp_end, removedItemsCounter*)
business_from: foreign key of table business
### fooditem(<u>id</u>, name, quantity, bag)
food-item one-to-many relation with bag;     
bag: foreign key from bag table
### user(<u>id</u>, username, password, status)  
### business(<u>id</u>, name, address, phone_number, cuisine_type*, food_category*)  
