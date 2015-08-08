Blockly.Blocks['braian_movement_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mover adelante")
        .appendField(new Blockly.FieldTextInput("1"), "stars")
        .appendField(new Blockly.FieldImage("static/img/stars.png", 15, 15, "*"))
        .appendField("estrellas");
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
        .appendField("mover atras")
        .appendField(new Blockly.FieldTextInput("1"), "stars")
        .appendField(new Blockly.FieldImage("static/img/stars.png", 15, 15, "*"))
        .appendField("estrellas");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
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
        .appendField("girar izquierda")
        .appendField(new Blockly.FieldImage("static/img/turn-left.png", 15, 15, "*"))
        .appendField(new Blockly.FieldTextInput("2"), "stars")
        .appendField("estrellas");
    this.setColour(330);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
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
        .appendField("girar derecha")
        .appendField(new Blockly.FieldImage("static/img/turn-right.png", 15, 15, "*"))
        .appendField(new Blockly.FieldTextInput("2"), "stars")
        .appendField("estrellas");
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
