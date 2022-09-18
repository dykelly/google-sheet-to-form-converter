# google-sheet-to-form-converter
 A simple program for creating a Google Form by extracting questions from a Google Sheet. For the moment, only multiple choice and grid types are available.

This was written as an aid for transferring a long list of questions for a psychonometric test into Google Form format.

# Instructions

 The structure of the google sheet should be as follows:

![Google sheet template](/instructions1.png)

i.e. the first column should be the questions, then a number of answer columns (you specify this number in the code), then a column which has either `true` or `false` in it. The last column with the description can also be included, in that case make sure to specify this in the code.

To transfer the data from a google sheet to a google form: 

1) Format your google sheet as above. 
2) Create a blank google form 
3) Download this code repository as an archive from github. Open the `code.gs` file with a text editor (Notepad on Windows, or TextEdit on Mac).
4) Go to https://script.google.com/ and create a new project. This should then open a newly created 'Code.gs' file, as you can see in the menu on the left. 
5) Erase the contents of this file, and then copy the contents of the `code.gs` file from this code repository that you have open in Notepad or TextEdit.
6) Scroll down to this bit of code, and fill out the variables there. Most importantly, put in the links to your google sheet and to your google form (they should be surrounded by quote marks), and fill in the number of answer columns you have in your sheet.
    ```
    function main() {
    
    // START OF USER INPUT BLOCK
    ```
7) Press `Save Project`. This is important to update the code.
8) Open the toggle menu that has the word `setup` (to the right from Run), and select `main` like in the picture:
![Code section toggle menu ](/instructions1.png)
9) Press `Run`. 
    - You will need to review permissions to allow this project to access the google sheet data and modify your google form. 
    - Hopefully it runs! Check the logs at the bottom of the page for any hints if something goes wrong. 

 
