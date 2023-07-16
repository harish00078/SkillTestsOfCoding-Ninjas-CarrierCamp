=> Features of the Application:

1 - Create a question (you can add as many questions as you want)
2 - Add options to a question
3 - Add a vote to an option of question
4 - Delete a question → (optional: A question can’t be deleted if one of it’s options has votes)
5 - Delete an option → (optional: An option can’t be deleted if it has even one vote given to it)
6 - View a question with it’s options and all the votes given to it

=> API-URLs:

-> (To create a question) = http://localhost:8080/api/v2/question/create
-> (To add options to a specific question) = http://localhost:8080/api/v2/question/options/:ID/create
-> (To delete a question) = http://localhost:8080/api/v2/question/delete/:ID
-> (To delete an option) = http://localhost:8080/api/v2/options/delete/:ID
-> (To increment the count of votes) = http://localhost:8080/api/v1/options/:ID/add_vote
-> (To view a question and it’s options) = http://localhost:8080/api/v2/question/view/:ID
