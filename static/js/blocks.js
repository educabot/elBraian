Blockly.Blocks['braian_movement_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("static/img/adelante.png", 80, 75, "*"))
        .appendField(new Blockly.FieldTextInput("1"), "stars")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.JavaScript['braian_movement_forward'] = function(block) {
  var text_stars = block.getFieldValue('stars');
  var code = 'message.payload.steps.push({id: index, heading: "FORWARD", hold: '+ (parseInt(text_stars) * 100).toString() + '}); index = index + 1;';
  return code;
};


Blockly.Blocks['braian_movement_back'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("static/img/atras.png", 80, 75, "*"))
        .appendField(new Blockly.FieldTextInput("1"), "stars")
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip('');
  }
};


Blockly.JavaScript['braian_movement_back'] = function(block) {
  var text_stars = block.getFieldValue('stars');
  var code = 'message.payload.steps.push({id: index, heading: "BACKWARD", hold: '+ (parseInt(text_stars) * 100).toString() + '}); index = index + 1;';
  return code;
};

Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("static/img/izquierda.png", 80, 75, "*"))
        .appendField(new Blockly.FieldTextInput("2"), "stars")
    this.setColour(330);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['turn_left'] = function(block) {
  var text_stars = block.getFieldValue('stars');
  var code = 'message.payload.steps.push({id: index, heading: "ROTATE-LEFT", hold: '+ (parseInt(text_stars) * 100).toString() + '}); index = index + 1;';
  return code;
};

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("static/img/derecha.png", 80, 75, "*"))
        .appendField(new Blockly.FieldTextInput("2"), "stars")
    this.setColour(330);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['turn_right'] = function(block) {
  var text_stars = block.getFieldValue('stars');
  var code = 'message.payload.steps.push({id: index, heading: "ROTATE-RIGHT", hold: '+ (parseInt(text_stars) * 100).toString() + '}); index = index + 1;';
  return code;
};

//TODO need to know how add this block fixed into the workspace
Blockly.Blocks['start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("static/img/flag.svg", 15, 15, "*"))
        .appendField("Inicio");
    this.setColour(20);
    this.setTooltip('');
    this.setDeletable(false);
    this.setNextStatement(true);

  }
};

Blockly.JavaScript['start'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code = '';
  return code;
};
