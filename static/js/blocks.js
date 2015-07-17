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

Blockly.Python['braian_movement_forward'] = function(block) {
  var text_seconds = block.getFieldValue('seconds');
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var code = 'my_robot_set_movement_forward()\nmy_robot.move()';
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

Blockly.Python['braian_setup'] = function(block) {
  var code = '...';
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


Blockly.Python['braian_movement_back'] = function(block) {
  var text_seconds = block.getFieldValue('seconds');
  var code = '...';
  return code;
};

Blockly.Blocks['turn_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("girar izquierda")
        .appendField(new Blockly.FieldImage("static/img/turn-left.png", 15, 15, "*"))
        .appendField(new Blockly.FieldAngle("90"), "grades")
        .appendField("grados");
    this.setColour(330);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Python['turn_left'] = function(block) {
  var angle_grades = block.getFieldValue('grades');
  var code = '...';
  return code;
};

Blockly.Blocks['turn_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("girar derecha")
        .appendField(new Blockly.FieldImage("static/img/turn-right.png", 15, 15, "*"))
        .appendField(new Blockly.FieldAngle("90"), "grades")
        .appendField("grados");
    this.setColour(330);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['turn_right'] = function(block) {
  var angle_grades = block.getFieldValue('grades');
  var code = '...';
  return code;
};
