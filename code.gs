function setup(spreadsheet_link, form_link=null, sheet_num=1) {
  // Opens the spreadsheet at the link. Opens the form at the link or creates one if one isn't given.
  // Sheet number sheet_num is opened (indexed from 1).
  // Returns the spreadsheet object and the form object.
  var spreadsheet = SpreadsheetApp.openByUrl(spreadsheet_link).getSheets()[sheet_num - 1];
  Logger.log("Opened sheet: " + spreadsheet.getName());
  if (form_link == null) {
    var form = FormApp.create('New Form');
  }
  else {
    var form = FormApp.openByUrl(form_link); //.create('New Form');
  };
  Logger.log('Form published URL: ' + form.getPublishedUrl());
  Logger.log('Form editor URL: ' + form.getEditUrl());
  Logger.log("Finished setup")
  return [spreadsheet, form]
}


function createMultipleChoiceQu(form, title, ans, required = false, desctiption = null) {
  item = form.addMultipleChoiceItem();
  item.setTitle(title);
  item.setRequired(required);

  choices = [];
  for (i = 0; i < ans.length; i = i + 1) {
    c = item.createChoice(ans[i]);
    choices[i] = c;
  }
  item.setChoices(choices);

  return item
}

function createGridQu(form, title, ans, rows, required = false, desctiption = null) {
  item = form.addGridItem();
  item.setTitle(title);
  item.setRequired(required);
  item.setColumns(ans);
  item.setRows(rows);

  return item
}


function transferQuestions(spreadsheet, form, header, N_answers, description = false, ans_type='mc', grid_rows=null) {
  // Transfers questions to a form from a google sheet.
  // Questions must be column A, followed by answers in N_answers columns; followed by a 'required' column; 
  // followed by optional 'description' column.
  // header = boolean, if true then top row is ignored; 
  // description = boolean, optional. If true then last column is assumed to be description
  // ans_type = 'mc' for multiple choice, 'mcg' for multiple choice grid
  // grid_rows = array of string, names of rows (only supported for each question to have the same rows for the moment)


  var data = spreadsheet.getDataRange().getValues();
//   var n_rows = 5; //for debugging large sheets, set this to a small number to avoid running through the whole sheet
//   var data = spreadsheet.getRange(1,1,n_rows, N_answers + 2 + description).getValues();
  var header_discounted = false;

  data.forEach(function (row) {

    // skip one row if header==true
    if (header == true && header_discounted == false) { header_discounted = true; return };

    // extract the question data for every row
    var qu_title = row[0];
    var ar_ans = []
    for (i = 0; i <= N_answers - 1; i = i + 1) {
      ar_ans[i] = row[i + 1];
    };
    var required = row[N_answers + 1].toString().toLowerCase() == 'true' ? true : false
    var desc = description ? row[N_answers + 2] : null;
    Logger.log('Transferring '+  (!required ? 'not ':'') + 'required question: ' + qu_title);
    Logger.log('Answers: ' + ar_ans);
    if (desc != null) {Logger.log("Description " + desc)};

    // now call the function to create a question of chosen type
    if (ans_type == 'mc') {
      item = createMultipleChoiceQu(form, qu_title, ar_ans, required, desc);
    }
    else if (ans_type == 'mcg') {
      item = createGridQu(form, qu_title, ar_ans, grid_rows, required, desc);

    }
  });
}






function main() {
  
  // START OF USER INPUT BLOCK
  var ss_link = "https://docs.google.com/spreadsheets/d/...YOUR_FILE_LINK/";
  var form_link = "https://docs.google.com/forms/d/...YOUR_FORM_LINK/";
  N_answers = 2 ;  // change this to how many answer columns you have

  answer_type = "mc"; // change this line to     answer_type = "mcg";    for grid 
  var grid_rows = ["Row1", "Row2", "Row3"]; // if using grid questions, type in your own row names. Otherwise ignore this line.
  description = false; // if you have descriptions, then change the     false;     to      true;     
  // END OF USER INPUT BLOCK


  var ar = setup(ss_link, form_link);
  var ss = ar[0];
  var form = ar[1];
  transferQuestions(ss, form, header=true, N_answers=N_answers, description=false, ans_type=answer_type, grid_rows=grid_rows);

}
