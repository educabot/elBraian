Blockly.Blocks['braian_movement_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mover adelante")
        .appendField(new Blockly.FieldTextInput("1"), "seconds")
        .appendField("segundos");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.JavaScript['braian_movement_forward'] = function(block) {
  var text_seconds = block.getFieldValue('seconds');
  var code = 'message.payload.steps.push({id: index, heading: "FORWARD", hold: '+ (parseInt(text_seconds) * 1000).toString() + '}); index = index + 1;';
  return code;
};

Blockly.Blocks['braian_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Inicio");
    this.setNextStatement(true);
    this.setColour(20);
    this.setTooltip('');
  }
};

Blockly.JavaScript['braian_setup'] = function(block) {
  var code = 'message.push()';
  return code;
};

Blockly.Blocks['braian_movement_back'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mover atras")
        .appendField(new Blockly.FieldTextInput("1"), "seconds")
        .appendField("segundos");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
    this.setTooltip('');
  }
};


Blockly.JavaScript['braian_movement_back'] = function(block) {
  var text_seconds = block.getFieldValue('seconds');
  var code = 'message.payload.steps.push({id: index, heading: "BACKWARD", hold: '+ (parseInt(text_seconds) * 1000).toString() + '}); index = index + 1;';
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
        .appendField("grados");
    this.setColour(330);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.JavaScript['turn_right'] = function(block) {
  var text_stars = block.getFieldValue('stars');
  var code = 'message.payload.steps.push({id: index, heading: "ROTATE-LEFT", hold: '+ (parseInt(text_stars) * 100).toString() + '}); index = index + 1;';
  return code;
};
