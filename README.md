Hugo Excercise
==============

This project is split into two parts, an API server, and a React frontend.

The API server uses Nest JS, and the frontend uses Next JS.

Setup
-----

### API

```sh
cd api
cp .env.example .env.local
psql postgres --command='create database hugo_exercise_development'
yarn install
yarn start:dev
```

The API uses Postgres, which will need to be installed. It should auto-migrate
the first time the server is run.

### Frontend

```sh
cd frontend
cp .env.example .env.local
yarn install
yarn next:dev
```

Visit `http://localhost:3000` in your browser.

User Flows
----------

### Home Page

* As a user
* When I visit the home page
* And fill in optional first name, last name, and birthdate fields
* And click the "Get Started" button
* Then the fields I filled in are persisted
* And I see the "Basic Info" form with the fields I filled in, filled in

![image](https://github.com/rjungemann/hugo-exercise/assets/49277/e9d7b5dc-d52f-4cef-b831-4c9fe13034ef)

### Basic Info Form

* As a user
* When I visit the "Basic Info" page
* And I fill in the first name, last name, and birthdate fields
* And I click the "Continue" button
* Then the fields I filled in are persisted
* And I see the "Address" form

* As a user
* When I visit the "Basic Info page"
* And I do not fill in one of the first name, last name, and birthdate fields
* Then I should see a message telling me to fill in the field

![image](https://github.com/rjungemann/hugo-exercise/assets/49277/f2d0e0fc-0e0d-4b8e-93e6-a1b0d2ca2e01)

### Address Form

* As a user
* When I visit the "Address" form
* And I fill in the street, city, state, and zipcode fields
* And I click the "Continue" button
* Then the fields I filled in are persisted
* And I see the "Vehicles" form

* As a user
* When I visit the "Basic Info page"
* And I do not fill in one of the street, city, state, and zipcod fields
* Then I should see a message telling me to fill in the field

![image](https://github.com/rjungemann/hugo-exercise/assets/49277/132c0dda-a614-4fb2-a5ab-f30eadc2f388)

### Vehicles Form

* As a user
* When I visit the "Vehicles" form
* And I fill in the VIN, year, make, and model fields
* And I click "Add Vehicle"
* Then it should add the vehicle to the list

* As a user
* When I visit the "Vehicles" form
* And I do not fill in one of the VIN, year, make, and model fields
* Then I should see a message telling me to fill in the field

* As a user
* If I have filled in 1-3 vehicles
* When I click "Continue", I should see the "Review" form

* As a user
* When I visit the "Vehicles" form
* And I have not filled in 1-3 vehicles
* Then I should see a message telling me to add a vehicle

* As a user
* When I visit the "Vehicles" form
* And I choose a vehicle, and click the "Delete" button
* The vehicle should be removed from the list
* And when I submit the form
* Then the vehicle should not be persisted

![image](https://github.com/rjungemann/hugo-exercise/assets/49277/d010c930-36c0-4ef6-b678-17b2d81dd974)

### Review Form

* As a user
* When I visit the "Review" form
* It should show me the fields I've filled out so far
* And if I have filled in all the necessary fields
* And I click "Submit"
* It should show me the "Quote" page

* As a user
* When I visit the "Review" form
* And I have not filled in the necessary fields
* When I submit the form
* Then I should see a message telling me to make the change

![image](https://github.com/rjungemann/hugo-exercise/assets/49277/626e8a1f-8f17-475b-aced-a423915c137c)

### Breadcrumbs

* As a user
* When I visit a form
* I should see "Breadcrumbs" of the previous steps
* When I click on a breadcrumb
* It should take me to the previous step, with my data already filled in

### Quote Page

* As a user
* When I visit the "Quote" page
* And I have filled in all the pertinent data
* I should see an insurance quote

![image](https://github.com/rjungemann/hugo-exercise/assets/49277/95c5d6d7-9daf-4ab2-ad8d-007ea1c2cd76)
