/*! Roboblocks2 - v0.2.3 - 2016-02-02
 * https://github.com/bq/Roboblocks2
 * Copyright (c) 2016 bq; Licensed  */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
    } else {
        factory(_, window.Blockly, window.Blocks);
    }
}(function(_, Blockly, Blocks) {
    var load = function(options) {
        // Source: src/lang.js
        /* global Roboblocks2, options */
        Roboblocks2.locales = {
            defaultLanguage: {},
            languages: []
        };
        Roboblocks2.locales.getLang = function() {
            return this.defaultLanguage.lngCode;
        };
        Roboblocks2.locales.getKey = function(key) {
            return this.defaultLanguage[key];
        };
        Roboblocks2.locales.setDefaultLang = function(langCode) {
            for (var i in this.languages) {
                if (this.languages[i].langCode === langCode) {
                    this.defaultLanguage = this.languages[i].values;
                    this.defaultLanguage.lngCode = langCode;
                }
            }
        };
        Roboblocks2.locales.add = function(langCode, values) {
            if (!langCode) {
                return this.defaultLanguage;
            }
            if (langCode && !values) {
                if (!this.languages[langCode]) {
                    throw new Error('Unknown language : ' + langCode);
                }
                //this.defaultLanguage = langCode;
            }
            if (values || !this.languages[langCode]) {
                this.languages.push({
                    langCode: langCode,
                    values: values
                });
            }
            return this;
        };
        Roboblocks2.locales.initialize = function() {
            var lang = options.lang || window.Roboblocks2Language || 'es-ES';
            this.setDefaultLang(lang);
            return this;
        };

        
        // Source: lang/es-ES.js
        (function() {
            var language = {
                //random :
                BLOCKLY_MSG_DUPLICATE_BLOCK: 'Duplicar',
                BLOCKLY_MSG_REMOVE_COMMENT: 'Remover Comentario',
                BLOCKLY_MSG_ADD_COMMENT: 'Agregar Comentario',
                BLOCKLY_MSG_EXTERNAL_INPUTS: 'Entradas externas',
                BLOCKLY_MSG_INLINE_INPUTS: 'Entradas en línea',
                BLOCKLY_MSG_DELETE_BLOCK: 'Eliminar bloque',
                BLOCKLY_MSG_DELETE_X_BLOCKS: 'Eliminar %1 Bloque',
                BLOCKLY_MSG_COLLAPSE_BLOCK: 'Collapse bloques',
                BLOCKLY_MSG_EXPAND_BLOCK: 'Expandir bloques',
                BLOCKLY_MSG_DISABLE_BLOCK: 'Deshablilitar bloques',
                BLOCKLY_MSG_ENABLE_BLOCK: 'Habilitar bloques',
                BLOCKLY_MSG_HELP: 'Ayuda',
                BLOCKLY_MSG_COLLAPSE_ALL: 'Collapse bloques',
                BLOCKLY_MSG_EXPAND_ALL: 'Expandir bloques',
                LANG_VARIABLES_SET_ITEM: 'elemento',
                LANG_RESERVED_WORDS: 'Palabra reservada: este nombre no está permitido.',
                
                    
                LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE: 'Inicio',
                LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE: 'Repetir',
                
               
                
                //araña :
                LANG_CATEGORY_ARAÑA: 'Wincy Araña',
               
                LANG_ADELANTE: '',
                LANG_REPOSO: '',
                LANG_ATRAS: '',
                LANG_DERECHA: '',
                LANG_IZQUIERDA: '',
                LANG_ANGELITO: '',
                LANG_SALUDAR: '',

                 //cocobot  :
                LANG_CATEGORY_COCO: 'Cocobot',
               
                LANG_ADELANTE: '',
                LANG_REPOSO: '',
                LANG_ATRAS: '',
                LANG_DERECHA: '',
                LANG_IZQUIERDA: '',
                LANG_ANGELITO: '',
                LANG_SALUDAR: '',
               
           
            };
            // Node
            if (typeof module !== 'undefined' && module.exports) {
                module.exports = language;
            }
            // Browser
            // if (typeof window !== 'undefined' && this.Roboblocks2 && this.Roboblocks2.locales.add) {
            //     this.Roboblocks2.locales.add('es', language);
            if (typeof window !== 'undefined' && Roboblocks2 && Roboblocks2.locales.add) {
                Roboblocks2.locales.add('es-ES', language);
            }
        }());

 

        // Source: src/constants.js
        /* global Roboblocks2, Blockly*/
        Roboblocks2.locales.initialize();
        Roboblocks2.variables = {};
        Roboblocks2.isVariable = function(varValue) {
            for (var i in Blockly.Variables.allVariables()) {
                if (Blockly.Variables.allVariables()[i] === varValue) {
                    return true;
                }
            }
            if (Roboblocks2.variables[varValue] !== undefined) {
                return true;
            }
            if (varValue.search('digitalRead\\(') >= 0 || varValue.search('analogRead\\(') >= 0) {
                return true;
            }
            return false;
        };

        Roboblocks2.findPinMode = function(dropdown_pin) {
            var code = '';
            dropdown_pin = dropdown_pin.split(';\n');
            for (var j in dropdown_pin) {
                if (dropdown_pin[j].search('pinMode') >= 0) {
                    code += dropdown_pin[j] + ';\n';
                } else {
                    dropdown_pin = dropdown_pin[j];
                }
            }
            return {
                'code': code,
                'pin': dropdown_pin
            };
        };

        

        // RGB block colors
        Roboblocks2.LANG_COLOUR_BQ = '#F44336';
        Roboblocks2.LANG_COLOUR_ZUM = '#9C27B0';
        Roboblocks2.LANG_COLOUR_SERVO = '#2196F3';
        Roboblocks2.LANG_COLOUR_LCD = '#3F51B5';
        Roboblocks2.LANG_COLOUR_CONTROL = '#FF1744';
        Roboblocks2.LANG_COLOUR_LOGIC = '#009688';
        Roboblocks2.LANG_COLOUR_MATH = '#00BCD4';
        Roboblocks2.LANG_COLOUR_TEXT = '#4CAF50';
        Roboblocks2.LANG_COLOUR_COMMUNICATION = '#00BFA5';
        Roboblocks2.LANG_COLOUR_ADVANCED = '#FF9800';
        Roboblocks2.LANG_COLOUR_VARIABLES = '#FF5722';
        Roboblocks2.LANG_COLOUR_PROCEDURES = '#607D8B';
        Roboblocks2.setColors = function(colorArray) {
            Roboblocks2.LANG_COLOUR_BQ = colorArray[0];
            Roboblocks2.LANG_COLOUR_ZUM = colorArray[1];
            Roboblocks2.LANG_COLOUR_SERVO = colorArray[2];
            Roboblocks2.LANG_COLOUR_LCD = colorArray[3];
            Roboblocks2.LANG_COLOUR_CONTROL = colorArray[4];
            Roboblocks2.LANG_COLOUR_LOGIC = colorArray[5];
            Roboblocks2.LANG_COLOUR_MATH = colorArray[6];
            Roboblocks2.LANG_COLOUR_TEXT = colorArray[7];
            Roboblocks2.LANG_COLOUR_COMMUNICATION = colorArray[8];
            Roboblocks2.LANG_COLOUR_ADVANCED = colorArray[9];
            Roboblocks2.LANG_COLOUR_VARIABLES = colorArray[10];
            Roboblocks2.LANG_COLOUR_PROCEDURES = colorArray[11];
        };
        // Source: src/profiles.js
        /*
         * Arduino Board profiles
         */
        var profiles = {
            arduino: {
                description: 'Standard-compatible board',
                digital: [
                    ['0', '0'],
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                    ['7', '7'],
                    ['8', '8'],
                    ['9', '9'],
                    ['10', '10'],
                    ['11', '11'],
                    ['12', '12'],
                    ['13', '13']
                ],
                bluetooth: [
                    ['1', '1'],
                    ['2', '2'],
                    ['3', '3'],
                    ['4', '4'],
                    ['5', '5'],
                    ['6', '6'],
                    ['7', '7'],
                    ['8', '8'],
                    ['9', '9'],
                    ['10', '10'],
                    ['11', '11']
                ],
                pwm: [
                    ['#3', '3'],
                    ['#5', '5'],
                    ['#6', '6'],
                    ['#9', '9'],
                    ['#10', '10'],
                    ['#11', '11']
                ],
                analog: [
                    ['A0', 'A0'],
                    ['A1', 'A1'],
                    ['A2', 'A2'],
                    ['A3', 'A3'],
                    ['A4', 'A4'],
                    ['A5', 'A5']
                ],
                serial: 9600,
            },
            'arduino_mega': {
                description: 'Mega-compatible board',
            },
        };


        // Set default profile to arduino standard-compatible board
        profiles['default'] = profiles.arduino;

        // Source: src/blockly.extensions.js
        /* global Blockly */
        /* jshint sub:true */

        /**
         * Generates toolbox XML with all blocks defined in Blockly.Blocks
         * @return {String} Blockly toolbox XML
         */
        Blockly.createToolbox = function() {

            var blocks = {};

            for (var block in this.Blocks) {
                // important check that this is objects own property 
                // not from prototype prop inherited
                if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
                    var category = this.Blocks[block].category;
                    blocks[category] = blocks[category] || [];
                    blocks[category].push(block);
                }
            }

            var toolbox = '<xml id="toolbox" style="display: none">';

            var categoryItem = function(type) {
                toolbox += '<block type="' + type + '"></block>';
            };

            for (block in blocks) {

                if (blocks.hasOwnProperty(block)) {
                    toolbox += '<category id="' + block + '" name="' + block + '">';
                    blocks[block].forEach(categoryItem);
                    toolbox += '</category>';
                }

            }
            toolbox += '</xml>';

            return toolbox;
        };

        // Source: tmp/jst.js
        // Source: tmp/jst.js
        this["JST"] = this["JST"] || {};

        this["JST"]["advanced_conversion"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (value_num)) == null ? '' : __t) +
                    ',' +
                    ((__t = (convertion)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["advanced_map"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'map(' +
                    ((__t = (num)) == null ? '' : __t) +
                    ',' +
                    ((__t = (from_min)) == null ? '' : __t) +
                    ',' +
                    ((__t = (from_max)) == null ? '' : __t) +
                    ',' +
                    ((__t = (to_min)) == null ? '' : __t) +
                    ',' +
                    ((__t = (to_max)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["base_delay"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'delay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["base_map"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'map(' +
                    ((__t = (value_num)) == null ? '' : __t) +
                    ',0,1023,0,' +
                    ((__t = (value_dmax)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["base_millis"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'millis()\n';

            }
            return __p
        };

        this["JST"]["bq_bat"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Distance(' +
                    ((__t = (trigger_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (echo_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bq_bat_definitions_distance"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'long Distance(int trigger_pin, int echo_pin)\n{\n  long microseconds = TP_init(trigger_pin, echo_pin);\n  long distance;\n  distance = microseconds/29/2;\n  if (distance == 0){\n    distance = 999;\n  }\n  return distance;\n}\n';

            }
            return __p
        };

        this["JST"]["bq_bat_definitions_tp_init"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '//sensor de ultrasonido\nlong TP_init(int trigger_pin, int echo_pin)\n{\n  digitalWrite(trigger_pin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigger_pin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigger_pin, LOW);\n  long microseconds = pulseIn(echo_pin ,HIGH);\n  return microseconds;\n}\n';

            }
            return __p
        };

        this["JST"]["bq_bat_setups_echo"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (echo_pin)) == null ? '' : __t) +
                    ' , INPUT );\n';

            }
            return __p
        };

        this["JST"]["bq_bat_setups_trigger"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (trigger_pin)) == null ? '' : __t) +
                    ' , OUTPUT );\n';

            }
            return __p
        };

        this["JST"]["bq_bluetooth_def_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <SoftwareSerial.h>';

            }
            return __p
        };

        this["JST"]["bq_bluetooth_def_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',INPUT);\n  pinMode(' +
                    ((__t = (NextPIN)) == null ? '' : __t) +
                    ', OUTPUT);\n  blueToothSerial.begin(' +
                    ((__t = (baud_rate)) == null ? '' : __t) +
                    ');\n  blueToothSerial.flush();\n';

            }
            return __p
        };

        this["JST"]["bq_bluetooth_receive"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'blueToothSerial.read()';

            }
            return __p
        };

        this["JST"]["bq_bluetooth_send"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'blueToothSerial.write( ' +
                    ((__t = (statement_send)) == null ? '' : __t) +
                    ' );\n';

            }
            return __p
        };

        this["JST"]["bq_button"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bq_button_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["bq_buttons"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '  adc_key_in =analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ');\n  key = get_key(adc_key_in);\n  if (key != oldkey)\n  {\n    delay(50);\n    adc_key_in = analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ');\n    key = get_key(adc_key_in);\n    if (key != oldkey)\n    {\n      oldkey = key;\n      if (key >=0){\n        switch(key)\n        {\n          case 0:\n           ' +
                    ((__t = (code_btn1)) == null ? '' : __t) +
                    '\n          break;\n          case 1:\n           ' +
                    ((__t = (code_btn2)) == null ? '' : __t) +
                    '\n          break;\n          case 2:\n           ' +
                    ((__t = (code_btn3)) == null ? '' : __t) +
                    '\n          break;\n          case 3:\n           ' +
                    ((__t = (code_btn4)) == null ? '' : __t) +
                    '\n          break;  \n          case 4:\n           ' +
                    ((__t = (code_btn5)) == null ? '' : __t) +
                    '\n          break;\n        }      \n      }\n    }\n  }\n';

            }
            return __p
        };

        this["JST"]["bq_buttons_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'int get_key(unsigned int input)\n  {\n    int k;\n    for (k = 0; k < NUM_KEYS; k++)\n    {\n      if (input < adc_key_val[k])\n      {\n        return k;\n      }\n    }\n    if (k >= NUM_KEYS)k = -1;\n      return k;\n}\n';

            }
            return __p
        };

        this["JST"]["bq_buttons_definitions_variables"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '//bqButtons\nint adc_key_val[5] ={20,50, 100, 200, 600 };\nint NUM_KEYS = 5;\nint adc_key_in;\nint key=-1;\nint oldkey=-1;\n';

            }
            return __p
        };

        this["JST"]["bq_infrared"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bq_infrared_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ' , INPUT);\n';

            }
            return __p
        };

        this["JST"]["bq_joystick"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'readJoystick_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '()';

            }
            return __p
        };

        this["JST"]["bq_joystick_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'int * readJoystick_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '(){\n  _internal_readJoystick_array_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '[0]=analogRead(' +
                    ((__t = (pinx)) == null ? '' : __t) +
                    ');\n  _internal_readJoystick_array_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '[1]=analogRead(' +
                    ((__t = (piny)) == null ? '' : __t) +
                    ');\n  _internal_readJoystick_array_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '[2]=digitalRead(' +
                    ((__t = (pinbutton)) == null ? '' : __t) +
                    ');\n  return _internal_readJoystick_array_' +
                    ((__t = (name)) == null ? '' : __t) +
                    ';\n}';

            }
            return __p
        };

        this["JST"]["bq_joystick_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (pinbutton)) == null ? '' : __t) +
                    ',INPUT_PULLUP);\n';

            }
            return __p
        };

        this["JST"]["bq_led"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += __p += 'digitalWrite(' +
                    ((__t = (dropdown_pin1)) == null ? '' : __t) +
                    ',HIGH);\n digitalWrite(' +
                    ((__t = (dropdown_pin2)) == null ? '' : __t) +
                    ',LOW);\n';

            }
            return __p
        };

        this["JST"]["bq_led_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +='pinMode(' +
                    ((__t = (dropdown_pin1)) == null ? '' : __t) +
                    ',OUTPUT);\n pinMode(' +
                    ((__t = (dropdown_pin2)) == null ? '' : __t) +
                    ',OUTPUT);\n';

            }
            return __p
        };


          

        this["JST"]["bq_photoresistor"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bq_piezo_buzzer"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'color(' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +          
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };
 this["JST"]["bq_piezo_buzzer_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
            __p +='pinMode(' +                    
                    ((__t = (dropdown_pinrojo)) == null ? '' : __t) +          
                    ',OUTPUT);\npinMode(' +
                    ((__t = (dropdown_pinverde)) == null ? '' : __t) +          
                    ',OUTPUT);\npinMode(' +
                    ((__t = (dropdown_pinazul)) == null ? '' : __t) +          
                    ',OUTPUT);\n}\nvoid color(int R, int G, int B)\n{\nanalogWrite(' +                    
                    ((__t = (dropdown_pinrojo)) == null ? '' : __t) +  ' , R);\nanalogWrite(' +                    
                    ((__t = (dropdown_pinverde)) == null ? '' : __t) +  ', G);\nanalogWrite(' +                    
                    ((__t = (dropdown_pinazul)) == null ? '' : __t) +  ', B);\n\n';
            }
            return __p
        };

 this["JST"]["bq_piezo_buzzerav"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
            __p += 'digitalWrite(13,HIGH);\ndigitalWrite(12,LOW);\ndigitalWrite(11,HIGH);\ndigitalWrite(10,LOW);\ndelay(1000); \n\n';


            }
            return __p
        };

        this["JST"]["bq_piezo_buzzerav_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
            __p += 'pinMode(13,OUTPUT);\npinMode(12,OUTPUT);\npinMode(11,OUTPUT);\npinMode(10,OUTPUT); \n\n';


            }
            return __p
        };
 
 
        this["JST"]["bq_potentiometer"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '( 5.0 * analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')* 100.0) / 1024.0';

            }
            return __p
        };

        this["JST"]["bt_serial_available"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'if (blueToothSerial.available()>0){\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n}\n';

            }
            return __p
        };

        this["JST"]["controls_doWhile"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'do {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n} while (' +
                    ((__t = (argument0)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["controls_execute"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (content)) == null ? '' : __t) +
                    '\n';

            }
            return __p
        };

        this["JST"]["controls_else"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'else {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }';

            }
            return __p
        };

        this["JST"]["controls_elseif"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'else if (' +
                    ((__t = (argument)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }';

            }
            return __p
        };

        this["JST"]["controls_if"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'if (' +
                    ((__t = (argument)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }';

            }
            return __p
        };

        this["JST"]["controls_setupLoop"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n';

            }
            return __p
        };

        this["JST"]["controls_whileUntil"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'while (' +
                    ((__t = (argument0)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }\n';

            }
            return __p
        };

        this["JST"]["inout_analog_read"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["inout_analog_read_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',INPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_analog_write"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogWrite(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (value_num)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["inout_analog_write_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_builtin_led"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalWrite(13,' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["inout_builtin_led_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(13,OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_digital_read"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["inout_digital_read_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',INPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_digital_write"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalWrite(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["inout_digital_write_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_highlow"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (bool_value)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["lcd_clear"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.clear();\n';

            }
            return __p
        };

        this["JST"]["lcd_def_declare"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'LiquidCrystal lcd(' +
                    ((__t = (lcd_1)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_2)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_3)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_4)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_5)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_6)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["lcd_def_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <Wire.h>\n#include <LiquidCrystal.h>';

            }
            return __p
        };

        this["JST"]["lcd_def_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.begin(16, 2);\nlcd.clear();\n';

            }
            return __p
        };

        this["JST"]["lcd_print"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.print(' +
                    ((__t = (val)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["lcd_print_pos"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.setCursor(' +
                    ((__t = (ycoor)) == null ? '' : __t) +
                    ',' +
                    ((__t = (xcoor)) == null ? '' : __t) +
                    ');\nlcd.print(' +
                    ((__t = (val)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["lcd_setBacklight"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.setBacklight(' +
                    ((__t = (state)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["logic_compare"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (operator)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (argument1)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["logic_negate"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '!' +
                    ((__t = (argument0)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["logic_operation"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (operator)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (argument1)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["math_arithmetic"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    '' +
                    ((__t = (operator)) == null ? '' : __t) +
                    '' +
                    ((__t = (argument1)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["math_arithmetic_pow"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pow(' +
                    ((__t = (argument0)) == null ? '' : __t) +
                    ',' +
                    ((__t = (argument1)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["math_modulo"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    '%' +
                    ((__t = (argument1)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["math_random"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'random(' +
                    ((__t = (value_num)) == null ? '' : __t) +
                    ',' +
                    ((__t = (value_dmax)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["procedures_callnoreturn"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (funcName)) == null ? '' : __t) +
                    '(' +
                    ((__t = (funcArgs)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["procedures_callreturn"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (funcName)) == null ? '' : __t) +
                    '(' +
                    ((__t = (funcArgs)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["procedures_defnoreturn"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (returnType)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (funcName)) == null ? '' : __t) +
                    ' (' +
                    ((__t = (args)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }\n';

            }
            return __p
        };

        this["JST"]["procedures_defreturn"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (returnType)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (funcName)) == null ? '' : __t) +
                    ' (' +
                    ((__t = (args)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n' +
                    ((__t = (returnValue)) == null ? '' : __t) +
                    ' }\n';

            }
            return __p
        };

        this["JST"]["serial_available"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'if (Serial.available()>0){\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n}\n';

            }
            return __p
        };

        this["JST"]["serial_parseint"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.parseInt()\n';

            }
            return __p
        };

        this["JST"]["serial_parseint_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_print"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.print(' +
                    ((__t = (content)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_print_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_println"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.println(' +
                    ((__t = (content)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_println_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_read"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.read()';

            }
            return __p
        };

        this["JST"]["serial_read_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_readstring"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.readString()\n';

            }
            return __p
        };

        this["JST"]["serial_readstring_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_special"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (char)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["servo_cont"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'servos.write(' +
                    ((__t = (value_degree)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["servo_cont_definitions_include"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <Servo.h>\nServo servo10; \nServo servo11; \n#define FIC_centro 1600\n #define FDC_centro 1500\n #define AIC_centro 1400\n #define ADC_centro 1600\n #define FIP_centro 300\n #define FDP_centro 350\n #define AIP_centro      400\n #define ADP_centro      450\n #define FIC_pin A0\n #define FDC_pin 5\n  #define AIC_pin A1\n #define ADC_pin 4\n  #define FIP_pin A2\n #define FDP_pin 7\n  #define AIP_pin A3\n #define ADP_pin 6\n #define Cabeza_pin 3\n #define pulsador 13\n int modo_funcionamiento = 0;\n int variable_altura = 300;\nint movimiento_izq;\n int movimiento_der;\n int levanta = -500;\n int contador_sentarse;\n int distancia_actual = 0;\n int aux = 0;  \nint variable_sienta = 1000; \n int tiempo_entre_servo = 35; \nconst int tiempo_sienta = 50; \n const int distancia_deteccion = 30; \n  const int distancia_critica = 15; \n const int margen_joystick = 10; \n int variable_control = 0; \n long aux_tiempo_random = 0; \n int tiempo_random = 0; \n bool aux_random = 0; \n const  int servo_us_izq = 120; \n const  int servo_us_med = 90; \n const  int servo_us_der = 60; \n Servo FIC_servo; \n Servo FDC_servo; \n Servo AIC_servo; \n Servo ADC_servo; \n Servo FIP_servo; \n Servo FDP_servo; \n Servo AIP_servo; \n Servo ADP_servo; \n Servo Cabeza_servo; \n';

            }
            return __p
        };

        this["JST"]["servo_cont_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'servos.attach(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["servo_move"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'servos.write(' +
                    ((__t = (value_degree)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["servo_move_definitions_include"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <Servo.h>\n\nServo servos;';

            }
            return __p
        };

        this["JST"]["servo_move_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'servos.attach(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["text_equalsIgnoreCase"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (string1)) == null ? '' : __t) +
                    '.equalsIgnoreCase(' +
                    ((__t = (string2)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["text_length"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    '.length()';

            }
            return __p
        };

        this["JST"]["text_substring"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (string1)) == null ? '' : __t) +
                    '.substring(' +
                    ((__t = (from)) == null ? '' : __t) +
                    ',' +
                    ((__t = (to)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["variables_set"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (varName)) == null ? '' : __t) +
                    '=' +
                    ((__t = (varValue)) == null ? '' : __t) +
                    ';\n';

            }
            return __p
        };

        this["JST"]["zum_button"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["zum_button_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',INPUT_PULLUP);\n';

            }
            return __p
        };

        this["JST"]["zum_follower"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'if(digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')==HIGH)\n{\n  ' +
                    ((__t = (code_btn1)) == null ? '' : __t) +
                    '\n}\nif(digitalRead(' +
                    ((__t = (NextPIN)) == null ? '' : __t) +
                    ')==HIGH)\n{\n  ' +
                    ((__t = (code_btn2)) == null ? '' : __t) +
                    '\n}\n';

            }
            return __p
        };

        this["JST"]["zum_follower_setups_nextpin"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (NextPIN)) == null ? '' : __t) +
                    ' , INPUT);\n';

            }
            return __p
        };

        this["JST"]["zum_follower_setups_pin"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ' , INPUT);\n';

            }
            return __p
        };

        this["JST"]["zum_infrared"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["zum_infrared_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ' , INPUT);\n';

            }
            return __p
        };
//coco inicio

        this["JST"]["ATRAS2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ' servo10.write(0); \nservo11.write(180); \n delay(1500);\nservo10.write(90); \nservo11.write(90);';

            }
            return __p
        };

        this["JST"]["ATRAS_setups2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT); \nservo10.attach(10);\nservo11.attach(11);\n while (digitalRead(13)==LOW);'; 

            }
            return __p
        };
this["JST"]["DERECHA2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ' servo10.write(0); \nservo11.write(0); \n delay(1500);\nservo10.write(90); \nservo11.write(90);';
            }
            return __p
        };

        this["JST"]["DERECHA_setups2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT); \nservo10.attach(10);\nservo11.attach(11);\n while (digitalRead(13)==LOW);'; 

            }
            return __p
        };

        this["JST"]["IZQUIERDA2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ' servo10.write(180); \nservo11.write(180); \n delay(1500);\nservo10.write(90); \nservo11.write(90);';
            }
            return __p
        };

        this["JST"]["IZQUIERDA_setups2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT); \nservo10.attach(10);\nservo11.attach(11);\n while (digitalRead(13)==LOW);'; 

            }
            return __p
        };


this["JST"]["ESPERAR2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'delay(' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["ESPERAR_setups2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT); \nservo10.attach(10);\nservo11.attach(11);\n while (digitalRead(13)==LOW);'; 

            }
            return __p
        };





        this["JST"]["ADELANTE2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += ' servo10.write(180); \nservo11.write(0); \n delay(1500);\nservo10.write(90); \nservo11.write(90);';            }
            return __p
        };

        this["JST"]["ADELANTE_setups2"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT); \nservo10.attach(10);\nservo11.attach(11);\n while (digitalRead(13)==LOW);'; 
            }
            return __p
        };



//coco final
        this["JST"]["ATRAS"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'movimiento_izq = 300;\n  movimiento_der = 300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);movimiento_izq = 300;\n  movimiento_der = 300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);movimiento_izq = 300;\n  movimiento_der = 300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);FIC_servo.writeMicroseconds(FIC_centro); \ndelay(tiempo_entre_servo);\nFDC_servo.writeMicroseconds(FDC_centro);\ndelay(tiempo_entre_servo);\n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo);\nADC_servo.writeMicroseconds(ADC_centro);\n delay(tiempo_entre_servo); \n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo); \n Cabeza_servo.write(servo_us_med);';

            }
            return __p
        };

        this["JST"]["ATRAS_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT);\nFIC_servo.attach(FIC_pin);\nFIC_servo.writeMicroseconds(FIC_centro);\ndelay(tiempo_entre_servo);\nFDC_servo.attach(FDC_pin); \n FDC_servo.writeMicroseconds(FDC_centro);\n delay(tiempo_entre_servo);\n AIC_servo.attach(AIC_pin); \n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo); \n ADC_servo.attach(ADC_pin);\n ADC_servo.writeMicroseconds(ADC_centro); \n delay(tiempo_entre_servo);\n FIP_servo.attach(FIP_pin);\n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n FDP_servo.attach(FDP_pin);\n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.attach(AIP_pin);\n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n ADP_servo.attach(ADP_pin);\n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);\n Cabeza_servo.attach(Cabeza_pin);\n Cabeza_servo.write(servo_us_med);\n delay(500); while (digitalRead(13)==LOW);'; 

            }
            return __p
        };
this["JST"]["DERECHA"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'movimiento_izq = 300;\n  movimiento_der = -300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);movimiento_izq = 300;\n  movimiento_der = -300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);movimiento_izq = 300;\n  movimiento_der = -300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);FIC_servo.writeMicroseconds(FIC_centro); \ndelay(tiempo_entre_servo);\nFDC_servo.writeMicroseconds(FDC_centro);\ndelay(tiempo_entre_servo);\n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo);\nADC_servo.writeMicroseconds(ADC_centro);\n delay(tiempo_entre_servo); \n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo); \n Cabeza_servo.write(servo_us_med);';

            }
            return __p
        };

        this["JST"]["DERECHA_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT);\nFIC_servo.attach(FIC_pin);\nFIC_servo.writeMicroseconds(FIC_centro);\ndelay(tiempo_entre_servo);\nFDC_servo.attach(FDC_pin); \n FDC_servo.writeMicroseconds(FDC_centro);\n delay(tiempo_entre_servo);\n AIC_servo.attach(AIC_pin); \n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo); \n ADC_servo.attach(ADC_pin);\n ADC_servo.writeMicroseconds(ADC_centro); \n delay(tiempo_entre_servo);\n FIP_servo.attach(FIP_pin);\n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n FDP_servo.attach(FDP_pin);\n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.attach(AIP_pin);\n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n ADP_servo.attach(ADP_pin);\n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);\n Cabeza_servo.attach(Cabeza_pin);\n Cabeza_servo.write(servo_us_med);\n delay(500); while (digitalRead(13)==LOW);'; 

            }
            return __p
        };

        this["JST"]["IZQUIERDA"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'movimiento_izq = -300;\n  movimiento_der = 300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);movimiento_izq = -300;\n  movimiento_der = 300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);movimiento_izq = -300;\n  movimiento_der = 300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);FIC_servo.writeMicroseconds(FIC_centro); \ndelay(tiempo_entre_servo);\nFDC_servo.writeMicroseconds(FDC_centro);\ndelay(tiempo_entre_servo);\n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo);\nADC_servo.writeMicroseconds(ADC_centro);\n delay(tiempo_entre_servo); \n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo); \n Cabeza_servo.write(servo_us_med);';

            }
            return __p
        };

        this["JST"]["IZQUIERDA_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT);\nFIC_servo.attach(FIC_pin);\nFIC_servo.writeMicroseconds(FIC_centro);\ndelay(tiempo_entre_servo);\nFDC_servo.attach(FDC_pin); \n FDC_servo.writeMicroseconds(FDC_centro);\n delay(tiempo_entre_servo);\n AIC_servo.attach(AIC_pin); \n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo); \n ADC_servo.attach(ADC_pin);\n ADC_servo.writeMicroseconds(ADC_centro); \n delay(tiempo_entre_servo);\n FIP_servo.attach(FIP_pin);\n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n FDP_servo.attach(FDP_pin);\n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.attach(AIP_pin);\n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n ADP_servo.attach(ADP_pin);\n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);\n Cabeza_servo.attach(Cabeza_pin);\n Cabeza_servo.write(servo_us_med);\n delay(500); while (digitalRead(13)==LOW);'; 

            }
            return __p
        };


this["JST"]["ESPERAR"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'delay(' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["ESPERAR_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT);\nFIC_servo.attach(FIC_pin);\nFIC_servo.writeMicroseconds(FIC_centro);\ndelay(tiempo_entre_servo);\nFDC_servo.attach(FDC_pin); \n FDC_servo.writeMicroseconds(FDC_centro);\n delay(tiempo_entre_servo);\n AIC_servo.attach(AIC_pin); \n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo); \n ADC_servo.attach(ADC_pin);\n ADC_servo.writeMicroseconds(ADC_centro); \n delay(tiempo_entre_servo);\n FIP_servo.attach(FIP_pin);\n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n FDP_servo.attach(FDP_pin);\n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.attach(AIP_pin);\n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n ADP_servo.attach(ADP_pin);\n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);\n Cabeza_servo.attach(Cabeza_pin);\n Cabeza_servo.write(servo_us_med);\n delay(500); while (digitalRead(13)==LOW);'; 

            }
            return __p
        };

        this["JST"]["LUZ"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalWrite(8,HIGH);\ndelay(2000);\ndigitalWrite(8,LOW);\ndelay(1000);\n';

            }
            return __p
        };

        this["JST"]["LUZ_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(8,OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["MUSICA"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'tone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,200);\ndelay(200);\ntone(3,293.66,100);\ndelay(100);\ntone(3,293.66,100);\ndelay(100);\ntone(3,440,100);\ndelay(100);\ntone(3,523.25,100);\ndelay(100);\ntone(3,587.33,100);\ndelay(200);\ntone(3,587.33,100);\ndelay(200);\ntone(3,587.33,100);\ndelay(100);\ntone(3,659.25,100);\ndelay(100);\ntone(3,698.45,100);\ndelay(200);\ntone(3,698.45,100);\ndelay(200);\ntone(3,698.45,100);\ndelay(100);\ntone(3,783.99,100);\ndelay(100);\ntone(3,659.25,100);\ndelay(200);\ntone(3,659.25,100);\ndelay(200);\ntone(3,587.33,100);\ndelay(100);\ntone(3,523.25,100);\ndelay(100);\ntone(3,523.25,100);\ndelay(100);\ntone(3,587.33,100);\ndelay(300);\ntone(3,440,100);\ndelay(100);\ntone(3,523.25,100);\ndelay(100);\ntone(3,587.33,100);\ndelay(200);\ntone(3,587.33,100);\ndelay(200);\ntone(3,587.33,100);\ndelay(100);\ntone(3,659.25,100);\ndelay(100);\ntone(3,698.45,100);\ndelay(200);\ntone(3,698.45,100);\ndelay(200);\ntone(3,698.45,100);\ndelay(100);\ntone(3,783.99,100);\ndelay(100);\ntone(3,659.25,100);\ndelay(200);\ntone(3,659.25,100);\ndelay(200);\ntone(3,587.33,100);\ndelay(100);\ntone(3,523.25,100);\ndelay(100);\ntone(3,587.33,100);\ndelay(400);\ntone(3,440,100);\ndelay(100);\ntone(3,523.25,100);\ndelay(100);\ntone(3,587.33,100);\ndelay(200);\ntone(3,587.33,100);\ndelay(200);\ntone(3,587.33,100);\ndelay(100);\ntone(3,698.45,100);\ndelay(100);\ntone(3,783.99,100);\ndelay(200);\ntone(3,783.99,100);\ndelay(200);\ntone(3,783.99,100);\ndelay(100);\ntone(3,880,100);\ndelay(100);\ntone(3,932.33,100);\ndelay(200);\ntone(3,932.33,100);\ndelay(200);\ntone(3,880,100);\ndelay(100);\ntone(3,783.99,100);\ndelay(100);\ntone(3,880,100);\ndelay(100);\ntone(3,587.33,100);\ndelay(300);\ntone(3,587.33,100);\ndelay(100);\ntone(3,659.25,100);\ndelay(100);\ntone(3,698.45,100);\ndelay(200);\ntone(3,698.45,100);\ndelay(200);\ntone(3,783.99,100);\ndelay(200);\ntone(3,880,100);\ndelay(100);\ntone(3,587.33,100);\ndelay(300);\ntone(3,587.33,100);\ndelay(100);\ntone(3,698.45,100);\ndelay(100);\ntone(3,659.25,100);\ndelay(200);\ntone(3,659.25,100);\ndelay(200);\ntone(3,698.45,100);\ndelay(100);\ntone(3,587.33,100);\ndelay(100);\ntone(3,659.25,100);\ndelay(400);\ntone(3,880,100);\ndelay(100);\ntone(3,1046.50,100);\ndelay(100);\ntone(3,1174.66,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(100);\ntone(3,1318.51,100);\ndelay(100);\ntone(3,1396.91,100);\ndelay(200);\ntone(3,1396.91,100);\ndelay(200);\ntone(3,1396.91,100);\ndelay(100);\ntone(3,1567.98,100);\ndelay(100);\ntone(3,1318.51,100);\ndelay(200);\ntone(3,1318.51,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(100);\ntone(3,1046.50,100);\ndelay(100);\ntone(3,1046.50,100);\ndelay(100);\ntone(3,1174.66,100);\ndelay(300);\ntone(3,880,100);\ndelay(100);\ntone(3,1046.50,100);\ndelay(100);\ntone(3,1174.66,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(100);\ntone(3,1318.51,100);\ndelay(100);\ntone(3,1396.91,100);\ndelay(200);\ntone(3,1396.91,100);\ndelay(200);\ntone(3,1396.91,100);\ndelay(100);\ntone(3,1567.98,100);\ndelay(100);\ntone(3,1318.51,100);\ndelay(200);\ntone(3,1318.51,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(100);\ntone(3,1046.50,100);\ndelay(100);\ntone(3,1174.66,100);\ndelay(400);\ntone(3,880,100);\ndelay(100);\ntone(3,1046.50,100);\ndelay(100);\ntone(3,1174.66,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(100);\ntone(3,1396.91,100);\ndelay(100);\ntone(3,1567.98,100);\ndelay(200);\ntone(3,1567.98,100);\ndelay(200);\ntone(3,1567.98,100);\ndelay(100);\ntone(3,1760,100);\ndelay(100);\ntone(3,1864.66,100);\ndelay(200);\ntone(3,1864.66,100);\ndelay(200);\ntone(3,1760,100);\ndelay(100);\ntone(3,1567.98,100);\ndelay(100);\ntone(3,1760,100);\ndelay(100);\ntone(3,1174.66,100);\ndelay(300);\ntone(3,1174.66,100);\ndelay(100);\ntone(3,1318.51,100);\ndelay(100);\ntone(3,1396.91,100);\ndelay(200);\ntone(3,1396.91,100);\ndelay(200);\ntone(3,1567.98,100);\ndelay(200);\ntone(3,1760,100);\ndelay(100);\ntone(3,1174.66,100);\ndelay(300);\ntone(3,1174.66,100);\ndelay(100);\ntone(3,1396.91,100);\ndelay(100);\ntone(3,1318.51,100);\ndelay(200);\ntone(3,1318.51,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(100);\ntone(3,1108.73,100);\ndelay(100);\ntone(3,1174.66,100);\ndelay(200);\ntone(3,1174.66,100);\ndelay(200);\ntone(3,1318.51,100);\ndelay(200);\ntone(3,1396.91,100);\ndelay(200);\ntone(3,1396.91,100);\ndelay(100);\ntone(3,1396.91,100);\ndelay(100);\ntone(3,1567.98,100);\ndelay(200);';
;

            }
            return __p
        };

        this["JST"]["MUSICA_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(3,OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["ADELANTE"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'movimiento_izq = -300;\n  movimiento_der = -300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);movimiento_izq = -300;\n  movimiento_der = -300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);movimiento_izq = -300;\n  movimiento_der = -300;\n FDP_servo.writeMicroseconds(FDP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FIC_servo.writeMicroseconds(FIC_centro - movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro + movimiento_der);\n delay(tiempo_entre_servo / 2);\n   FDC_servo.writeMicroseconds(FDC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro - levanta + variable_altura);\n delay(tiempo_entre_servo);\n  FDC_servo.writeMicroseconds(FDC_centro + movimiento_der);\n delay(tiempo_entre_servo);\n  AIC_servo.writeMicroseconds(AIC_centro - movimiento_izq);\n delay(tiempo_entre_servo / 2);\n  FIC_servo.writeMicroseconds(FIC_centro + movimiento_izq);\n delay(tiempo_entre_servo);\n  ADC_servo.writeMicroseconds(ADC_centro - movimiento_der);\n delay(tiempo_entre_servo);\n  FIP_servo.writeMicroseconds(FIP_centro + variable_altura); \n delay(tiempo_entre_servo);\n  ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);FIC_servo.writeMicroseconds(FIC_centro); \ndelay(tiempo_entre_servo);\nFDC_servo.writeMicroseconds(FDC_centro);\ndelay(tiempo_entre_servo);\n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo);\nADC_servo.writeMicroseconds(ADC_centro);\n delay(tiempo_entre_servo); \n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo); \n Cabeza_servo.write(servo_us_med);';
            }
            return __p
        };

        this["JST"]["ADELANTE_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT);\nFIC_servo.attach(FIC_pin);\nFIC_servo.writeMicroseconds(FIC_centro);\ndelay(tiempo_entre_servo);\nFDC_servo.attach(FDC_pin); \n FDC_servo.writeMicroseconds(FDC_centro);\n delay(tiempo_entre_servo);\n AIC_servo.attach(AIC_pin); \n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo); \n ADC_servo.attach(ADC_pin);\n ADC_servo.writeMicroseconds(ADC_centro); \n delay(tiempo_entre_servo);\n FIP_servo.attach(FIP_pin);\n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n FDP_servo.attach(FDP_pin);\n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.attach(AIP_pin);\n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n ADP_servo.attach(ADP_pin);\n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);\n Cabeza_servo.attach(Cabeza_pin);\n Cabeza_servo.write(servo_us_med);\n delay(500); while (digitalRead(13)==LOW);'; 
            }
            return __p
        };

 this["JST"]["REPOSO"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '  FIC_servo.writeMicroseconds(FIC_centro); \ndelay(tiempo_entre_servo);\nFDC_servo.writeMicroseconds(FDC_centro);\ndelay(tiempo_entre_servo);\n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo);\nADC_servo.writeMicroseconds(ADC_centro);\n delay(tiempo_entre_servo); \n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo); \n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo); \n Cabeza_servo.write(servo_us_med);'; 

            }
            return __p
        };

        this["JST"]["REPOSO_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=' pinMode (13,INPUT);\nFIC_servo.attach(FIC_pin);\nFIC_servo.writeMicroseconds(FIC_centro);\ndelay(tiempo_entre_servo);\nFDC_servo.attach(FDC_pin); \n FDC_servo.writeMicroseconds(FDC_centro);\n delay(tiempo_entre_servo);\n AIC_servo.attach(AIC_pin); \n AIC_servo.writeMicroseconds(AIC_centro);\n delay(tiempo_entre_servo); \n ADC_servo.attach(ADC_pin);\n ADC_servo.writeMicroseconds(ADC_centro); \n delay(tiempo_entre_servo);\n FIP_servo.attach(FIP_pin);\n FIP_servo.writeMicroseconds(FIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n FDP_servo.attach(FDP_pin);\n FDP_servo.writeMicroseconds(FDP_centro + variable_altura);\n delay(tiempo_entre_servo); \n AIP_servo.attach(AIP_pin);\n AIP_servo.writeMicroseconds(AIP_centro + variable_altura);\n delay(tiempo_entre_servo);\n ADP_servo.attach(ADP_pin);\n ADP_servo.writeMicroseconds(ADP_centro + variable_altura);\n delay(tiempo_entre_servo);\n Cabeza_servo.attach(Cabeza_pin);\n Cabeza_servo.write(servo_us_med);\n delay(500); while (digitalRead(13)==LOW);'; 
            }
            return __p
        };





        this["JST"]["zum_photoresistor"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["zum_piezo_buzzer"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'tone(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ',' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["zum_piezo_buzzerav"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'tone(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (Buzztone)) == null ? '' : __t) +
                    ',' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n\n';

            }
            return __p
        };

        this["JST"]["zum_potentiometer"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };
        var JST = this.JST;

        // Source: src/blocks/advanced_conversion/advanced_conversion.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * advanced_conversion code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.advanced_conversion = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var code = '';
            var a = Roboblocks2.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];


            var convertion = this.getFieldValue('CONV');
            code += JST['advanced_conversion']({
                'value_num': value_num,
                'convertion': convertion
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * advanced_conversion block definition
         * @type {Object}
         */
        Blockly.Blocks.advanced_conversion = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_SERIE,
            /**
             * advanced_conversion initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_CONVERSION_CONVERT'))
                    .appendField(new Blockly.FieldDropdown([
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_CONVERSION_DECIMAL') || 'DEC', 'DEC'],
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_CONVERSION_HEXADECIMAL') || 'HEX', 'HEX'],
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_CONVERSION_OCTAL') || 'OCT', 'OCT'],
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_CONVERSION_BINARY') || 'BIN', 'BIN']
                    ]), 'CONV');
                this.appendValueInput('NUM', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_CONVERSION_VALUE'))
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .setCheck(Number);
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_CONVERSION_TOOLTIP'));
            }
        };

        // Source: src/blocks/advanced_map/advanced_map.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * advanced_map code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.advanced_map = function() {
            var num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var from_min = Blockly.Arduino.valueToCode(this, 'FROM_MIN', Blockly.Arduino.ORDER_NONE);
            var from_max = Blockly.Arduino.valueToCode(this, 'FROM_MAX', Blockly.Arduino.ORDER_NONE);
            var to_min = Blockly.Arduino.valueToCode(this, 'TO_MIN', Blockly.Arduino.ORDER_NONE);
            var to_max = Blockly.Arduino.valueToCode(this, 'TO_MAX', Blockly.Arduino.ORDER_NONE);

            var code = '';
            var a = Roboblocks2.findPinMode(num);
            code += a['code'];
            num = a['pin'];

            a = Roboblocks2.findPinMode(from_min);
            code += a['code'];
            from_min = a['pin'];

            a = Roboblocks2.findPinMode(from_max);
            code += a['code'];
            from_max = a['pin'];

            a = Roboblocks2.findPinMode(to_min);
            code += a['code'];
            to_min = a['pin'];

            a = Roboblocks2.findPinMode(to_max);
            code += a['code'];
            to_max = a['pin'];


            code += JST['advanced_map']({
                'num': num,
                'from_min': from_min,
                'from_max': from_max,
                'to_min': to_min,
                'to_max': to_max
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * advanced_map block definition
         * @type {Object}
         */
        Blockly.Blocks.advanced_map = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: Roboblocks2.URL_MATH,
            /**
             * advanced_map initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_MATH);
                this.appendValueInput('NUM', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ADVANCED_MAP_MAP'))
                    .setCheck(Number);
                this.appendValueInput('FROM_MIN', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ADVANCED_MAP_FROM'))
                    .setCheck(Number);
                this.appendValueInput('FROM_MAX', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
                this.appendValueInput('TO_MIN', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ADVANCED_MAP_TO'))
                    .setCheck(Number);
                this.appendValueInput('TO_MAX', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_MATH_ADVANCED_MAP_TOOLTIP'));
            }
        };

        // Source: src/blocks/array_get/array_get.js
        /* global Blockly, Roboblocks2 */
        /* jshint sub:true */
        /**
         * array_get code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.array_get = function() {
            // Numeric value.
            var variable = this.getFieldValue('VAR');
            var index = this.getFieldValue('INDEX');
            var code = variable + '[' + index + ']';
            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            // var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        Blockly.Blocks.array_get = {
            // Numeric value.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_VARIABLES'),
            helpUrl: Roboblocks2.URL_VAR,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_VARIABLES);
                this.appendDummyInput('DUMMY').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GET')).appendField(new Blockly.FieldVariable(' '), 'VAR');
                // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                this.appendDummyInput('DUMMY2').appendField(Roboblocks2.locales.getKey('LANG_ARRAY_GET_BRACKET1')).appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.array_get.validator), 'INDEX').appendField(Roboblocks2.locales.getKey('LANG_ARRAY_GET_BRACKET2'));
                this.setOutput(true, Number);
                this.setInputsInline(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ARRAY_GET_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                this.last_variable = this.getFieldValue('VAR');
                if (!this.last_variables) {
                    this.last_variables = Blockly.Variables.allVariables();
                }
                var variables = Blockly.Variables.allVariables();
                for (var i in variables) {
                    if (Blockly.Variables.allVariables()[i] !== this.last_variables[i]) {
                        try {
                            this.removeInput('DUMMY');
                            this.removeInput('DUMMY2');
                        } catch (e) {}
                        this.appendDummyInput('DUMMY').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GET')).appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                        this.appendDummyInput('DUMMY2').appendField(Roboblocks2.locales.getKey('LANG_ARRAY_GET_BRACKET1')).appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.array_get.validator), 'INDEX').appendField(Roboblocks2.locales.getKey('LANG_ARRAY_GET_BRACKET2'));
                        this.setFieldValue(this.last_variable, 'VAR');
                        this.last_variables = Blockly.Variables.allVariables();
                    }
                }
                try {
                    if (!this.exists()) {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                if (this.getFieldValue('VAR')) {
                    for (var i in Blockly.Variables.allVariables()) {
                        if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                            return true;
                        }
                    }
                }
                return false;
            }
        };
        Blockly.Blocks.array_get.validator = function(text) {
            // Ensure that only a number may be entered.
            // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
            var n = window.parseFloat(text || 0);
            return window.isNaN(n) ? null : String(n);
        };
        // Source: src/blocks/base_delay/base_delay.js
        /* global Blockly, JST, Roboblocks2 */

        //register with blockly arduino
        Blockly.Arduino.base_delay = function() {
            var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(delay_time);
            code += a['code'];
            delay_time = a['pin'];

            code += JST['base_delay']({
                'delay_time': delay_time
            });
            return code;
        };

        Blockly.Blocks.base_delay = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: Roboblocks2.URL_LED,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendValueInput('DELAY_TIME', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT'))
                    .setCheck(Number);
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_CONTROLS_BASE_DELAY_TOOLTIP'));
            }
        };

        // Source: src/blocks/base_map/base_map.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * base_map code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.base_map = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);

            var code = '';
            var a = Roboblocks2.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];

            a = Roboblocks2.findPinMode(value_dmax);
            code += a['code'];
            value_dmax = a['pin'];

            code += JST['base_map']({
                'value_num': value_num,
                'value_dmax': value_dmax
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.base_map = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: Roboblocks2.URL_MATH,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_MATH);
                this.appendValueInput('NUM', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_BASE_MAP'))
                    .setCheck(Number);
                this.appendValueInput('DMAX', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_BASE_MAP_VALUE_TO'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_BASE_MAP_BRACKET'));
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_MATH_BASE_MAP_TOOLTIP'));
            }
        };

        // Source: src/blocks/base_millis/base_millis.js
        /* global Blockly, JST, Roboblocks2 */

        //register with blockly arduino
        Blockly.Arduino.base_millis = function() {
            var code = 'millis()';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.base_millis = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: Roboblocks2.URL_LED,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendDummyInput('').appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_BASE_MILLIS'));
                this.setOutput(true, 'Number');
                this.setTooltip(Roboblocks2.locales.getKey('LANG_CONTROLS_BASE_MILLIS_TOOLTIP'));
            }
        };

        // Source: src/blocks/bq_bat/bq_bat.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * bq_bat code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_bat = function() {
            var echo_pin = Blockly.Arduino.valueToCode(this, 'RED PIN', Blockly.Arduino.ORDER_ATOMIC);
            var trigger_pin = Blockly.Arduino.valueToCode(this, 'BLUE PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(echo_pin);
            code += a['code'];
            echo_pin = a['pin'];

            a = Roboblocks2.findPinMode(trigger_pin);
            code += a['code'];
            trigger_pin = a['pin'];

            Blockly.Arduino.definitions_['define_bq_bat_tp_init'] = JST['bq_bat_definitions_tp_init']({});
            Blockly.Arduino.definitions_['define_bq_bat_distance'] = JST['bq_bat_definitions_distance']({});
            if (Roboblocks2.isVariable(echo_pin)) {
                code += JST['bq_bat_setups_echo']({
                    'echo_pin': echo_pin
                });
            } else {
                Blockly.Arduino.setups_['setup_bq_bat_' + echo_pin + trigger_pin] = JST['bq_bat_setups_echo']({
                    'echo_pin': echo_pin
                });
            }
            if (Roboblocks2.isVariable(trigger_pin)) {
                code += JST['bq_bat_setups_trigger']({
                    'trigger_pin': trigger_pin
                });
            } else {
                Blockly.Arduino.setups_['setup_bq_bat_2' + trigger_pin + echo_pin] = JST['bq_bat_setups_trigger']({
                    'trigger_pin': trigger_pin
                });
            }
            code += JST['bq_bat']({
                'trigger_pin': trigger_pin,
                'echo_pin': echo_pin
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * bq_bat block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_bat = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ZUM'),
            tags: ['bat'],
            helpUrl: Roboblocks2.URL_US,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ZUM);
                this.appendDummyInput('').appendField(Roboblocks2.locales.getKey('LANG_BQ_BAT')).appendField(new Blockly.FieldImage('img/blocks/bqmod09.png', 208 * options.zoom, 140 * options.zoom));
                this.appendValueInput('RED PIN').appendField(Roboblocks2.locales.getKey('LANG_BQ_BAT_RED_PIN')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
                this.appendValueInput('BLUE PIN').appendField(Roboblocks2.locales.getKey('LANG_BQ_BAT_BLUE_PIN')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
                this.setInputsInline(false);
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_BAT_TOOLTIP'));
            }
        };
        // Source: src/blocks/bq_bluetooth_def/bq_bluetooth_def.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * bq_bluetooth_def code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_bluetooth_def = function() {
            var dropdown_pin, NextPIN;
            if (this.getFieldValue('TOGGLE') === 'FALSE') {
                dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
                NextPIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
                var a = Roboblocks2.findPinMode(dropdown_pin);
                Blockly.Arduino.setups_['setup_bluetooth_pinmode'] = a['code'];
                dropdown_pin = a['pin'];
                a = Roboblocks2.findPinMode(NextPIN);
                Blockly.Arduino.setups_['setup_bluetooth_pinmode2'] = a['code'];
                NextPIN = a['pin'];
            } else {
                dropdown_pin = 0;
                NextPIN = 1;
            }
            var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
            var b = Roboblocks2.findPinMode(baud_rate);
            Blockly.Arduino.setups_['setup_bluetooth_pinmode3'] = b['code'];
            baud_rate = b['pin'];

            Blockly.Arduino.definitions_['declare_var_blueToothSerial' + dropdown_pin] = 'SoftwareSerial blueToothSerial(' + dropdown_pin + ',' + NextPIN + ');\n';
            Blockly.Arduino.definitions_['define_softwareserial'] = JST['bq_bluetooth_def_definitions']({
                'dropdown_pin': dropdown_pin,
                'NextPIN': NextPIN
            });
            Blockly.Arduino.setups_['setup_bluetooth_'] = JST['bq_bluetooth_def_setups']({
                'baud_rate': baud_rate,
                'dropdown_pin': dropdown_pin,
                'NextPIN': NextPIN
            });
            return '';
        };
        /**
         * bq_bluetooth__def block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_bluetooth_def = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            tags: ['bluetooth'],
            helpUrl: Roboblocks2.URL_BT,
            /**
             * bq_bluetooth_slave initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_DEF')).appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));
                this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
                this.appendDummyInput().appendField('zum?').appendField(new Blockly.FieldCheckbox('FALSE'), 'TOGGLE').setAlign(Blockly.ALIGN_RIGHT);
                this.checkBT();
                this.last_toogle = this.getFieldValue('TOGGLE');
                this.setInputsInline(false);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_DEF_TOOLTIP'));
            },
            checkBT: function() {
                if (this.getFieldValue('TOGGLE') === 'FALSE') {
                    try {
                        this.removeInput('PIN');
                        this.removeInput('PIN2');
                    } catch (e) {}
                    this.appendValueInput('PIN').setCheck(Number).appendField(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_DEF_PIN1')).setAlign(Blockly.ALIGN_RIGHT);
                    this.appendValueInput('PIN2').setCheck(Number).appendField(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_DEF_PIN2')).setAlign(Blockly.ALIGN_RIGHT);
                } else {
                    try {
                        this.removeInput('PIN');
                        this.removeInput('PIN2');
                    } catch (e) {}
                }
            },
            onchange: function() {
                if (this.getFieldValue('TOGGLE') !== this.last_toogle) {
                    this.checkBT();
                    this.last_toogle = this.getFieldValue('TOGGLE');
                }
            }
        };
        // Source: src/blocks/bq_bluetooth_receive/bq_bluetooth_receive.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * bq_bluetooth_slave code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.bq_bluetooth_receive = function() {
            var code = JST['bq_bluetooth_receive']({});
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * bq_bluetooth_slave block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_bluetooth_receive = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            tags: ['bluetooth'],
            helpUrl: Roboblocks2.URL_BT,
            /**
             * bq_bluetooth_slave initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_RECEIVE'));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));

                this.setInputsInline(false);


                this.setOutput(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_RECEIVE_TOOLTIP'));
            }
        };

        // Source: src/blocks/bq_bluetooth_send/bq_bluetooth_send.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * bq_bluetooth_slave code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.bq_bluetooth_send = function() {
            var statement_send = Blockly.Arduino.valueToCode(this, 'SNT', Blockly.Arduino.ORDER_ATOMIC) || '';

            var code = '';
            var a = Roboblocks2.findPinMode(statement_send);
            code += a['code'];
            statement_send = a['pin'];

            code += JST['bq_bluetooth_send']({
                'statement_send': statement_send
            });

            return code;
        };

        /**
         * bq_bluetooth_send block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_bluetooth_send = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            tags: ['bluetooth'],
            helpUrl: Roboblocks2.URL_BT,
            /**
             * bq_bluetooth_send initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_SEND'));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));

                this.appendValueInput('SNT')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_SEND_SEND'));

                this.setInputsInline(false);


                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_BLUETOOTH_SEND_TOOLTIP'));
            }
        };

        // Source: src/blocks/bq_button/bq_button.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * bq_button code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_button = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['bq_button_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_button_' + dropdown_pin] = JST['bq_button_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['bq_button']({
                'dropdown_pin': dropdown_pin,
            });
            // console.log('code',code);
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * bq_button block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_button = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['button'],
            helpUrl: Roboblocks2.URL_BUTTON,
            /**
             * bq_button initialization
             **/
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTON')).appendField(new Blockly.FieldImage('img/blocks/bqmod05.png', 336 * options.zoom, 176 * options.zoom)).setCheck(Number).appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTON_PIN')).setAlign(Blockly.ALIGN_RIGHT);
                this.setOutput(true, Boolean);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_BUTTON_TOOLTIP'));
            }
        };
        // Source: src/blocks/bq_buttons/bq_buttons.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * bq_buttons code generation
         * @return {String} Code generated with block parameters
         */


        Blockly.Arduino.bq_buttons = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code_btn1 = Blockly.Arduino.statementToCode(this, 'BUTN1');
            var code_btn2 = Blockly.Arduino.statementToCode(this, 'BUTN2');
            var code_btn3 = Blockly.Arduino.statementToCode(this, 'BUTN3');
            var code_btn4 = Blockly.Arduino.statementToCode(this, 'BUTN4');
            var code_btn5 = Blockly.Arduino.statementToCode(this, 'BUTN5');

            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];


            code_btn1 = code_btn1.replace(/&quot;/g, '"');
            code_btn2 = code_btn2.replace(/&quot;/g, '"');
            code_btn3 = code_btn3.replace(/&quot;/g, '"');
            code_btn4 = code_btn4.replace(/&quot;/g, '"');
            code_btn5 = code_btn5.replace(/&quot;/g, '"');

            // code_btn1=code_btn1.replace(/&amp;/g,'');
            // code_btn2=code_btn2.replace(/&amp;/g,'');
            // code_btn3=code_btn3.replace(/&amp;/g,'');
            // code_btn4=code_btn4.replace(/&amp;/g,'');
            // code_btn5=code_btn5.replace(/&amp;/g,'');

            Blockly.Arduino.definitions_['declare_var_define_buttons' + dropdown_pin] = JST['bq_buttons_definitions_variables']({});
            Blockly.Arduino.definitions_['define_buttons' + dropdown_pin] = JST['bq_buttons_definitions']({
                'dropdown_pin': dropdown_pin
            });


            code += JST['bq_buttons']({
                'dropdown_pin': dropdown_pin,
                'code_btn1': code_btn1,
                'code_btn2': code_btn2,
                'code_btn3': code_btn3,
                'code_btn4': code_btn4,
                'code_btn5': code_btn5
            });

            return code;
        };

        /**
         * bq_buttons block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_buttons = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['buttons'],
            helpUrl: Roboblocks2.URL_BUTTONS,
            /**
             * bq_buttons initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendValueInput('PIN')
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTONS'))
                    .appendField(new Blockly.FieldImage('img/blocks/bqmod10.png', 336 * options.zoom, 176 * options.zoom))
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTONS_PIN'))
                    .setCheck(Number);
                this.appendStatementInput('BUTN1')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTONS_BUTTON_A'));
                this.appendStatementInput('BUTN2')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTONS_BUTTON_B'));
                this.appendStatementInput('BUTN3')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTONS_BUTTON_C'));
                this.appendStatementInput('BUTN4')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTONS_BUTTON_D'));
                this.appendStatementInput('BUTN5')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_BUTTONS_BUTTON_E'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_BUTTONS_TOOLTIP'));
            }
        };

        // Source: src/blocks/bq_infrared/bq_infrared.js
        /* global Blockly, options,  JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * bq_infrared code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_infrared = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['bq_infrared_setups']({
                    'dropdown_pin': dropdown_pin
                });
            } else {
                Blockly.Arduino.setups_['setup_infrared_' + dropdown_pin] = JST['bq_infrared_setups']({
                    'dropdown_pin': dropdown_pin
                });
            }
            code += JST['bq_infrared']({
                'dropdown_pin': dropdown_pin
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * bq_infrared block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_infrared = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['infrared'],
            helpUrl: Roboblocks2.URL_IR,
            /**
             * bq_infrared initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_BQ_INFRARED')).appendField(new Blockly.FieldImage('img/blocks/bqmod04.png', 208 * options.zoom, 126 * options.zoom)).appendField(Roboblocks2.locales.getKey('LANG_BQ_INFRARED_PIN')).setCheck(Number);
                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_INFRARED_TOOLTIP'));
            }
        };
        // Source: src/blocks/bq_joystick/bq_joystick.js
        /* global Blockly, options,JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * bq_joystick code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_joystick = function() {
            var pinx = Blockly.Arduino.valueToCode(this, 'PINX', Blockly.Arduino.ORDER_ATOMIC);
            var piny = Blockly.Arduino.valueToCode(this, 'PINY', Blockly.Arduino.ORDER_ATOMIC);
            var pinbutton = Blockly.Arduino.valueToCode(this, 'PINBUTTON', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';

            var a = Roboblocks2.findPinMode(pinx);
            code += a['code'];
            pinx = a['pin'];

            a = Roboblocks2.findPinMode(piny);
            code += a['code'];
            piny = a['pin'];

            a = Roboblocks2.findPinMode(pinbutton);
            code += a['code'];
            pinbutton = a['pin'];


            var name = pinx.substring(0, 3) + '_' + piny.substring(0, 3);

            Blockly.Arduino.definitions_['declare_var_internal_readJoystick_array_' + pinx] = 'int _internal_readJoystick_array_' + name + '[3];\n';
            Blockly.Arduino.definitions_['define_joystick' + pinx] = JST['bq_joystick_definitions']({
                'name': name,
                'pinx': pinx,
                'piny': piny,
                'pinbutton': pinbutton
            });
            if (Roboblocks2.isVariable(pinbutton)) {
                code += JST['bq_joystick_setups']({
                    'pinbutton': pinbutton
                });
            } else {
                Blockly.Arduino.setups_['setup_joystick_' + pinbutton] = JST['bq_joystick_setups']({
                    'pinbutton': pinbutton
                });
            }
            var array = Blockly.Arduino.valueToCode(this, 'POS', Blockly.Arduino.ORDER_ATOMIC);
            code += JST['bq_joystick']({
                'name': name,
                'pinx': pinx,
                'array': array
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * bq_joystick block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_joystick = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['joystick'],
            helpUrl: Roboblocks2.URL_JOYSTICK,
            /**
             * bq_joystick initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_BQ_JOYSTICK')).appendField(new Blockly.FieldImage('img/blocks/bqmod11.png', 209 * options.zoom, 277 * options.zoom));
                // this.appendValueInput('POS')
                //     .appendField(Roboblocks2.locales.getKey('LANG_BQ_JOYSTICK_POSITION'))
                //     .setAlign(Blockly.ALIGN_RIGHT)
                //     .setCheck(Number);
                this.appendValueInput('PINX').appendField(Roboblocks2.locales.getKey('LANG_BQ_JOYSTICK_PIN_X')).setAlign(Blockly.ALIGN_RIGHT).setCheck(Number);
                this.appendValueInput('PINY').appendField(Roboblocks2.locales.getKey('LANG_BQ_JOYSTICK_PIN_Y')).setAlign(Blockly.ALIGN_RIGHT).setCheck(Number);
                this.appendValueInput('PINBUTTON').appendField(Roboblocks2.locales.getKey('LANG_BQ_JOYSTICK_PIN_BUTTON')).setAlign(Blockly.ALIGN_RIGHT).setCheck(Number);
                this.setOutput(true, Number);
                // this.setPreviousStatement(true, null);
                // this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_JOYSTICK_TOOLTIP'));
            }
        };
        // Source: src/blocks/bq_led/bq_led.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * bq_led code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_led = function() {
            var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin1);
            code += a['code'];
            dropdown_pin1 = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin1)) {
                code += JST['bq_led_setups']({
                    'dropdown_pin1': dropdown_pin1,
                    'dropdown_pin2': dropdown_pin2
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin1] = JST['bq_led_setups']({
                    'dropdown_pin1': dropdown_pin1,
                    'dropdown_pin2': dropdown_pin2
                });
            }
            code += JST['bq_led']({
                'dropdown_pin1': dropdown_pin1,
                'dropdown_pin2': dropdown_pin2
            });
            return code;
        };

        /**
         * bq_led block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_led = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * bq_led initialization
             */
            init: function() {
               

                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendDummyInput('').appendField(Roboblocks2.locales.getKey('LANG_BQ_LED')).appendField(new Blockly.FieldImage('img/blocks/bqmod02.png', 208 * options.zoom, 140 * options.zoom));
                this.appendValueInput('PIN1').appendField(Roboblocks2.locales.getKey('LANG_BQ_LED_PIN1')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
                this.appendValueInput('PIN2').appendField(Roboblocks2.locales.getKey('LANG_BQ_LED_PIN2')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_LED_TOOLTIP'));
            }
        };
        
        // Source: src/blocks/bq_photoresistor/bq_photoresistor.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * bq_photoresistor code generation
         * @return {String} Code generated with block parameters
         */
        //        var code = 'analogRead(' + dropdown_pin + ')';
        Blockly.Arduino.bq_photoresistor = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            code += JST['bq_photoresistor']({
                'dropdown_pin': dropdown_pin
            });

            //  code=code.substring(0,code.length-1);
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };


        /**
         * bq_photoresistor block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_photoresistor = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['photoresistor'],
            helpUrl: Roboblocks2.URL_LDR,
            /**
             * bq_photoresistor initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendValueInput('PIN')
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_PHOTORESISTOR'))
                    .appendField(new Blockly.FieldImage('img/blocks/bqmod01.png', 208 * options.zoom, 140 * options.zoom))
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_PHOTORESISTOR_PIN'))
                    .setCheck(Number);
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_PHOTORESISTOR_TOOLTIP'));
            }
        };

        // Source: src/blocks/bq_piezo_buzzer/bq_piezo_buzzer.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * bq_piezo_buzzer code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_piezo_buzzer = function() {

            var dropdown_pinrojo = Blockly.Arduino.valueToCode(this, 'PINROJO', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_pinverde = Blockly.Arduino.valueToCode(this, 'PINVERDE', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_pinazul = Blockly.Arduino.valueToCode(this, 'PINAZUL', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT') || '';
            var delay_time = Blockly.Arduino.valueToCode(this, 'DURA', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pinrojo);
            code += a['code'];
            dropdown_pinrojo = a['pin'];

            var a = Roboblocks2.findPinMode(dropdown_pinverde);
            code += a['code'];
            dropdown_pinverde = a['pin'];

            var a = Roboblocks2.findPinMode(dropdown_pinazul);
            code += a['code'];
            dropdown_pinazul = a['pin'];

            var a = Roboblocks2.findPinMode(delay_time);
            code += a['code'];
            delay_time = a['pin'];
           
            if (Roboblocks2.isVariable(dropdown_pinrojo)) {
                code += JST['bq_piezo_buzzer_setups']({
                    'dropdown_pinrojo': dropdown_pinrojo,
                    'dropdown_pinverde': dropdown_pinverde,
                    'dropdown_pinazul': dropdown_pinazul,
                    'dropdown_stat': dropdown_stat,
                    'delay_time': delay_time
                });
            } else {
                Blockly.Arduino.setups_['bq_piezo_buzzer' + dropdown_pinrojo] = JST['bq_piezo_buzzer_setups']({
                    'dropdown_pinrojo': dropdown_pinrojo,
                    'dropdown_pinverde': dropdown_pinverde,
                    'dropdown_pinazul': dropdown_pinazul,
                    'dropdown_stat': dropdown_stat,
                    'delay_time': delay_time
                });
            }
          
            code += JST['bq_piezo_buzzer']({
                'dropdown_pinrojo': dropdown_pinrojo,
                'dropdown_pinverde': dropdown_pinverde,
                'dropdown_pinazul': dropdown_pinazul,
                'dropdown_stat': dropdown_stat,
                'delay_time': delay_time
            });

              return code;
        };
    


        /**
         * bq_piezo_buzzer block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_piezo_buzzer = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['buzzer'],
            helpUrl: Roboblocks2.URL_BUZZER,
            /**
             * bq_piezo_buzzer initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER'))
                    .appendField(new Blockly.FieldImage('img/blocks/bqmod07.png', 208 * options.zoom, 140 * options.zoom));
                this.appendValueInput('PINROJO')
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_PINROJO'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendValueInput('PINVERDE')
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_PINVERDE'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendValueInput('PINAZUL')
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_PINAZUL'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);

                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_COLOR'))
                    .appendField(new Blockly.FieldDropdown([
                        [Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_ROJO') || 'ROJO', '255, 0, 0'],
                        [Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_VERDE') || 'VERDE', '0, 255, 0'],
                        [Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_AZUL') || 'AZUL', '0, 0, 255'],
                        [Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_AMARILLO') || 'AMARILLO', '255, 255, 0'],
                        [Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_VIOLETA') || 'VIOLETA', '153, 51, 255'],
                        [Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_NARANJA') || 'NARANJA', '255, 128, 0'],
                        [Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_APAGADO') || 'APAGADO', '0, 0, 0'],
                    ]), 'STAT') //523
                    .setAlign(Blockly.ALIGN_RIGHT);

                this.appendValueInput('DURA', Number)
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_DURATION'));

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZER_TOOLTIP'));
            }
        };


        // Source: src/blocks/bq_piezo_buzzerav/bq_piezo_buzzerav.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * bq_piezo_buzzerav code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_piezo_buzzerav = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['bq_piezo_buzzerav_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_piezo_buzzerav' + dropdown_pin] = JST['bq_piezo_buzzerav_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['bq_piezo_buzzerav']({
                'dropdown_pin': dropdown_pin,
            });
            // console.log('code',code);
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

            

        /**
         * bq_piezo_buzzerav block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_piezo_buzzerav = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['buzzer'],
            helpUrl: Roboblocks2.URL_BUZZER,
            /**
             * bq_piezo_buzzerav initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZERAV')).appendField(new Blockly.FieldImage('img/blocks/bqmod20.png', 336 * options.zoom, 176 * options.zoom))
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);               
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_PIEZO_BUZZERAV_TOOLTIP'));
            }
            
        };

        // Source: src/blocks/bq_potentiometer/bq_potentiometer.js
        /* global Blockly, options,JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * bq_potentiometer code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bq_potentiometer = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            code += JST['bq_potentiometer']({
                'dropdown_pin': dropdown_pin
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * bq_potentiometer block definition
         * @type {Object}
         */
        Blockly.Blocks.bq_potentiometer = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_BQ'),
            tags: ['potentiometer'],
            helpUrl: Roboblocks2.URL_POTENTIOMETER,
            /**
             * bq_potentiometer initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_BQ);
                this.appendValueInput('PIN')
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_POTENTIOMETER'))
                    .appendField(new Blockly.FieldImage('img/blocks/bqmod06.png', 208 * options.zoom, 139 * options.zoom))
                    .appendField(Roboblocks2.locales.getKey('LANG_BQ_POTENTIOMETER_PIN'))
                    .setCheck(Number);
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_BQ_POTENTIOMETER_TOOLTIP'));
            }
        };

        // Source: src/blocks/bt_serial_available/bt_serial_available.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * serial_available code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.bt_serial_available = function() {
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');

            var code = JST['bt_serial_available']({
                'branch': branch
            });
            return code;
        };

        /**
         * serial_available block definition
         * @type {Object}
         */
        Blockly.Blocks.bt_serial_available = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_BT,
            tags: ['bluetooth'],
            /**
             * bt_serial_available initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_BT_SERIAL_AVAILABLE'));
                this.appendStatementInput('DO')
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_BT_SERIAL_AVAILABLE_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_doWhile/controls_doWhile.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * controls_doWhile code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.controls_doWhile = function() {
            // Do while/until loop.
            var argument0 = Blockly.Arduino.valueToCode(this, 'WHILE', Blockly.Arduino.ORDER_NONE) || '';
            argument0 = argument0.replace(/&quot;/g, '"');
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');
            var code = '';
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
                // branch = branch.substring(0, branch.length - 2);
            }
            // branch=branch.replace(/&amp;/g, '');
            if (this.getFieldValue('MODE') === 'UNTIL') {
                if (!argument0.match(/^\w+$/)) {
                    argument0 = '(' + argument0 + ')';
                }
                argument0 = '!' + argument0;
            }
            code += JST['controls_doWhile']({
                'argument0': argument0,
                'branch': branch
            });
            return code;
        };
        Blockly.Blocks.controls_doWhile = {
            // Do/while loop.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            // helpUrl: Roboblocks2.URL_DOWHILE,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendStatementInput('DO').appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO'));
                this.appendValueInput('WHILE').setCheck(Boolean).appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT')).appendField(new Blockly.FieldDropdown([
                    [Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
                    [Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
                ]), 'MODE');
                // this.appendValueInput('WHILE').setCheck(Boolean).appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_WHILE'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_CONTROLS_DOWHILE_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_execute/controls_execute.js
        /* global Blockly, profiles, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * controls_execute code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.controls_execute = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            content = content.replace(/^"/, '');
            content = content.replace(/"$/g, '');
            if (content.match(/^#include /)) {
                var include_code = JST['controls_execute']({
                    'content': content
                });
                if ('define_include' in Blockly.Arduino.definitions_) {
                    Blockly.Arduino.definitions_['define_include'] += include_code;
                } else {
                    Blockly.Arduino.definitions_['define_include'] = include_code;
                }
            } else {
                code += JST['controls_execute']({
                    'content': content
                });
            }
            return code;
        };
        /**
         * control_execute block definition
         * @type {Object}
         */
        Blockly.Blocks.controls_execute = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            // helpUrl: Roboblocks2.URL_SERIE,
            /**
             * controls_execute initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendValueInput('CONTENT', String).appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_EXECUTE'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_CONTROLS_EXECUTE_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_flow_statements/controls_flow_statements.js
        /* global Blockly, Roboblocks2 */
        /* jshint sub:true */

        /**
         * controls_flow_statements code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.controls_flow_statements = function() {
            // Flow statements: continue, break.
            switch (this.getFieldValue('FLOW')) {
                case 'BREAK':
                    return 'break;\n';
                case 'CONTINUE':
                    return 'continue;\n';
            }
            throw 'Unknown flow statement.';
        };


        Blockly.Blocks.controls_flow_statements = {
            // Flow statements: continue, break.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: Roboblocks2.URL_FLOW_STATEMENTS,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                var dropdown = new Blockly.FieldDropdown(
                    [
                        [Roboblocks2.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK') || 'BREAK', 'BREAK'],
                        [Roboblocks2.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE') || 'CONTINUE', 'CONTINUE']
                    ]);
                this.appendDummyInput()
                    .appendField(dropdown, 'FLOW')
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP'));
                this.setPreviousStatement(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('FLOW');
                    return Blockly.Blocks.controls_flow_statements.TOOLTIPS[op];
                });
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a control statement?
                var block = this;
                do {
                    if (block.type === 'controls_repeat' ||
                        block.type === 'controls_forEach' ||
                        block.type === 'controls_for' ||
                        block.type === 'controls_whileUntil') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };

        Blockly.Blocks.controls_flow_statements.TOOLTIPS = {
            BREAK: Roboblocks2.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK'),
            CONTINUE: Roboblocks2.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE')
        };

        // Source: src/blocks/controls_for/controls_for.js
        /* global Blockly, Roboblocks2 */
        /* jshint sub:true */
        /**
         * controls_for code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.controls_for = function() {
            var variable0 = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
            var argument0 = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }

            var code = '';
            var a = Roboblocks2.findPinMode(variable0);
            code += a['code'];
            variable0 = a['pin'];

            a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = Roboblocks2.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

            var up = parseFloat(argument0) <= parseFloat(argument1);
            code += 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0 + (up ? '++' : '--') + ') {\n' + branch + '}\n';
            return code;
        };
        Blockly.Blocks.controls_for = {
            // For loop.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: Roboblocks2.URL_FOR,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendValueInput('VAR').appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH'));
                // .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendValueInput('FROM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_INPUT_FROM'));
                this.appendValueInput('TO').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_INPUT_TO'));
                this.appendStatementInput('DO').appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    return Roboblocks2.LANG_CONTROLS_FOR_TOOLTIP.replace('%1', thisBlock.getFieldValue('VAR'));
                });
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            onchange: function() {
                try {
                    if (this.isVariable(Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ATOMIC))) {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_FROM_WARNING'));
                    } else if (this.isVariable(Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ATOMIC))) {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_TO_WARNING'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}


                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //             this.removeInput('FROM');
                //             this.removeInput('TO');
                //             this.removeInput('DO');
                //             this.appendDummyInput('DUMMY')
                //                 .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH'))
                //                 .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //             this.appendValueInput('FROM')
                //                 .setCheck(Number)
                //                 .setAlign(Blockly.ALIGN_RIGHT)
                //                 .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_INPUT_FROM'));
                //             this.appendValueInput('TO')
                //                 .setCheck(Number)
                //                 .setAlign(Blockly.ALIGN_RIGHT)
                //                 .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_INPUT_TO'));
                //             this.appendStatementInput('DO')
                //                 .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO'));
                //         }catch(e){}
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                // try {
                //     if (!this.exists()) {
                //         this.setWarningText(Roboblocks2.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                //     } else {
                //         this.setWarningText(null);
                //     }
                // } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            // exists: function() {
            //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', Blockly.Variables.allVariables(), this.getFieldValue('VAR'));
            //     if (this.getFieldValue('VAR') === ' ') {
            //         return false;
            //     }
            //     for (var i in Blockly.Variables.allVariables()) {
            //         if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
            //             console.log('controls_for, variable!', this.getFieldValue('VAR'), Blockly.Variables.allVariables()[i]);
            //             return true;
            //         }
            //     }
            //     return false;
            // }
        };
        // Source: src/blocks/controls_if/controls_if.js
        /* global Blockly, JST,  Roboblocks2 */
        /* jshint sub:true */

        /**
         * controls_if code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.controls_if = function() {
            // If/elseif/else condition.
            var n = 0;
            var argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
            argument = argument.replace(/&quot;/g, '"');

            var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);

            var code = '';
            var a = Roboblocks2.findPinMode(argument);
            code += a['code'];
            argument = a['pin'];

            code += JST['controls_if']({
                'argument': argument,
                'branch': branch
            });


            for (n = 1; n <= this.elseifCount_; n++) {
                argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
                branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
                // branch=branch.replace(/&amp;/g, '');

                code += JST['controls_elseif']({
                    'argument': argument,
                    'branch': branch
                });
            }
            if (this.elseCount_) {
                branch = Blockly.Arduino.statementToCode(this, 'ELSE');
                // branch=branch.replace(/&amp;/g, '');

                code += JST['controls_else']({
                    'argument': argument,
                    'branch': branch
                });
            }
            branch = branch.replace(/&quot;/g, '"');
            code = code.replace(/&quot;/g, '"');

            return code + '\n';
        };

        /**
         * controls_if block definition
         * @type {Object}
         */
        Blockly.Blocks.controls_if = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: Roboblocks2.URL_IF,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendValueInput('IF0')
                    .setCheck(Boolean)
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
                this.appendStatementInput('DO0')
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                    'controls_if_else'
                ]));
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                        return Roboblocks2.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_1');
                    } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                        return Roboblocks2.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_2');
                    } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                        return Roboblocks2.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_3');
                    } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                        return Roboblocks2.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_4');
                    }
                    return '';
                });
                this.elseifCount_ = 0;
                this.elseCount_ = 0;
            },
            mutationToDom: function() {
                if (!this.elseifCount_ && !this.elseCount_) {
                    return null;
                }
                var container = document.createElement('mutation');
                if (this.elseifCount_) {
                    container.setAttribute('elseif', this.elseifCount_);
                }
                if (this.elseCount_) {
                    container.setAttribute('else', 1);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
                this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
                for (var x = 1; x <= this.elseifCount_; x++) {
                    this.appendValueInput('IF' + x)
                        .setCheck(Boolean)
                        .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_ELSEIF'));
                    this.appendStatementInput('DO' + x)
                        .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                }
                if (this.elseCount_) {
                    this.appendStatementInput('ELSE')
                        .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_ELSE'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                }
            },
            decompose: function(workspace) {
                var containerBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 1; x <= this.elseifCount_; x++) {
                    var elseifBlock = Blockly.Block.obtain(workspace, 'controls_if_elseif');
                    elseifBlock.initSvg();
                    connection.connect(elseifBlock.previousConnection);
                    connection = elseifBlock.nextConnection;
                }
                if (this.elseCount_) {
                    var elseBlock = Blockly.Block.obtain(workspace, 'controls_if_else');
                    elseBlock.initSvg();
                    connection.connect(elseBlock.previousConnection);
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect the else input blocks and remove the inputs.
                if (this.elseCount_) {
                    this.removeInput('ELSE');
                }
                this.elseCount_ = 0;
                // Disconnect all the elseif input blocks and remove the inputs.
                for (var x = this.elseifCount_; x > 0; x--) {
                    this.removeInput('IF' + x);
                    this.removeInput('DO' + x);
                }
                this.elseifCount_ = 0;
                // Rebuild the block's optional inputs.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_if_elseif':
                            this.elseifCount_++;
                            var ifInput = this.appendValueInput('IF' + this.elseifCount_)
                                .setCheck(Boolean)
                                .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_ELSEIF'));
                            var doInput = this.appendStatementInput('DO' + this.elseifCount_);
                            doInput.appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.valueConnection_) {
                                ifInput.connection.connect(clauseBlock.valueConnection_);
                            }
                            if (clauseBlock.statementConnection_) {
                                doInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        case 'controls_if_else':
                            this.elseCount_++;
                            var elseInput = this.appendStatementInput('ELSE');
                            elseInput.appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_ELSE'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.statementConnection_) {
                                elseInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection &&
                        clauseBlock.nextConnection.targetBlock();
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 1;
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_if_elseif':
                            var inputIf = this.getInput('IF' + x);
                            var inputDo = this.getInput('DO' + x);
                            clauseBlock.valueConnection_ =
                                inputIf && inputIf.connection.targetConnection;
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            x++;
                            break;
                        case 'controls_if_else':
                            inputDo = this.getInput('ELSE');
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection &&
                        clauseBlock.nextConnection.targetBlock();
                }
            }
        };

        Blockly.Blocks.controls_if_if = {
            // If condition.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_IF_Field_IF'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendStatementInput('STACK');
                this.setTooltip(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_IF_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_if_elseif = {
            // Else-If condition.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_ELSEIF_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_if_else = {
            // Else condition.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_ELSE_TOOLTIP'));
                this.contextMenu = false;
            }
        };



        // Source: src/blocks/controls_setupLoop/controls_setupLoop.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * controls_setup code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.controls_setupLoop = function() {
            // Add statements to setup.
            var branch = Blockly.Arduino.statementToCode(this, 'SETUP');
            branch = branch.replace(/&quot;/g, '"');

            Blockly.Arduino.setups_['X_SETUP'] = JST['controls_setupLoop']({
                'branch': branch
            });

            var content = Blockly.Arduino.statementToCode(this, 'LOOP');
            content = content.replace(/&quot;/g, '"');
            content = JST['controls_setupLoop']({
                'branch': content
            });
            return content;
        };
        Blockly.Blocks.controls_setupLoop = {
            // Setup statements.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            // helpUrl: Roboblocks2.URL_SETUP,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendStatementInput('SETUP').appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE'));
                this.appendStatementInput('LOOP').appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE'));
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_CONTROLS_SETUP_LOOP_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_switch/controls_switch.js
        /* global Blockly, Roboblocks2 */
        /* jshint sub:true */

        /**
         * controls_switch code generation
         * @return {String} Code generated with block parameters
         */
        var indentSentences = function(sentences) {
            var splitted_sentences = sentences.split('\n');
            var final_sentences = '';
            for (var i in splitted_sentences) {
                final_sentences += '  ' + splitted_sentences[i] + '\n';
            }
            return final_sentences;
        };

        Blockly.Arduino.controls_switch = function() {
            // switch condition.
            var n = 0;
            var argument = Blockly.Arduino.valueToCode(this, 'IF0',
                Blockly.Arduino.ORDER_NONE) || '';
            var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
            branch = indentSentences(branch);
            // branch=branch.replace(/&amp;/g, '');

            var code = '';
            var a = Roboblocks2.findPinMode(argument);
            code += a['code'];
            argument = a['pin'];

            code += 'switch (' + argument + ')\n{';
            for (n = 1; n <= this.switchCount_; n++) {
                argument = Blockly.Arduino.valueToCode(this, 'SWITCH' + n, Blockly.Arduino.ORDER_NONE) || '';
                branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
                branch = indentSentences(branch);
                branch = branch.substring(0, branch.length - 1);
                // branch=branch.replace(/&amp;/g, '');

                code += ' \n  case ' + argument + ': \n  {\n' + branch + '  break;\n  }';
            }
            if (this.defaultCount_) {
                branch = Blockly.Arduino.statementToCode(this, 'DEFAULT');
                branch = indentSentences(branch);
                branch = branch.substring(0, branch.length - 1);
                // branch=branch.replace(/&amp;/g, '');

                code += '  \n  default:\n  {\n' + branch + '}';
            }
            return code + '\n}\n';
        };


        Blockly.Blocks.controls_switch = {
            // switch condition.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: Roboblocks2.URL_SWITCH,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendValueInput('IF0')
                    .setCheck(Boolean)
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setMutator(new Blockly.Mutator(['controls_switch_case', 'controls_switch_default']));
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    if (!thisBlock.switchCount_ && !thisBlock.defaultCount_) {
                        return Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_1');
                    } else if (!thisBlock.switchCount_ && thisBlock.defaultCount_) {
                        return Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_2');
                    } else if (thisBlock.switchCount_ && !thisBlock.defaultCount_) {
                        return Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_3');
                    } else if (thisBlock.switchCount_ && thisBlock.defaultCount_) {
                        return Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP_4');
                    }
                    return '';
                });
                this.defaultCount_ = 0;
            },
            mutationToDom: function() {
                if (!this.switchCount_ && !this.defaultCount_) {
                    return null;
                }
                var container = document.createElement('mutation');
                if (this.switchCount_) {
                    container.setAttribute('case', this.switchCount_);
                }
                if (this.defaultCount_) {
                    container.setAttribute('default', 1);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.switchCount_ = window.parseInt(xmlElement.getAttribute('case'), 10);
                this.defaultCount_ = window.parseInt(xmlElement.getAttribute('default'), 10);
                for (var x = 1; x <= this.switchCount_; x++) {
                    this.appendValueInput('SWITCH' + x)
                        .setCheck(Number)
                        .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_CASE'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                    this.setInputsInline(true);
                    this.appendStatementInput('DO' + x)
                        .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                }
                if (this.defaultCount_) {
                    this.appendStatementInput('DEFAULT')
                        .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                        .setAlign(Blockly.ALIGN_RIGHT);
                }
            },
            decompose: function(workspace) {
                var containerBlock = Blockly.Block.obtain(workspace, 'controls_switch_switch');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 1; x <= this.switchCount_; x++) {
                    var switchBlock = Blockly.Block.obtain(workspace, 'controls_switch_case');
                    switchBlock.initSvg();
                    connection.connect(switchBlock.previousConnection);
                    connection = switchBlock.nextConnection;
                }
                if (this.defaultCount_) {
                    var defaultBlock = Blockly.Block.obtain(workspace, 'controls_switch_default');
                    defaultBlock.initSvg();
                    connection.connect(defaultBlock.previousConnection);
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect the switch blocks and remove the inputs.
                if (this.defaultCount_) {
                    this.removeInput('DEFAULT');
                }
                this.defaultCount_ = 0;
                // Disconnect all the switch input blocks and remove the inputs.
                for (var x = this.switchCount_; x > 0; x--) {
                    this.removeInput('SWITCH' + x);
                    this.removeInput('DO' + x);
                }
                this.switchCount_ = 0;
                // Rebuild the block's optional inputs.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_switch_case':
                            this.switchCount_++;
                            var case_lang;
                            if (this.switchCount_ === 1) {
                                case_lang = Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_IS');
                            } else {
                                case_lang = Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_CASE');
                            }
                            var switchInput = this.appendValueInput('SWITCH' + this.switchCount_)
                                .setCheck(Number)
                                .appendField(case_lang)
                                .setAlign(Blockly.ALIGN_RIGHT);
                            this.setInputsInline(true);

                            var doInput = this.appendStatementInput('DO' + this.switchCount_);
                            doInput.appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_DO'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.valueConnection_) {
                                switchInput.connection.connect(clauseBlock.valueConnection_);
                            }
                            if (clauseBlock.statementConnection_) {
                                doInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        case 'controls_switch_default':
                            this.defaultCount_++;
                            var defaultInput = this.appendStatementInput('DEFAULT');
                            defaultInput.appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.statementConnection_) {
                                defaultInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 1;
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_switch_case':
                            var inputSwitch = this.getInput('SWITCH' + x);
                            var inputDo = this.getInput('DO' + x);
                            clauseBlock.valueConnection_ =
                                inputSwitch && inputSwitch.connection.targetConnection;
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            x++;
                            break;
                        case 'controls_switch_default':
                            inputDo = this.getInput('DEFAULT');
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
            }
        };


        Blockly.Blocks.controls_switch_switch = {
            // If condition.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendStatementInput('STACK');
                this.setTooltip('Switch');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_switch_case = {
            // case condition.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_CASE'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip('Switch case');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_switch_default = {
            // default condition.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true);
                this.setTooltip('Switch default');
                this.contextMenu = false;
            }
        };
        // Source: src/blocks/controls_whileUntil/controls_whileUntil.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * controls_whileUntil code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.controls_whileUntil = function() {
            // Do while/until loop.
            var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', Blockly.Arduino.ORDER_NONE) || '';
            argument0 = argument0.replace(/&quot;/g, '"');
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');

            var code = '';
            var a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
                // branch = branch.substring(0, branch.length - 2);
            }
            // branch=branch.replace(/&amp;/g, '');

            if (this.getFieldValue('MODE') === 'UNTIL') {
                if (!argument0.match(/^\w+$/)) {
                    argument0 = '(' + argument0 + ')';
                }
                argument0 = '!' + argument0;
            }
            code += JST['controls_whileUntil']({
                'argument0': argument0,
                'branch': branch
            });
            return code;
        };
        Blockly.Blocks.controls_whileUntil = {
            // Do while/until loop.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_CONTROLS'),
            helpUrl: Roboblocks2.URL_WHILE,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_CONTROL);
                this.appendValueInput('BOOL').setCheck(Boolean).appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TITLE_REPEAT')).appendField(new Blockly.FieldDropdown([
                    [Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
                    [Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
                ]), 'MODE');
                this.appendStatementInput('DO').appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_INPUT_DO'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('MODE');
                    return Blockly.Blocks.controls_whileUntil.TOOLTIPS[op];
                });
            }
        };
        Blockly.Blocks.controls_whileUntil.TOOLTIPS = {
            WHILE: Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE'),
            UNTIL: Roboblocks2.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL')
        };
        // Source: src/blocks/inout_analog_read/inout_analog_read.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * inout_analog_read code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_analog_read = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';

            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['inout_analog_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_green_analog_read' + dropdown_pin] = JST['inout_analog_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['inout_analog_read']({
                'dropdown_pin': dropdown_pin,
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * inout_analog_read block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_analog_read = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: Roboblocks2.URL_PIN_FUNC,
            /**
             * inout_analog_read initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ADVANCED);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ'));
                this.setOutput(true, Number);
                this.setInputsInline(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_analog_write/inout_analog_write.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * inout_analog_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_analog_write = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            var b = Roboblocks2.findPinMode(value_num);
            code += b['code'];
            value_num = b['pin'];


            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['inout_analog_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'value_num': value_num
                });
            } else {
                Blockly.Arduino.setups_['setup_analog_write' + dropdown_pin] = JST['inout_analog_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'value_num': value_num
                });
            }

            code += JST['inout_analog_write']({
                'dropdown_pin': dropdown_pin,
                'value_num': value_num
            });
            return code;
        };
        /**
         * inout_analog_write block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_analog_write = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: Roboblocks2.URL_PIN_FUNC,
            /**
             * inout_analog_write initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ADVANCED);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE'));
                this.appendValueInput('NUM', Number).appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE')).setCheck(Number);
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_builtin_led/inout_builtin_led.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * inout_builtin_led code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.inout_builtin_led = function() {
            var dropdown_stat = this.getFieldValue('STAT');

            Blockly.Arduino.setups_['setup_green_led_13'] = JST['inout_builtin_led_setups']({});

            var code = JST['inout_builtin_led']({
                'dropdown_stat': dropdown_stat
            });

            return code;
        };

        /**
         * inout_builtin_led block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_builtin_led = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: Roboblocks2.URL_LED,
            /**
             * inout_builtin_led initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_BUILTIN_LED'))
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_BUILTIN_LED_STATE'))
                    .appendField(new Blockly.FieldDropdown([
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_BUILTIN_LED_ON') || 'ON', 'HIGH'],
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_BUILTIN_LED_OFF') || 'OFF', 'LOW']
                    ]), 'STAT');
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_BUILTIN_LED_TOOLTIP'));
            }
        };

        // Source: src/blocks/inout_digital_read/inout_digital_read.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * inout_digital_read code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_digital_read = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['inout_digital_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_green_digital_read' + dropdown_pin] = JST['inout_digital_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['inout_digital_read']({
                'dropdown_pin': dropdown_pin,
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * inout_digital_read block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_digital_read = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: Roboblocks2.URL_PIN_FUNC,
            /**
             * inout_digital_read initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ADVANCED);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ'));
                this.setOutput(true, Boolean);
                this.setInputsInline(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_digital_write/inout_digital_write.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * inout_digital_write code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_digital_write = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['inout_digital_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['inout_digital_write']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * inout_digital_write block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_digital_write = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: Roboblocks2.URL_PIN_FUNC,
            /**
             * inout_digital_write initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ADVANCED);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE')).appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN'));
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE')).appendField(new Blockly.FieldDropdown([
                    [Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_HIGH') || 'HIGH', 'HIGH'],
                    [Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_LOW') || 'LOW', 'LOW']
                ]), 'STAT');
                this.setPreviousStatement(true, null);
                this.setInputsInline(true);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_highlow/inout_highlow.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * inout_highlow code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.inout_highlow = function() {
            var bool_value = this.getFieldValue('BOOL');

            var code = JST['inout_highlow']({
                'bool_value': bool_value,
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * inout_highlow block definition
         * @type {Object}
         */
        Blockly.Blocks.inout_highlow = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: Roboblocks2.URL_PIN_FUNC,
            /**
             * inout_highlow initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('')
                    .appendField(new Blockly.FieldDropdown([
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_HIGHLOW_HIGH') || 'HIGH', 'HIGH'],
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_HIGHLOW_LOW') || 'LOW', 'LOW']
                    ]), 'BOOL');
                this.setOutput(true, Boolean);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_HIGHLOW_TOOLTIP'));
            }
        };

        // Source: src/blocks/lcd_clear/lcd_clear.js

        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * lcd_clear code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.lcd_clear = function() {
            var code = JST['lcd_clear']({});
            return code;
        };

        /**
         * lcd_clear block definition
         * @type {Object}
         */
        Blockly.Blocks.lcd_clear = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_LCD'),
            tags: ['lcd'],
            helpUrl: Roboblocks2.URL_LCD,
            /**
             * lcd_slave initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_LCD);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_LCD_CLEAR'));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));



                this.setInputsInline(false);

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_LCD_CLEAR_TOOLTIP'));
            }
        };

        // Source: src/blocks/lcd_def/lcd_def.js
        /* global Blockly, JST, options, Roboblocks2 */
        /* jshint sub:true */
        /**
         * lcd_def code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.lcd_def = function() {
            var lcd_pins = {};
            lcd_pins['lcd_1'] = this.getFieldValue('LCD_1');
            lcd_pins['lcd_2'] = this.getFieldValue('LCD_2');
            lcd_pins['lcd_3'] = this.getFieldValue('LCD_3');
            lcd_pins['lcd_4'] = this.getFieldValue('LCD_4');
            lcd_pins['lcd_5'] = this.getFieldValue('LCD_5');
            lcd_pins['lcd_6'] = this.getFieldValue('LCD_6');
            Blockly.Arduino.definitions_['define_lcd'] = JST['lcd_def_definitions']({});
            Blockly.Arduino.definitions_['declare_var_LCD'] = JST['lcd_def_declare'](lcd_pins);
            Blockly.Arduino.setups_['setup_lcd_'] = JST['lcd_def_setups']({});
            return '';
        };
        /**
         * lcd_def block definition
         * @type {Object}
         */
        Blockly.Blocks.lcd_def = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_LCD'),
            tags: ['lcd'],
            helpUrl: Roboblocks2.URL_LCD,
            /**
             * lcd_slave initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_LCD);
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_LCD_DEF')).appendField(new Blockly.FieldImage('img/blocks/lcd.png', 208 * options.zoom, 100 * options.zoom));
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_LCD_PINS'))
                    .appendField(new Blockly.FieldTextInput('11'), 'LCD_1')
                    .appendField(new Blockly.FieldTextInput('12'), 'LCD_2')
                    .appendField(new Blockly.FieldTextInput('3'), 'LCD_3')
                    .appendField(new Blockly.FieldTextInput('4'), 'LCD_4')
                    .appendField(new Blockly.FieldTextInput('5'), 'LCD_5')
                    .appendField(new Blockly.FieldTextInput('6'), 'LCD_6');
                this.setInputsInline(false);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_LCD_DEF_TOOLTIP'));
            }
        };

        // Source: src/blocks/lcd_print/lcd_print.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * lcd_print code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.lcd_print = function() {
            var val = Blockly.Arduino.valueToCode(this, 'VAL', Blockly.Arduino.ORDER_ATOMIC);
            var xcoor = Blockly.Arduino.valueToCode(this, 'XCOOR', Blockly.Arduino.ORDER_ATOMIC);
            var ycoor = Blockly.Arduino.valueToCode(this, 'YCOOR', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';

            var a = Roboblocks2.findPinMode(xcoor);
            code += a['code'];
            xcoor = a['pin'];

            a = Roboblocks2.findPinMode(ycoor);
            code += a['code'];
            ycoor = a['pin'];

            a = Roboblocks2.findPinMode(val);
            code += a['code'];
            val = a['pin'];

            if (this.getFieldValue('POS') === 'TRUE') {
                code += JST['lcd_print_pos']({
                    'val': val,
                    'xcoor': xcoor,
                    'ycoor': ycoor
                });
            } else {
                code += JST['lcd_print']({
                    'val': val
                });
            }
            code = code.replace(/&quot;/g, '"');
            return code;
        };
        /**
         * lcd_print block definition
         * @type {Object}
         */
        Blockly.Blocks.lcd_print = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_LCD'),
            tags: ['lcd'],
            helpUrl: Roboblocks2.URL_LCD,
            /**
             * lcd_slave initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_LCD);
                this.appendValueInput('VAL').appendField(Roboblocks2.locales.getKey('LANG_LCD_PRINT'));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_LCD_PRINT_POSITION')).appendField(new Blockly.FieldCheckbox('TRUE'), 'POS').setAlign(Blockly.ALIGN_RIGHT);
                this.last_pos = this.getFieldValue('POS');
                this.getPosition();
                this.setInputsInline(false);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_LCD_PRINT_TOOLTIP'));
            },
            getPosition: function() {
                try {
                    this.removeInput('XCOOR');
                    this.removeInput('YCOOR');
                } catch (e) {}
                if (this.getFieldValue('POS') === 'TRUE') {
                    this.appendValueInput('XCOOR').appendField('row').setAlign(Blockly.ALIGN_RIGHT);
                    this.appendValueInput('YCOOR').appendField('column').setAlign(Blockly.ALIGN_RIGHT);
                }
            },
            onchange: function() {
                if (this.getFieldValue('POS') !== this.last_pos) {
                    this.getPosition();
                    this.last_pos = this.getFieldValue('POS');
                }
            },
            mutationToDom: function() {
                var container = document.createElement('mutation');
                if (this.getFieldValue('POS') === 'TRUE') {
                    container.setAttribute('fixed', true);
                } else if (this.getFieldValue('POS') === 'FALSE') {
                    container.setAttribute('fixed', false);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.setFieldValue(xmlElement.getAttribute('fixed'), 'POS');
                if (this.getFieldValue('POS') === 'TRUE') {
                    this.appendValueInput('XCOOR').appendField('row').setAlign(Blockly.ALIGN_RIGHT);
                    this.appendValueInput('YCOOR').appendField('column').setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        };
        // Source: src/blocks/lcd_setBacklight/lcd_setBacklight.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * lcd_setBacklight code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.lcd_setBacklight = function() {
            var state = this.getFieldValue('STATE');
            var code = JST['lcd_setBacklight']({
                'state': state
            });
            return code;
        };

        /**
         * lcd_setBacklight block definition
         * @type {Object}
         */
        Blockly.Blocks.lcd_setBacklight = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_LCD'),
            helpUrl: Roboblocks2.URL_LCD,
            tags: ['lcd'],
            /**
             * lcd_slave initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_LCD);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_LCD_SETBACKLIGHT'))
                    .appendField(new Blockly.FieldDropdown([
                        ['LOW', 'LOW'],
                        ['HIGH', 'HIGH']
                    ]), 'STATE')
                    .appendField(Roboblocks2.locales.getKey('LANG_LCD_SETBACKLIGHT_CLOSE'));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 208 * options.zoom, 100 * options.zoom));


                this.setInputsInline(false);

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_LCD_SETBACKLIGHT_TOOLTIP'));
            }
        };

        // Source: src/blocks/logic_boolean/logic_boolean.js
        /* global Blockly, Roboblocks2 */

        /**
         * logic_boolean code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.logic_boolean = function() {
            // Boolean values true and false.
            var code = (this.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.logic_boolean = {
            // Boolean data type: true and false.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: Roboblocks2.URL_LOGIC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldDropdown([
                        [Roboblocks2.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE'), 'TRUE'],
                        [Roboblocks2.locales.getKey('LANG_LOGIC_BOOLEAN_FALSE'), 'FALSE']
                    ]), 'BOOL');
                this.setTooltip(Roboblocks2.locales.getKey('LANG_LOGIC_BOOLEAN_TOOLTIP'));
            }
        };
        // Source: src/blocks/logic_compare/logic_compare.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * logic_compare code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.logic_compare = function() {
            // Comparison operator.
            var mode = this.getFieldValue('OP');
            var operator = Blockly.Arduino.logic_compare.OPERATORS[mode];
            var order = (operator === '==' || operator === '!=') ?
                Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';

            var code = '';

            var a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = Roboblocks2.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

            code += JST['logic_compare']({
                'argument0': argument0,
                'argument1': argument1,
                'operator': operator
            });

            return [code, order];
        };

        Blockly.Arduino.logic_compare.OPERATORS = {
            EQ: '==',
            NEQ: '!=',
            LT: '<',
            LTE: '<=',
            GT: '>',
            GTE: '>='
        };


        Blockly.Blocks.logic_compare = {
            // Comparison operator.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: Roboblocks2.URL_LOGIC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('A');
                this.appendValueInput('B')
                    .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.logic_compare.TOOLTIPS[op];
                });
            }
        };

        Blockly.Blocks.logic_compare.OPERATORS = [
            ['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['<', 'LT'],
            ['\u2264', 'LTE'],
            ['>', 'GT'],
            ['\u2265', 'GTE']
        ];

        Blockly.Blocks.logic_compare.TOOLTIPS = {
            EQ: Roboblocks2.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_EQ'),
            NEQ: Roboblocks2.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_NEQ'),
            LT: Roboblocks2.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_LT'),
            LTE: Roboblocks2.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_LTE'),
            GT: Roboblocks2.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_GT'),
            GTE: Roboblocks2.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_GTE')
        };

        // Source: src/blocks/logic_negate/logic_negate.js
        /* global Blockly, JST, Roboblocks2 */

        /**
         * logic_negate code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.logic_negate = function() {
            // Negation.
            var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
            var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', order) || 'false';
            var code = '';
            var a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += JST['logic_negate']({
                'argument0': argument0
            });

            //'!' + argument0;
            return [code, order];
        };


        Blockly.Blocks.logic_negate = {
            // Negation.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: Roboblocks2.URL_LOGIC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('BOOL')
                    .setCheck(Boolean)
                    .appendField(Roboblocks2.locales.getKey('LANG_LOGIC_NEGATE_INPUT_NOT'));
                this.setTooltip(Roboblocks2.locales.getKey('LANG_LOGIC_NEGATE_TOOLTIP'));
            }
        };

        // Source: src/blocks/logic_operation/logic_operation.js
        /* global Blockly, Roboblocks2 */
        /**
         * logic_operation code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.logic_operation = function() {
            // Operations 'and', 'or'.
            var operator = (this.getFieldValue('OP') === 'AND') ? '&&' : '||';
            var order = (operator === '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND : Blockly.Arduino.ORDER_LOGICAL_OR;
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
            // var code = JST['logic_operation']({
            //     'operator': operator,
            //     'argument0': argument0,
            //     'argument1': argument1
            // });
            var code = '';
            var a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];
            a = Roboblocks2.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

            code += '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';
            return [code, order];
        };
        Blockly.Blocks.logic_operation = {
            // Logical operations: 'and', 'or'.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: Roboblocks2.URL_LOGIC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('A').setCheck(Boolean);
                this.appendValueInput('B').setCheck(Boolean).appendField(new Blockly.FieldDropdown([
                    [Roboblocks2.locales.getKey('LANG_LOGIC_OPERATION_AND') || 'AND', 'AND'],
                    [Roboblocks2.locales.getKey('LANG_LOGIC_OPERATION_OR') || 'OR', 'OR']
                ]), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.logic_operation.TOOLTIPS[op];
                });
            }
        };
        Blockly.Blocks.logic_operation.TOOLTIPS = {
            AND: Roboblocks2.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_AND'),
            OR: Roboblocks2.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_OR')
        };
        // Source: src/blocks/math_arithmetic/math_arithmetic.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * math_arithmetic code generation
         * @return {String} Code generated with block parameters
         */


        Blockly.Arduino.math_arithmetic = function() {
            // Basic arithmetic operators, and power.
            var mode = this.getFieldValue('OP');
            var tuple = Blockly.Arduino.math_arithmetic.OPERATORS[mode];
            var operator = tuple[0];
            var order = tuple[1];
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
            var code = '';
            var a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = Roboblocks2.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];
            if (!operator) {
                code = JST['math_arithmetic_pow']({
                    'argument0': argument0,
                    'argument1': argument1
                });
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }
            code += JST['math_arithmetic']({
                'argument0': argument0,
                'argument1': argument1,
                'operator': operator
            });
            return [code, order];
        };

        Blockly.Arduino.math_arithmetic.OPERATORS = {
            ADD: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
            MINUS: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
            MULTIPLY: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
            DIVIDE: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
            POWER: [null, Blockly.Arduino.ORDER_NONE]
        };




        Blockly.Blocks.math_arithmetic = {
            // Basic arithmetic operator.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: Roboblocks2.URL_MATH,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_MATH);
                this.setOutput(true, Number);
                this.appendValueInput('A')
                    .setCheck(Number);
                this.appendValueInput('B')
                    .setCheck(Number)
                    .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var mode = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.math_arithmetic.TOOLTIPS[mode];
                });
            }
        };

        Blockly.Blocks.math_arithmetic.OPERATORS = [
            ['+', 'ADD'],
            ['-', 'MINUS'],
            ['\u00D7', 'MULTIPLY'],
            ['\u00F7', 'DIVIDE'],
            ['^', 'POWER']
        ];

        Blockly.Blocks.math_arithmetic.TOOLTIPS = {
            ADD: Roboblocks2.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_ADD'),
            MINUS: Roboblocks2.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_MINUS'),
            MULTIPLY: Roboblocks2.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY'),
            DIVIDE: Roboblocks2.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE'),
            POWER: Roboblocks2.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_POWER')
        };

        // Source: src/blocks/math_array/math_array.js
        /* global Blockly, Roboblocks2 */
        /* jshint sub:true */

        /**
         * math_array code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_array = function() {
            // Numeric value.
            var code = '{';
            code += window.parseFloat(this.getFieldValue('NUM0'));
            code += ',';
            code += window.parseFloat(this.getFieldValue('NUM1'));
            code += ',';
            code += window.parseFloat(this.getFieldValue('NUM2'));
            code += '}';

            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            // var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.math_array = {
            // Numeric value.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_MATH,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_MATH);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ARRAY_ARRAY3'))
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ARRAY_BRACKET3'))
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM0')
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ARRAY_COMMA'));


                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM1')
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ARRAY_COMMA'));

                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_array.validator), 'NUM2')
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_ARRAY_BRACKET4'));

                this.setOutput(true, Number);
                this.setInputsInline(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_MATH_ARRAY_TOOLTIP'));
            }
        };


        Blockly.Blocks.math_array.validator = function(text) {
            // Ensure that only a number may be entered.
            // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
            var n = window.parseFloat(text || 0);
            return window.isNaN(n) ? null : String(n);
        };
        // Source: src/blocks/math_modulo/math_modulo.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * math_modulo code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_modulo = function() {
            // Remainder computation.
            var argument0 = Blockly.Arduino.valueToCode(this, 'DIVIDEND',
                Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'DIVISOR',
                Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
            var code = '';
            var a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];
            a = Roboblocks2.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];
            code += JST['math_modulo']({
                'argument0': argument0,
                'argument1': argument1
            });

            //argument0 + ' % ' + argument1;
            return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
        };

        Blockly.Blocks.math_modulo = {
            // Remainder of a division.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: Roboblocks2.URL_MATH,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_MATH);
                this.setOutput(true, Number);
                this.appendValueInput('DIVIDEND')
                    .setCheck(Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_MATH_MODULO_INPUT_DIVIDEND'));
                this.appendValueInput('DIVISOR')
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('%');
                this.setInputsInline(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_MATH_MODULO_TOOLTIP'));
            }
        };

        // Source: src/blocks/math_number/math_number.js
        /* global Blockly, Roboblocks2 */
        /* jshint sub:true */

        /**
         * math_number code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_number = function() {
            // Numeric value.
            var code = window.parseFloat(this.getFieldValue('NUM'));
            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, order];
        };

        Blockly.Blocks.math_number = {
            // Numeric value.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_MATH,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_MATH);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM');
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_MATH_NUMBER_TOOLTIP'));
            }
        };

        Blockly.Blocks.math_number.validator = function(text) {
            // Ensure that only a number may be entered.
            // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
            var n = window.parseFloat(text || 0);
            return window.isNaN(n) ? null : String(n);
        };

        // Source: src/blocks/math_random/math_random.js
        /* global Blockly, JST, Roboblocks2 */

        /**
         * math_random code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.math_random = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];

            a = Roboblocks2.findPinMode(value_dmax);
            code += a['code'];
            value_dmax = a['pin'];

            code += JST['math_random']({
                'value_num': value_num,
                'value_dmax': value_dmax
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.math_random = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: Roboblocks2.URL_MATH,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_MATH);
                this.appendValueInput('NUM', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_MATH_RANDOM'))
                    .setCheck(Number);
                this.appendValueInput('DMAX', Number)
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_MATH_RANDOM_AND'))
                    .setCheck(Number);
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_MATH_RANDOM_TOOLTIP'));
            }
        };

        // Source: src/blocks/math_single/math_single.js
        /* global Blockly, Roboblocks2 */
        /* jshint sub:true */

        /**
         * math_single code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.math_single = function() {
            // Math operators with single operand.
            var operator = this.getFieldValue('OP');
            var arg;
            var code = '';
            var a;

            if (operator === 'NEG') {
                // Negation is a special case given its different operator precedents.
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_UNARY_PREFIX) || '';
                a = Roboblocks2.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
                if (arg[0] === '-') {
                    // --3 is not legal in Dart.
                    arg = ' ' + arg;
                }
                code += '-' + arg;
                return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
            } else if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
                a = Roboblocks2.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
            } else if (operator === 'LOG10') {
                code = '';
            } else {
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
                a = Roboblocks2.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
            }
            var PI = 3.14159;
            // First, handle cases which generate values that don't need parentheses.
            switch (operator) {
                case 'ABS':
                    code += 'abs(' + arg + ')';
                    break;
                case 'ROOT':
                    code += 'sqrt(' + arg + ')';
                    break;
                case 'LN':
                    code += 'log(' + arg + ')';
                    break;
                case 'EXP':
                    code += 'exp(' + arg + ')';
                    break;
                case 'POW10':
                    code += 'pow(10,' + arg + ')';
                    break;
                case 'SIN':
                    code += 'sin(' + arg + ' / 180 * ' + PI + ')';
                    break;
                case 'COS':
                    code += 'cos(' + arg + ' / 180 * ' + PI + ')';
                    break;
                case 'TAN':
                    code += 'tan(' + arg + ' / 180 * ' + PI + ')';
                    break;
            }
            if (code) {
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }

            // Second, handle cases which generate values that may need parentheses.
            switch (operator) {
                case 'LOG10':
                    arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
                    a = Roboblocks2.findPinMode(arg);
                    code += a['code'];
                    arg = a['pin'];
                    code += 'log(' + arg + ') / log(10)';
                    break;
                case 'ASIN':
                    code += 'asin(' + arg + ') / ' + PI + ' * 180';
                    break;
                case 'ACOS':
                    code += 'acos(' + arg + ') / ' + PI + ' * 180';
                    break;
                case 'ATAN':
                    code += 'atan(' + arg + ') / ' + PI + ' * 180';
                    break;
                default:
                    throw 'Unknown math operator: ' + operator;
            }
            return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
        };


        Blockly.Blocks.math_single = {
            // Advanced math operators with single operand.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: Roboblocks2.URL_MATH,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_MATH);
                this.setOutput(true, Number);
                this.appendValueInput('NUM')
                    .setCheck(Number)
                    .appendField(new Blockly.FieldDropdown([
                        [Roboblocks2.locales.getKey('LANG_MATH_SINGLE_OP_ROOT') || 'SQR ROOT', 'ROOT'],
                        [Roboblocks2.locales.getKey('LANG_MATH_SINGLE_OP_ABSOLUTE') || 'ABS', 'ABS'],
                        ['-', 'NEG'],
                        ['ln', 'LN'],
                        ['log10', 'LOG10'],
                        ['e^', 'EXP'],
                        ['10^', 'POW10']
                    ]), 'OP');
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var mode = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.math_single.TOOLTIPS[mode];
                });
            }
        };

        Blockly.Blocks.math_single.TOOLTIPS = {
            ROOT: Roboblocks2.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_ROOT'),
            ABS: Roboblocks2.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_ABS'),
            NEG: Roboblocks2.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_NEG'),
            LN: Roboblocks2.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_LN'),
            LOG10: Roboblocks2.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_LOG10'),
            EXP: Roboblocks2.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_EXP'),
            POW10: Roboblocks2.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_POW10')
        };

        // Source: src/blocks/pin_analog/pin_analog.js
        /* global Blockly, profiles, Roboblocks2 */

        /**
         * pin code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.pin_analog = function() {
            var pin = this.getFieldValue('PIN') || '';
            return [pin, Blockly.Arduino.ORDER_NONE];
        };

        Blockly.Blocks.pin_analog = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: Roboblocks2.URL_PIN_FUNC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_PIN_ANALOG'))
                    .appendField(new Blockly.FieldDropdown(profiles.default.analog), 'PIN');

                this.setInputsInline(true);
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
            }
        };

        // Source: src/blocks/pin_digital/pin_digital.js
        /* global Blockly, profiles, Roboblocks2 */

        /**
         * pin code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.pin_digital = function() {
            var pin = this.getFieldValue('PIN') || '';
            return [pin, Blockly.Arduino.ORDER_NONE];
        };

        Blockly.Blocks.pin_digital = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ADVANCED'),
            helpUrl: Roboblocks2.URL_PIN_FUNC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_PIN_DIGITAL'))
                    .appendField(new Blockly.FieldDropdown(profiles.default.digital), 'PIN');

                this.setInputsInline(true);
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                if (this.getFieldValue('PIN') === '0') {
                    try {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_VARIABLES_PIN_DIGITAL0'));
                    } catch (e) {}
                } else {
                    try {
                        this.setWarningText(null);
                    } catch (e) {}
                }
            }
        };

        // Source: src/blocks/procedures_callnoreturn/procedures_callnoreturn.js
        /* global Blockly, JST, Roboblocks2 */
        /**
         * procedures_callnoreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_callnoreturn = function() {
            // Call a procedure with a return value.
            var funcName = this.getFieldValue('PROCEDURES');
            var args = [];
            var code = '';
            var a;
            try {
                for (var x = 0; x < this.getVariables(funcName).length; x++) {
                    args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || '';
                    a = Roboblocks2.findPinMode(args[x]);
                    code += a['code'];
                    args[x] = a['pin'];
                }
            } catch (e) {}
            var funcArgs = args.join(', ');
            code += JST['procedures_callnoreturn']({
                'funcName': funcName,
                'funcArgs': funcArgs
            });
            return code;
        };
        Blockly.Blocks.procedures_callnoreturn = {
            // Variable getter.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_PROC_NO_RET,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_PROCEDURES_CALLNORETURN_TOOLTIP'));
                this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                this.quarkConnections_ = null;
                this.quarkArguments_ = null;
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                }
                return name;
            },
            getProcedures: function() {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                if (procedures[0].length > 0) {
                    for (var i in procedures[0]) {
                        var proc_name = procedures[0][i][0];
                        proc_name = this.validName(proc_name);
                        procedures_dropdown.push([proc_name, proc_name]);
                    }
                } else {
                    procedures_dropdown.push([Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE')]);
                }
                return procedures_dropdown;
            },
            maxVariableNumber: function() {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                var max_num = 0;
                if (procedures[0].length > 0 || procedures[1].length > 0) {
                    for (var i in procedures[0]) {
                        if (procedures[0][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
                            max_num = procedures[0][i][1].length;
                        }
                    }
                    return max_num;
                } else {
                    procedures_dropdown.push(['', '']);
                }
            },
            getVariables: function(funcName) {
                try {
                    var procedures = Blockly.Procedures.allProcedures();
                    var procedures_dropdown = [];
                    if (procedures[0].length > 0) {
                        for (var i in procedures[0]) {
                            if (procedures[0][i][0] === funcName) {
                                return procedures[0][i][1];
                            }
                        }
                    } else {
                        procedures_dropdown.push(['', '']);
                    }
                } catch (e) {}
            },
            exists: function() {
                var procedures = Blockly.Procedures.allProcedures();
                if (procedures[0].length > 0) {
                    for (var i in procedures[0]) {
                        if (procedures[0][i][0] === this.getFieldValue('PROCEDURES')) {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
                    this.changeVariables();
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                } else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
                    this.addVariables();
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                }
                if (!this.exists()) {
                    try {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
                    } catch (e) {}
                } else {
                    try {
                        this.setWarningText(null);
                    } catch (e) {}
                }
            },
            addVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                var var_num = 0;
                if (func_variables) {
                    if (!this.last_variables) {
                        this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    }
                    if (func_variables.length >= this.last_variables.length) {
                        var_num = func_variables.length;
                    } else if (this.last_variables) {
                        try {
                            var_num = this.last_variables.length;
                        } catch (e) {}
                    }
                    for (var x = 0; x < var_num; x++) {
                        if (this.getInput('ARG' + x) === null) {
                            this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                        } else {
                            if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
                                this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
                            } else {
                                this.removeInput('ARG' + x);
                            }
                        }
                    }
                    this.arguments_ = func_variables;
                }
            },
            renameProcedure: function(oldName, newName) {
                if (this.last_procedure) {
                    var procedures = this.getProcedures();
                    for (var i in procedures) {
                        if (Blockly.Names.equals(oldName, procedures[i][0])) {
                            this.removeInput('DUMMY');
                            this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                        }
                    }
                    if (this.last_procedure === oldName) {
                        this.last_procedure = newName;
                    }
                    try {
                        this.setFieldValue(this.last_procedure, 'PROCEDURES');
                    } catch (e) {}
                }
            },
            changeVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
                for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
                    if (this.getInput('ARG' + i) === null) {
                        break;
                    }
                    this.removeInput('ARG' + i);
                }
                for (var variable in func_variables) {
                    this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT);
                }
                this.arguments_ = func_variables;
            },
            mutationToDom: function() {
                // Save the name and arguments (none of which are editable).
                var container = document.createElement('mutation');
                container.setAttribute('name', this.getFieldValue('PROCEDURES'));
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                }
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = [];
                }
                for (var x = 0; x < this.arguments_.length; x++) {
                    var parameter = document.createElement('arg');
                    parameter.setAttribute('name', this.arguments_[x]);
                    container.appendChild(parameter);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.xmlElement = xmlElement;
                // Restore the name and parameters.
                var name = xmlElement.getAttribute('name');
                this.last_procedure = name;
                this.setFieldValue(name, 'PROCEDURES');
                for (var x = 0; x < xmlElement.childNodes.length; x++) {
                    this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        };
        // Source: src/blocks/procedures_callreturn/procedures_callreturn.js
        /* global Blockly, JST, Roboblocks2 */
        /**
         * procedures_callreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_callreturn = function() {
            // Call a procedure with a return value.
            var funcName = this.getFieldValue('PROCEDURES');
            var args = [];
            var a;
            var code = '';
            for (var x = 0; x < this.getVariables(funcName).length; x++) {
                args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || 'null';

                a = Roboblocks2.findPinMode(args[x]);
                code += a['code'];
                args[x] = a['pin'];
            }
            var funcArgs = args.join(', ');
            code += JST['procedures_callreturn']({
                'funcName': funcName,
                'funcArgs': funcArgs
            });
            //funcName + '(' + args.join(', ') + ')';
            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        };
        Blockly.Blocks.procedures_callreturn = {
            // Variable getter.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_PROC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_PROCEDURES_CALLRETURN_TOOLTIP'));
                this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                this.quarkConnections_ = null;
                this.quarkArguments_ = null;
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText(Roboblocks2.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            getProcedures: function() {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        var proc_name = procedures[1][i][0];
                        proc_name = this.validName(proc_name);
                        procedures_dropdown.push([proc_name, proc_name]);
                    }
                } else {
                    procedures_dropdown.push([Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE')]);
                }
                return procedures_dropdown;
            },
            maxVariableNumber: function() {
                var procedures = Blockly.Procedures.allProcedures();
                var procedures_dropdown = [];
                var max_num = 0;
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        if (procedures[1][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
                            max_num = procedures[1][i][1].length;
                        }
                    }
                    return max_num;
                } else {
                    procedures_dropdown.push(['', '']);
                }
            },
            getVariables: function(funcName) {
                try {
                    var procedures = Blockly.Procedures.allProcedures();
                    var procedures_dropdown = [];
                    if (procedures[1].length > 0) {
                        for (var i in procedures[1]) {
                            if (procedures[1][i][0] === funcName) {
                                return procedures[1][i][1];
                            }
                        }
                    } else {
                        procedures_dropdown.push(['', '']);
                    }
                } catch (e) {}
            },
            exists: function() {
                var procedures = Blockly.Procedures.allProcedures();
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        if (procedures[1][i][0] === this.getFieldValue('PROCEDURES')) {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
                    this.changeVariables();
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                } else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
                    this.addVariables();
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                }
                if (!this.exists()) {
                    try {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
                    } catch (e) {}
                } else {
                    try {
                        this.setWarningText(null);
                    } catch (e) {}
                }
            },
            addVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                var var_num = 0;
                if (func_variables) {
                    if (!this.last_variables) {
                        this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    }
                    if (func_variables.length >= this.last_variables.length) {
                        var_num = func_variables.length;
                    } else if (this.last_variables) {
                        try {
                            var_num = this.last_variables.length;
                        } catch (e) {}
                    }
                    for (var x = 0; x < var_num; x++) {
                        if (this.getInput('ARG' + x) === null) {
                            this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                        } else {
                            if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
                                this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
                            } else {
                                this.removeInput('ARG' + x);
                            }
                        }
                    }
                    this.arguments_ = func_variables;
                }
            },
            renameProcedure: function(oldName, newName) {
                if (this.last_procedure) {
                    var procedures = this.getProcedures();
                    for (var i in procedures) {
                        if (Blockly.Names.equals(oldName, procedures[i][0])) {
                            this.removeInput('DUMMY');
                            this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                        }
                    }
                    if (this.last_procedure === oldName) {
                        this.last_procedure = newName;
                    }
                    try {
                        this.setFieldValue(this.last_procedure, 'PROCEDURES');
                    } catch (e) {}
                }
            },
            changeVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
                for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
                    if (this.getInput('ARG' + i) === null) {
                        break;
                    }
                    this.removeInput('ARG' + i);
                }
                for (var variable in func_variables) {
                    this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT);
                }
                this.arguments_ = func_variables;
            },
            mutationToDom: function() {
                // Save the name and arguments (none of which are editable).
                var container = document.createElement('mutation');
                container.setAttribute('name', this.getFieldValue('PROCEDURES'));
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                }
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = [];
                }
                for (var x = 0; x < this.arguments_.length; x++) {
                    var parameter = document.createElement('arg');
                    parameter.setAttribute('name', this.arguments_[x]);
                    container.appendChild(parameter);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.xmlElement = xmlElement;
                // Restore the name and parameters.
                var name = xmlElement.getAttribute('name');
                this.last_procedure = name;
                this.setFieldValue(name, 'PROCEDURES');
                for (var x = 0; x < xmlElement.childNodes.length; x++) {
                    this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        };
        // Source: src/blocks/procedures_defnoreturn/procedures_defnoreturn.js
        /* global Blockly, JST, Roboblocks2 */
        /**
         * procedures_defnoreturn code generation
         * @return {String} Code generated with block parameters
         */
        // Defining a procedure without a return value uses the same generator as
        // a procedure with a return value.
        Blockly.Arduino.procedures_defnoreturn = function() {
            // Define a procedure with a return value.
            var funcName = this.getFieldValue('NAME');
            var branch = Blockly.Arduino.statementToCode(this, 'STACK');
            branch = branch.replace(/&quot;/g, '"');
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }
            // branch=branch.replace(/&amp;/g, '');

            var returnType = 'void';
            var args = this.paramString;
            var code = JST['procedures_defnoreturn']({
                'returnType': returnType,
                'funcName': funcName,
                'args': args,
                'branch': branch
            });
            // code=code.replace(/&amp;/g, '');

            code = Blockly.Arduino.scrub_(this, code);
            Blockly.Arduino.definitions_[funcName] = code;
            return null;
        };
        Blockly.Blocks.procedures_defnoreturn = {
            // Define a procedure with no return value.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_PROCEDURES'),
            helpUrl: Roboblocks2.URL_PROC_NO_RET,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_PROCEDURES);
                var name = Blockly.Procedures.findLegalName(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), this);
                this.appendDummyInput().appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME').appendField('', 'PARAMS');
                // this.appendDummyInput().appendField(new Blockly.FieldTextInput(name), 'NAME').appendField('', 'PARAMS');
                this.appendStatementInput('STACK').appendField(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFNORETURN_DO'));
                this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
                this.setTooltip(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFNORETURN_TOOLTIP'));
                this.arguments_ = [];
                this.type_arguments_ = [];
            },
            updateParams_: function() {
                // Check for duplicated arguments.
                var badArg = false;
                var hash = {};
                for (var x = 0; x < this.arguments_.length; x++) {
                    if (hash['arg_' + this.arguments_[x].toLowerCase()]) {
                        badArg = true;
                        break;
                    }
                    hash['arg_' + this.arguments_[x].toLowerCase()] = true;
                }
                if (badArg) {
                    try {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEF_DUPLICATE_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                } else {
                    this.setWarningText(null);
                }
                // Merge the arguments into a human-readable list.
                var params = [];
                for (var i in this.arguments_) {
                    params.push(this.type_arguments_[i] + ' ' + this.arguments_[i]);
                }
                this.paramString = params.join(', ');
                this.setFieldValue(this.paramString, 'PARAMS');
            },
            mutationToDom: function() {
                var container = document.createElement('mutation');
                for (var x = 0; x < this.arguments_.length; x++) {
                    var parameter = document.createElement('arg_name');
                    parameter.setAttribute('name', this.arguments_[x]);
                    container.appendChild(parameter);
                    parameter = document.createElement('arg_type');
                    parameter.setAttribute('name', this.type_arguments_[x]);
                    container.appendChild(parameter);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.arguments_ = [];
                this.type_arguments_ = [];
                var childNode;
                for (var x = 0; x < xmlElement.childNodes.length; x++) {
                    childNode = xmlElement.childNodes[x];
                    if (childNode.nodeName.toLowerCase() === 'arg_name') {
                        this.arguments_.push(childNode.getAttribute('name'));
                    }
                    if (childNode.nodeName.toLowerCase() === 'arg_type') {
                        this.type_arguments_.push(childNode.getAttribute('name'));
                    }
                }
                this.updateParams_();
            },
            decompose: function(workspace) {
                var containerBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorcontainer');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 0; x < this.arguments_.length; x++) {
                    var paramBlock = Blockly.Block.obtain(workspace, 'procedures_mutatorarg');
                    paramBlock.initSvg();
                    paramBlock.setFieldValue(this.type_arguments_[x], 'TYPE');
                    paramBlock.setFieldValue(this.arguments_[x], 'NAME');
                    // Store the old location.
                    paramBlock.oldLocation = x;
                    connection.connect(paramBlock.previousConnection);
                    connection = paramBlock.nextConnection;
                }
                // Initialize procedure's callers with blank IDs.
                Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, null);
                Blockly.Procedures.mutateCallers(this.getFieldValue('TYPE'), this.workspace, this.type_arguments_, null);
                return containerBlock;
            },
            compose: function(containerBlock) {
                this.arguments_ = [];
                this.paramIds_ = [];
                this.type_arguments_ = [];
                var paramBlock = containerBlock.getInputTargetBlock('STACK');
                var varName;
                while (paramBlock) {
                    varName = paramBlock.getFieldValue('NAME');
                    this.type_arguments_.push(paramBlock.getFieldValue('TYPE'));
                    this.arguments_.push(varName);
                    this.paramIds_.push(paramBlock.id);
                    paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock();
                }
                this.updateParams_();
                Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, this.paramIds_);
            },
            dispose: function() {
                var name = this.getFieldValue('NAME');
                var editable = this.editable;
                var workspace = this.workspace;
                // Call parent's destructor.
                Blockly.Block.prototype.dispose.apply(this, arguments);
                if (editable) {
                    // Dispose of any callers.
                    Blockly.Procedures.disposeCallers(name, workspace);
                }
            },
            getProcedureDef: function() {
                // Return the name of the defined procedure,
                // a list of all its arguments,
                // and that it DOES NOT have a return value.
                return [this.getFieldValue('NAME'), this.arguments_, false];
            },
            getVars: function() {
                return this.arguments_;
            },
            renameVar: function(oldName, newName) {
                var change = false;
                for (var x = 0; x < this.arguments_.length; x++) {
                    if (Blockly.Names.equals(oldName, this.arguments_[x])) {
                        newName = this.validName(newName);
                        this.arguments_[x] = newName;
                        change = true;
                    }
                }
                if (change) {
                    this.updateParams_();
                    // Update the mutator's variables if the mutator is open.
                    if (this.mutator.isVisible_()) {
                        var blocks = this.mutator.workspace_.getAllBlocks();
                        var block;
                        for (x = 0; blocks.length; x++) {
                            block = blocks[x];
                            if (block.type === 'procedures_mutatorarg' && Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
                                block.setFieldValue(newName, 'NAME');
                            }
                        }
                    }
                }
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        this.reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === this.reserved_words[j]) {
                            this.setWarningText(Roboblocks2.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            onchange: function() {
                if (this.last_procedure !== this.getFieldValue('NAME')) {
                    var name = this.getFieldValue('NAME');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'NAME');
                    } catch (e) {}
                    this.last_procedure = name;
                }
            }
        };
        Blockly.Blocks.procedures_mutatorcontainer = {
            // Procedure container (for mutator dialog).
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_PROCEDURES_MUTATORCONTAINER_Field'));
                this.appendStatementInput('STACK');
                this.setTooltip('');
                this.contextMenu = false;
            }
        };
        Blockly.Blocks.procedures_mutatorarg = {
            // Procedure argument (for mutator dialog).
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_PROCEDURES_MUTATORARG_Field')).appendField(new Blockly.FieldDropdown([
                    ['int', 'int'],
                    ['String', 'String']
                ]), 'TYPE').appendField(new Blockly.FieldTextInput('x', Blockly.Blocks.procedures_mutatorarg.validator), 'NAME');
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip('');
                this.contextMenu = false;
            },
            onchange: function() {
                if (this.last_variable !== this.getFieldValue('NAME')) {
                    var name = this.getFieldValue('NAME');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'NAME');
                    } catch (e) {}
                    this.last_variable = name;
                }
            },
            validName: Blockly.Blocks.procedures_defnoreturn.validName
        };
        Blockly.Blocks.procedures_mutatorarg.validator = function(newVar) {
            // Merge runs of whitespace.  Strip leading and trailing whitespace.
            // Beyond this, all names are legal.
            newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
            return newVar || null;
        };

        // Source: src/blocks/procedures_defreturn/procedures_defreturn.js
        /* global Blockly, JST, Roboblocks2 */
        /**
         * procedures_defreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_defreturn = function() {
            // Define a procedure with a return value.
            var funcName = this.getFieldValue('NAME');
            var branch = Blockly.Arduino.statementToCode(this, 'STACK');
            branch = branch.replace(/&quot;/g, '"');

            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }
            var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
            var code = '';

            returnValue = returnValue.replace(/&quot;/g, '"');
            var returnType = this.getReturnType();
            if (returnValue) {
                var a = Roboblocks2.findPinMode(returnValue);
                returnValue = a['code'];
                returnValue += '  return ' + a['pin'] + ';\n';
            }
            var args = this.paramString;
            code += JST['procedures_defreturn']({
                'returnType': returnType,
                'funcName': funcName,
                'args': args,
                'branch': branch,
                'returnValue': returnValue
            });
            // code=code.replace(/&amp;/g, '');

            code = Blockly.Arduino.scrub_(this, code);
            Blockly.Arduino.definitions_[funcName] = code;
            return null;
        };
        Blockly.Blocks.procedures_defreturn = {
            // Define a procedure with a return value.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Procedures are handled specially.
            helpUrl: Roboblocks2.URL_PROC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_PROCEDURES);
                var name = Blockly.Procedures.findLegalName(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), this);
                this.appendDummyInput().appendField(new Blockly.FieldTextInput(name, Blockly.Procedures.rename), 'NAME').appendField('', 'PARAMS');
                this.appendStatementInput('STACK').appendField(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFRETURN_DO'));
                this.appendValueInput('RETURN').setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
                this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
                this.setTooltip(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFRETURN_TOOLTIP'));
                this.arguments_ = [];
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            getReturnType: function() {
                var returnType;
                var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
                var a = Roboblocks2.findPinMode(returnValue);
                // code+=a['code'];
                returnValue = a['pin'];

                var isFunction = false;

                for (var i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(returnValue + ' \\(') >= 0) {
                        isFunction = true;
                        break;
                    }
                }
                if (!returnValue) {
                    returnType = 'void';
                }
                if (returnValue.search('"') >= 0) {
                    returnType = 'String';
                } else if (isFunction) { //returnValue.search('\\(') >= 0 && returnValue.search('\\)') >= 0) {
                    for (i in Blockly.Arduino.definitions_) {
                        if (Blockly.Arduino.definitions_[i].search(returnValue) >= 0) {
                            if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                                if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                    returnType = 'int *';
                                } else {
                                    returnType = 'int';
                                }
                            } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                                returnType = 'String';
                            } else {
                                returnType = '';
                            }
                        }
                    }
                } else if (this.isVariable(returnValue)) {
                    returnType = Roboblocks2.variables[returnValue][0];
                } else if ((returnValue.search('analogRead') >= 0) || (returnValue.search('digitalRead') >= 0) || (returnValue.search('Distanc') >= 0) || (!isNaN(parseFloat(returnValue)) || (returnValue.search('random') >= 0)) || (returnValue.search('map') >= 0) || returnValue.search('\\[') >= 0 || (returnValue.search('abs') >= 0) || (returnValue.search('sqrt') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('exp') >= 0) || (returnValue.search('pow') >= 0)) {
                    returnType = 'int';
                } else if (returnValue.search('readJoystick') >= 0 || returnValue[0] === '{') {
                    returnType = 'int *';
                } else {
                    returnType = 'void';
                }
                return returnType;
            },
            updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
            decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
            compose: Blockly.Blocks.procedures_defnoreturn.compose,
            dispose: Blockly.Blocks.procedures_defnoreturn.dispose,
            getProcedureDef: function() {
                // Return the name of the defined procedure,
                // a list of all its arguments,
                // and that it DOES have a return value.
                return [this.getFieldValue('NAME'), this.arguments_, true];
            },
            getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
            renameVar: Blockly.Blocks.procedures_defnoreturn.renameVar,
            mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
            domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
            validName: Blockly.Blocks.procedures_defnoreturn.validName,
            onchange: Blockly.Blocks.procedures_defnoreturn.onchange
        };

        // Source: src/blocks/procedures_ifreturn/procedures_ifreturn.js
        /* global Blockly, Roboblocks2 */

        /**
         * procedures_ifreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_ifreturn = function() {
            // Conditionally return value from a procedure.
            var condition = Blockly.Arduino.valueToCode(this, 'CONDITION',
                Blockly.Arduino.ORDER_NONE) || '';
            var code = '';
            var a = Roboblocks2.findPinMode(condition);
            code += a['code'];
            condition = a['pin'];

            code += 'if (' + condition + ') {\n';
            // if (this.hasReturnValue_) {
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            a = Roboblocks2.findPinMode(value);
            code += a['code'];
            code += '  return (' + value + ');\n';
            // } else {
            //     code += '  return;\n';
            // }
            code += '}\n';
            return code;
        };



        Blockly.Blocks.procedures_ifreturn = {
            // Conditionally return value from a procedure.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_PROCEDURES'),
            helpUrl: Roboblocks2.URL_PROC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_PROCEDURES);
                this.appendValueInput('CONDITION')
                    .setCheck(Boolean)
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
                this.appendValueInput('VALUE');
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_PROCEDURES_IFRETURN_TOOLTIP'));
                this.hasReturnValue_ = true;
            },
            mutationToDom: function() {
                // Save whether this block has a return value.
                var container = document.createElement('mutation');
                container.setAttribute('value', Number(this.hasReturnValue_));
                return container;
            },
            domToMutation: function(xmlElement) {
                // Restore whether this block has a return value.
                var value = xmlElement.getAttribute('value');
                this.hasReturnValue_ = (value === 1);
                // if (!this.hasReturnValue_) {
                //     this.removeInput('VALUE');
                // }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a procedure?
                var block = this;
                do {
                    if (block.type === 'procedures_defreturn') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    // If needed, toggle whether this block has a return value.
                    // if (block.type === 'procedures_defnoreturn' && this.hasReturnValue_) {
                    //     this.removeInput('VALUE');
                    //     this.hasReturnValue_ = false;
                    // } else if (block.type === 'procedures_defreturn' && !this.hasReturnValue_) {
                    //     this.appendValueInput('VALUE');
                    //     this.hasReturnValue_ = true;
                    // }
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };

        // Source: src/blocks/procedures_return/procedures_return.js
        /* global Blockly, Roboblocks2 */

        /**
         * procedures_ifreturn code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.procedures_return = function() {
            // Conditionally return value from a procedure.
            var code = '';
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            var a = Roboblocks2.findPinMode(value);
            code += a['code'];
            code += '  return (' + value + ');\n';
            return code;
        };



        Blockly.Blocks.procedures_return = {
            // Conditionally return value from a procedure.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_PROCEDURES'),
            helpUrl: Roboblocks2.URL_PROC,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_PROCEDURES_RETURN'));
                this.appendValueInput('VALUE');
                this.setInputsInline(true);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_PROCEDURES_RETURN_TOOLTIP'));
                this.hasReturnValue_ = true;
            },
            mutationToDom: function() {
                // Save whether this block has a return value.
                var container = document.createElement('mutation');
                container.setAttribute('value', Number(this.hasReturnValue_));
                return container;
            },
            domToMutation: function(xmlElement) {
                // Restore whether this block has a return value.
                var value = xmlElement.getAttribute('value');
                this.hasReturnValue_ = (value === 1);
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a procedure?
                var block = this;
                do {
                    if (block.type === 'procedures_defreturn') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };

        // Source: src/blocks/serial_available/serial_available.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * serial_available code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.serial_available = function() {
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');
            // branch=branch.replace(/&amp;/g, '');

            var code = JST['serial_available']({
                'branch': branch
            });
            return code;
        };

        /**
         * serial_available block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_available = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_available initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE'));
                this.appendStatementInput('DO')
                    .appendField(Roboblocks2.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_parseint/serial_parseint.js
        /* global Blockly, profiles, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * serial_parseint code generation
         * @return {Number} First valid (long) integer number from the serial buffer
         */

        Blockly.Arduino.serial_parseint = function() {
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_parseint_setups']({
                'bitrate': profiles.default.serial
            });
            var code = 'Serial.parseInt()'; // JST['serial_parseint']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * serial_parseint block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_parseint = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_paraseint initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT'));
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_print/serial_print.js
        /* global Blockly, profiles, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * serial_print code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.serial_print = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(content);
            code += a['code'];
            content = a['pin'];
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_print_setups']({
                'bitrate': profiles.
                default.serial
            });
            code += JST['serial_print']({
                'content': content
            });
            return code;
        };
        /**
         * serial_print block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_print = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_SERIE,
            tags: ['serial'],
            /**
             * serial_print initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendValueInput('CONTENT', String).appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_PRINT'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_PRINT_TOOLTIP'));
            }
        };
        // Source: src/blocks/serial_println/serial_println.js
        /* global Blockly, profiles, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * serial_println code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.serial_println = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(content);
            code += a['code'];
            content = a['pin'];
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_println_setups']({
                'bitrate': profiles.
                default.serial
            });
            code += JST['serial_println']({
                'content': content
            });
            return code;
        };
        /**
         * serial_println block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_println = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_SERIE,
            tags: ['serial'],
            /**
             * serial_println initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendValueInput('CONTENT', String).appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP'));
            }
        };
        // Source: src/blocks/serial_read/serial_read.js
        /* global Blockly, profiles, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * serial_read code generation
         * @return {int} Code generated with block parameters
         */

        Blockly.Arduino.serial_read = function() {

            Blockly.Arduino.setups_['setup_serial'] = JST['serial_read_setups']({
                'bitrate': profiles.default.serial
            });
            var code = JST['serial_read']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * serial_read block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_read = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_read initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_READ'));
                this.setOutput(true, String);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_READ_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_readstring/serial_readstring.js
        /* global Blockly, profiles, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * serial_readstring code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.serial_readstring = function() {

            Blockly.Arduino.setups_['setup_serial'] = JST['serial_readstring_setups']({
                'bitrate': profiles.default.serial
            });
            var code = JST['serial_readstring']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * serial_readstring block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_readstring = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_readstring initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING'));
                this.setOutput(true, String);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_special/serial_special.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * serial_special code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.serial_special = function() {
            var char = this.getFieldValue('CHAR');
            var code = JST['serial_special']({
                'char': char
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * serial_special block definition
         * @type {Object}
         */
        Blockly.Blocks.serial_special = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
            helpUrl: Roboblocks2.URL_SERIE,
            tags: ['serial'],

            /**
             * serial_special initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_COMMUNICATION);
                this.appendDummyInput('')
                    .appendField(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL'))
                    .appendField(new Blockly.FieldDropdown([
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TAB') || 'TAB', '\\t'],
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN') || 'CARRIAGE RETURN', '\\r'],
                        [Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED') || 'LINE FEED', '\\n']
                    ]), 'CHAR');
                this.setOutput(true, String);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP'));
            }
        };

        // Source: src/blocks/servo_cont/servo_cont.js
        /* global Blockly, options,JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * servo_cont code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.servo_cont = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var value_degree = this.getFieldValue('ROT') || '';
            var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '';
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            var b = Roboblocks2.findPinMode(delay_time);
            code += b['code'];
            delay_time = b['pin'];


            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['servo_cont_setups']({
                    'dropdown_pin': dropdown_pin
                });
            } else {
                Blockly.Arduino.setups_['servo_cont_' + dropdown_pin] = JST['servo_cont_setups']({
                    'dropdown_pin': dropdown_pin
                });
            }
            code += JST['servo_cont']({
                'dropdown_pin': dropdown_pin,
                'value_degree': value_degree,
                'delay_time': delay_time
            });
            return code;
        };
        /**
         * servo_cont block definition
         * @type {Object}
         */
        Blockly.Blocks.servo_cont = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_SERVO'),
            tags: ['servo'],
            helpUrl: Roboblocks2.URL_CONTINUOUS_ROTATION_SERVO,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_SERVO_CONT')).appendField(new Blockly.FieldImage('img/blocks/bqservo03.png', 208 * options.zoom, 126 * options.zoom)).appendField(Roboblocks2.locales.getKey('LANG_SERVO_CONT_PIN')).setCheck(Number);
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_SERVO_CONT_ROT')).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
                    [Roboblocks2.locales.getKey('LANG_SERVO_CONT_TURN_CLOCKWISE') || 'CLOCKWISE', '0'],
                    [Roboblocks2.locales.getKey('LANG_SERVO_CONT_TURN_COUNTERCLOCKWISE') || 'ANTICLOCKWISE', '180'],
                    [Roboblocks2.locales.getKey('LANG_SERVO_CONT_STOPPED') || 'STOPPED', '90']
                ]), 'ROT');
                this.appendValueInput('DELAY_TIME', Number).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_SERVO_CONT_DELAY'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_SERVO_CONT_TOOLTIP'));
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            onchange: function() {
                // try {
                //     if (this.isVariable(Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC))) {
                //         this.setWarningText(Roboblocks2.locales.getKey('LANG_SERVO_WARNING'));
                //     } else {
                //         this.setWarningText(null);
                //     }
                // } catch (e) {}
            }
        };
        // Source: src/blocks/servo_move/servo_move.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * servo_move code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.servo_move = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
            var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_move_definitions_include']({
                'dropdown_pin': dropdown_pin
            });
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            var b = Roboblocks2.findPinMode(delay_time);
            code += b['code'];
            delay_time = b['pin'];
            var c = Roboblocks2.findPinMode(value_degree);
            code += c['code'];
            value_degree = c['pin'];

            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['servo_move_setups']({
                    'dropdown_pin': dropdown_pin
                });
            } else {
                Blockly.Arduino.setups_['servo_move_' + dropdown_pin] = JST['servo_move_setups']({
                    'dropdown_pin': dropdown_pin
                });
            }

            code += JST['servo_move']({
                'dropdown_pin': dropdown_pin,
                'value_degree': value_degree,
                'delay_time': delay_time
            });
            return code;
        };
        /**
         * servo_move block definition
         * @type {Object}
         */
        Blockly.Blocks.servo_move = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_SERVO'),
            tags: ['servo'],
            helpUrl: Roboblocks2.URL_SERVO,
            /**
             * servo_move initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_SERVO_MOVE')).appendField(new Blockly.FieldImage('img/blocks/bqservo01.png', 208 * options.zoom, 126 * options.zoom)).appendField(Roboblocks2.locales.getKey('LANG_SERVO_MOVE_PIN')).setCheck(Number);
                this.appendValueInput('DEGREE', Number).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_SERVO_MOVE_DEGREES'));
                this.appendValueInput('DELAY_TIME', Number).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_SERVO_MOVE_DELAY'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_SERVO_MOVE_TOOLTIP'));
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            onchange: function() {
                // try {
                //     if (this.isVariable(Blockly.Arduino.valueToCode(this,'PIN', Blockly.Arduino.ORDER_ATOMIC))) {
                //         this.setWarningText(Roboblocks2.locales.getKey('LANG_SERVO_WARNING'));
                //     } else {
                //         this.setWarningText(null);
                //     }
                // } catch (e) {}
            }
        };
        // Source: src/blocks/text/text.js
        /* global Blockly, Roboblocks2 */

        /**
         * text code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text = function() {
            // Text value.
            var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text = {
            // Text value.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: Roboblocks2.URL_TEXT,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField('"')
                    .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                    .appendField('"');
                this.setOutput(true, String);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_TEXT_TOOLTIP'));
            }
        };

        // Source: src/blocks/text_append/text_append.js
        /* global Blockly, Roboblocks2 */
        /**
         * text_append code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text_append = function() {
            // Append to a variable in place.
            var varName = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
            var argument0 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';

            var code = '';

            var a = Roboblocks2.findPinMode(varName);
            code += a['code'];
            varName = a['pin'];
            a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += varName + ' += String(' + argument0 + ');\n';
            return code;
        };
        Blockly.Blocks.text_append = {
            // Append to a variable in place.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: Roboblocks2.URL_TEXT,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendValueInput('VAR')
                    // .appendField(new Blockly.FieldVariable(' '), 'VAR')
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_APPEND_TO'));
                this.appendValueInput('TEXT').appendField(Roboblocks2.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setInputsInline(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_APPEND_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('TEXT');
                //             this.appendValueInput('TEXT')
                //                 .appendField(Roboblocks2.locales.getKey('LANG_TEXT_APPEND_TO'))
                //                 .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
                //                 .appendField(Roboblocks2.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT'));
                //             this.setInputsInline(true);
                //         }catch(e){}
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
            }
        };
        // Source: src/blocks/text_equalsIgnoreCase/text_equalsIgnoreCase.js
        /* global Blockly, JST, Roboblocks2 */

        /**
         * text_equalsIgnoreCase code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text_equalsIgnoreCase = function() {
            var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
            string1 = string1.replace(/&quot;/g, '"');
            var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
            string2 = string2.replace(/&quot;/g, '"');

            var code = '';

            var a = Roboblocks2.findPinMode(string1);
            code += a['code'];
            string1 = a['pin'];

            a = Roboblocks2.findPinMode(string2);
            code += a['code'];
            string2 = a['pin'];

            code += JST['text_equalsIgnoreCase']({
                'string1': string1,
                'string2': string2
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_equalsIgnoreCase = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: Roboblocks2.URL_TEXT,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendValueInput('STRING1')
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_IS'));

                this.appendValueInput('STRING2')
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_EQUAL'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_QUESTION'));

                this.setInputsInline(true);

                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_TOOLTIP'));
            }
        };
        // Source: src/blocks/text_join/text_join.js
        /* global Blockly, Roboblocks2 */

        /**
         * text_join code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text_join = function() {
            // Create a string made up of any number of elements of any type.
            var code = '';
            var a;
            console.log('this.itemCount_', this.itemCount_);
            if (this.itemCount_ === 0) {
                return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
            } else if (this.itemCount_ === 1) {
                var argument0 = Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
                a = Roboblocks2.findPinMode(argument0);
                code += a['code'];
                argument0 = a['pin'];

                code += 'String(' + argument0 + ')';
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            } else {
                var i = (Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_NONE) || '');
                console.log('Blockly.Arduino.valueToCode(this, ADD0, Blockly.Arduino.ORDER_NONE)', Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_NONE));
                a = Roboblocks2.findPinMode(i);
                code = a['code'];
                i = a['pin'];

                var final_line = 'String(' + i;
                console.log('iteration 0', '\ncode: ', code, '\nfinal_line: ', final_line, '\nb', i);

                for (var n = 1; n < this.itemCount_; n++) {
                    i = (Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_NONE) || '');
                    console.log('Blockly.Arduino.valueToCode(this, ADDn, Blockly.Arduino.ORDER_NONE)', Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_NONE));
                    a = Roboblocks2.findPinMode(i);
                    code += a['code'];
                    i = a['pin'];
                    final_line += ') + String(' + i;
                    console.log('iteration', n, '\ncode: ', code, '\nfinal_line: ', final_line, '\nb', i);
                }


                code += final_line + ')';

                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }
        };

        Blockly.Blocks.text_join = {
            // Create a string made up of any number of elements of any type.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: Roboblocks2.URL_TEXT,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendValueInput('ADD0')
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                this.appendValueInput('ADD1');
                this.setOutput(true, String);
                this.setMutator(new Blockly.Mutator(['text_create_join_item']));
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_JOIN_TOOLTIP'));
                this.itemCount_ = 2;
            },
            mutationToDom: function() {
                var container = document.createElement('mutation');
                container.setAttribute('items', this.itemCount_);
                return container;
            },
            domToMutation: function(xmlElement) {
                for (var x = 0; x < this.itemCount_; x++) {
                    this.removeInput('ADD' + x);
                }
                this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
                for (x = 0; x < this.itemCount_; x++) {
                    var input = this.appendValueInput('ADD' + x);
                    if (x === 0) {
                        input.appendField(Roboblocks2.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                    }
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote0.png', 12, 12))
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote1.png', 12, 12));
                }
            },
            decompose: function(workspace) {
                var containerBlock = Blockly.Block.obtain(workspace, 'text_create_join_container');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 0; x < this.itemCount_; x++) {
                    var itemBlock = Blockly.Block.obtain(workspace, 'text_create_join_item');
                    itemBlock.initSvg();
                    connection.connect(itemBlock.previousConnection);
                    connection = itemBlock.nextConnection;
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect all input blocks and remove all inputs.
                if (this.itemCount_ === 0) {
                    this.removeInput('EMPTY');
                } else {
                    for (var x = this.itemCount_ - 1; x >= 0; x--) {
                        this.removeInput('ADD' + x);
                    }
                }
                this.itemCount_ = 0;
                // Rebuild the block's inputs.
                var itemBlock = containerBlock.getInputTargetBlock('STACK');
                while (itemBlock) {
                    var input = this.appendValueInput('ADD' + this.itemCount_);
                    if (this.itemCount_ === 0) {
                        input.appendField(Roboblocks2.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                    }
                    // Reconnect any child blocks.
                    if (itemBlock.valueConnection_) {
                        input.connection.connect(itemBlock.valueConnection_);
                    }
                    this.itemCount_++;
                    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote0.png', 12, 12))
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote1.png', 12, 12));
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var itemBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 0;
                while (itemBlock) {
                    var input = this.getInput('ADD' + x);
                    itemBlock.valueConnection_ = input && input.connection.targetConnection;
                    x++;
                    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                }
            }
        };



        Blockly.Blocks.text_create_join_container = {
            // Container.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_CREATE_JOIN_Field_JOIN'));
                this.appendStatementInput('STACK');
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_CREATE_JOIN_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.text_create_join_item = {
            // Add items.
            init: function() {
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_Field_ITEM'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'));
                this.contextMenu = false;
            }
        };


        Blockly.Blocks.text_create_join_container = {
            // Container.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_CREATE_JOIN_TITLE_JOIN'));
                this.appendStatementInput('STACK');
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_CREATE_JOIN_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.text_create_join_item = {
            // Add items.
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM'));
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'));
                this.contextMenu = false;
            }
        };



        // Source: src/blocks/text_length/text_length.js
        /* global Blockly, JST, Roboblocks2 */

        /**
         * text_length code generation
         * @return {String} Code generated with block parameters
         */

        Blockly.Arduino.text_length = function() {
            // String length.
            var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
            var code = '';
            var a = Roboblocks2.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += JST['text_length']({
                'argument0': argument0
            });

            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        };

        Blockly.Blocks.text_length = {
            // String length.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: Roboblocks2.URL_TEXT,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendValueInput('VALUE')
                    .setCheck([String, Array])
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_LENGTH_INPUT_LENGTH'));
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_LENGTH_TOOLTIP'));
            }
        };
        // Source: src/blocks/text_substring/text_substring.js
        /* global Blockly, JST, Roboblocks2 */

        /**
         * text_substring code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.text_substring = function() {
            var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
            var from = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_NONE);
            var to = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_NONE);
            var code = '';
            var a = Roboblocks2.findPinMode(string1);
            code += a['code'];
            string1 = a['pin'];

            a = Roboblocks2.findPinMode(from);
            code += a['code'];
            from = a['pin'];

            a = Roboblocks2.findPinMode(to);
            code += a['code'];
            to = a['pin'];

            code += JST['text_substring']({
                'string1': string1,
                'from': from,
                'to': to
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_substring = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_TEXT'),
            helpUrl: Roboblocks2.URL_TEXT,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_TEXT);
                this.appendValueInput('STRING1')
                    // .setCheck(String)
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_SUBSTRING'));

                this.appendValueInput('FROM')
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_SUBSTRING_FROM'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);

                this.appendValueInput('TO')
                    .appendField(Roboblocks2.locales.getKey('LANG_TEXT_SUBSTRING_TO'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);
                // this.appendDummyInput()
                //     .appendField(Roboblocks2.locales.getKey('LANG_TEXT_SUBSTRING_QUESTION'));

                this.setInputsInline(true);

                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_TEXT_SUBSTRING_TOOLTIP'));
            }
        };
        // Source: src/blocks/variables_get/variables_get.js
        /* global Blockly, Roboblocks2 */
        /* jshint sub:true */
        /**
         * variables_get code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_get = function() {
            // Variable setter.
            var varName = this.getFieldValue('VAR') || '';
            if (Roboblocks2.variables[this.getFieldValue('VAR')] !== undefined) {
                this.var_type = Roboblocks2.variables[this.getFieldValue('VAR')][0];
            }
            return [varName, Blockly.Arduino.ORDER_ATOMIC];
        };
        Blockly.Blocks.variables_get = {
            // Variable setter.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_VAR,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_VARIABLES);
                this.appendDummyInput('DUMMY').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GET'))
                    // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_VARIABLES_GET_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.workspace) {
                //     // Block has been deleted.
                //     return;
                // }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('DUMMY');
                //         }catch(e){}
                //         this.appendDummyInput('DUMMY')
                //             .appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GET'))
                //             .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                //         this.setFieldValue(this.last_variable, 'VAR');
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };
        // Source: src/blocks/variables_global/variables_global.js
        /* global Blockly,  Roboblocks2 */
        /* jshint sub:true */
        /**
         * variables_global code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_global = function() {
            // Variable setter.
            var varType;
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var isFunction = false;

            var a = Roboblocks2.findPinMode(varValue);
            Blockly.Arduino.setups_['pinMode' + varValue] = a['code'];
            varValue = a['pin'];

            for (var i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
                    isFunction = true;
                    break;
                }
            }
            if (varValue.search('"') >= 0 || varValue.search('substring\\(') >= 0) {
                varType = 'String';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';';
            } else if (isFunction) { //varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
                for (i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                        if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                            if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                varType = 'int *';
                            } else {
                                varType = 'int';
                            }
                        } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                            varType = 'String';
                        } else {
                            varType = '';
                        }
                        Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                        Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
                        break;
                    }
                }
            } else if (varValue[0] === '{') {
                varType = 'int *';
                varValue = varValue.replace('{', '');
                varValue = varValue.replace('}', '');
                varValue = varValue.split(',');
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                // Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '[0]=' + varValue[0] + ';\n  ' + varName + '[1]=' + varValue[1] + ';\n  ' + varName + '[2]=' + varValue[2] + ';\n';
            } else if (this.isVariable(varValue)) {
                varType = Roboblocks2.variables[varValue][0];
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            } else if (varValue.search('readJoystick') >= 0) {
                varType = 'int *';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue)) || (varValue.search('random') >= 0)) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                varType = 'int';
                if (!isNaN(parseFloat(varValue))) {
                    Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';\n';
                } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (varValue.search('random') >= 0) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                    Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                    Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
                }
            } else {
                varType = 'unknown';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            }
            Roboblocks2.variables[varName] = [varType, 'global'];
            Roboblocks2.variables['analogRead(' + varName + ')'] = [varType, 'global'];
            Roboblocks2.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

            return '';
        };
        Blockly.Blocks.variables_global = {
            // Variable setter.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_VAR,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GLOBAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText(Roboblocks2.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            onchange: function() {
                if (this.last_variable !== this.getFieldValue('VAR')) {
                    var name = this.getFieldValue('VAR');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'VAR');
                    } catch (e) {}
                    this.last_variable = name;
                }
            }
        };
        // Source: src/blocks/variables_global_type/variables_global_type.js
        /* global Blockly,  Roboblocks2 */
        /* jshint sub:true */
        /**
         * variables_global_type code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_global_type = function() {
            // Variable setter.
            var varType = this.getFieldValue('VAR_TYPE');
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var isFunction = false;

            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = Roboblocks2.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];

            Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
            Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';

            Roboblocks2.variables[varName] = [varType, 'global'];
            Roboblocks2.variables['analogRead(' + varName + ')'] = [varType, 'global'];
            Roboblocks2.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

            return '';
        };

        Blockly.Blocks.variables_global_type = {
            // Variable setter.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_VAR,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').
                appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GLOBAL')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText(Roboblocks2.locales.getKey('LANG_RESERVED_WORDS'));
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            onchange: function() {
                if (this.last_variable !== this.getFieldValue('VAR')) {
                    var name = this.getFieldValue('VAR');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'VAR');
                    } catch (e) {}
                    this.last_variable = name;
                }
            }
        };

        // Source: src/blocks/variables_local/variables_local.js
        /* global Blockly,  Roboblocks2 */
        /* jshint sub:true */
        /**
         * variable code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_local = function() {
            // Variable setter.
            var varType;
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var sufix = '';
            var code = '';
            var isFunction = false;


            var a = Roboblocks2.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];


            for (var i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
                    isFunction = true;
                    break;
                }
            }
            if (varValue.search('"') >= 0 || varValue.search('substring\\(') >= 0) {
                varType = 'String';
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            } else if (isFunction) { //varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
                for (i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                        if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                            if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                varType = 'int *';
                            } else {
                                varType = 'int';
                            }
                        } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                            varType = 'String';
                        } else {
                            varType = '';
                        }
                        code += varType + ' ' + varName + '=' + varValue + ';\n';
                    }
                }
            } else if (varValue[0] === '{') {
                varType = 'int *';
                varValue = varValue.replace('{', '');
                varValue = varValue.replace('}', '');
                varValue = varValue.split(',');
                code += varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                // code += varType + varName + ';\n';
                code += varName + '[0]=' + varValue[0] + ';\n' + varName + '[1]=' + varValue[1] + ';\n' + varName + '[2]=' + varValue[2] + ';\n';
            } else if (this.isVariable(varValue)) {
                varType = Roboblocks2.variables[varValue][0];
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            } else if (varValue.search('readJoystick') >= 0) {
                varType = 'int *';
                code += varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                code += varName + '=' + varValue + ';\n';
            } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue))) || (varValue.search('random') >= 0) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                varType = 'int';
                code += varType + ' ' + varName + sufix + '=' + varValue + ';\n';
            } else {
                varType = 'unknown';
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            }

            Roboblocks2.variables[varName] = [varType, 'local'];
            Roboblocks2.variables['analogRead(' + varName + ')'] = [varType, 'local'];
            Roboblocks2.variables['digitalRead(' + varName + ')'] = [varType, 'local'];

            return code;
        };
        Blockly.Blocks.variables_local = {
            // Variable setter.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_VAR,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_LOCAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_LOCAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: Blockly.Blocks.variables_global.isVariable,
            onchange: Blockly.Blocks.variables_global.onchange,
            validName: Blockly.Blocks.variables_global.validName
        };
        // Source: src/blocks/variables_local_type/variables_local_type.js
        /* global Blockly,  Roboblocks2 */
        /* jshint sub:true */
        /**
         * variable code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_local_type = function() {
            // Variable setter.
            var varType = this.getFieldValue('VAR_TYPE');
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = Roboblocks2.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];

            code += varType + ' ' + varName + '=' + varValue + ';\n';

            Roboblocks2.variables[varName] = [varType, 'local'];
            Roboblocks2.variables['analogRead(' + varName + ')'] = [varType, 'local'];
            Roboblocks2.variables['digitalRead(' + varName + ')'] = [varType, 'local'];

            return code;
        };
        Blockly.Blocks.variables_local_type = {
            // Variable setter.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_VAR,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').
                appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_LOCAL')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_LOCAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
                    [Roboblocks2.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: Blockly.Blocks.variables_global.isVariable,
            onchange: Blockly.Blocks.variables_global.onchange,
            validName: Blockly.Blocks.variables_global.validName
        };

        // Source: src/blocks/variables_set/variables_set.js
        /* global Blockly, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * variables_set code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.variables_set = function() {
            // Variable setter.
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = Roboblocks2.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];


            code += JST['variables_set']({
                'varName': varName,
                'varValue': varValue
            });
            return code;
        };
        Blockly.Blocks.variables_set = {
            // Variable setter.
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: Roboblocks2.URL_VAR,
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_SET'))
                    // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
                    .appendField(new Blockly.FieldVariable(' '), 'VAR').appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_SET_AS')).setAlign(Blockly.ALIGN_RIGHT);
                this.setInputsInline(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_VARIABLES_SET_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                // this.last_variable=this.getFieldValue('VAR');
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allVariables();
                // }
                // var variables=Blockly.Variables.allVariables();
                // for (var i in variables){
                //     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('VALUE');
                //             this.appendValueInput('VALUE')
                //                 .appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_SET'))
                //                 .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
                //                 .appendField(Roboblocks2.locales.getKey('LANG_VARIABLES_SET_AS'))
                //                 .setAlign(Blockly.ALIGN_RIGHT);
                //             this.setInputsInline(false);
                //             this.setFieldValue(this.last_variable, 'VAR');
                //         }catch(e){}
                //         this.last_variables=Blockly.Variables.allVariables();
                //     }
                // }
                try {
                    if (!this.exists()) {
                        this.setWarningText(Roboblocks2.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };
        // Source: src/blocks/zum_button/zum_button.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * zum_button code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.zum_button = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['zum_button_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_button_' + dropdown_pin] = JST['zum_button_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['zum_button']({
                'dropdown_pin': dropdown_pin,
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * zum_button block definition
         * @type {Object}
         */
        Blockly.Blocks.zum_button = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ZUM'),
            tags: ['button'],
            helpUrl: Roboblocks2.URL_BUTTON,
            /**
             * zum_button initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ZUM);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_ZUM_BUTTON')).appendField(new Blockly.FieldImage('img/blocks/zum02.png', 212 * options.zoom, 139 * options.zoom)).appendField(Roboblocks2.locales.getKey('LANG_ZUM_BUTTON_PIN'));
                this.setOutput(true, Boolean);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ZUM_BUTTON_TOOLTIP'));
            }
        };
        // Source: src/blocks/zum_follower/zum_follower.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * zum_follower code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.zum_follower = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var NextPIN = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC) || '';
            var code_btn1 = Blockly.Arduino.statementToCode(this, 'SENS1');
            code_btn1 = code_btn1.replace(/&quot;/g, '"');
            // code_btn1=code_btn1.replace(/&amp;/g,'');
            var code_btn2 = Blockly.Arduino.statementToCode(this, 'SENS2');
            code_btn2 = code_btn2.replace(/&quot;/g, '"');
            // code_btn2=code_btn2.replace(/&amp;/g,'');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            var b = Roboblocks2.findPinMode(NextPIN);
            code += b['code'];
            NextPIN = b['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['zum_follower_setups_pin']({
                    'dropdown_pin': dropdown_pin
                });
            } else {
                Blockly.Arduino.setups_['setup_follower_1_' + dropdown_pin] = JST['zum_follower_setups_pin']({
                    'dropdown_pin': dropdown_pin
                });
            }
            if (Roboblocks2.isVariable(NextPIN)) {
                code += JST['zum_follower_setups_nextpin']({
                    'NextPIN': NextPIN
                });
            } else {
                Blockly.Arduino.setups_['setup_follower_2_' + NextPIN] = JST['zum_follower_setups_nextpin']({
                    'NextPIN': NextPIN
                });
            }
            code += JST['zum_follower']({
                'dropdown_pin': dropdown_pin,
                'NextPIN': NextPIN,
                'code_btn1': code_btn1,
                'code_btn2': code_btn2
            });
            return code;
        };
        /**
         * zum_follower block definition
         * @type {Object}
         */
        Blockly.Blocks.zum_follower = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ZUM'),
            tags: ['infrared'],
            helpUrl: Roboblocks2.URL_IR,
            /**
             * zum_follower initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ZUM);
                this.appendDummyInput('').appendField(Roboblocks2.locales.getKey('LANG_ZUM_FOLLOWER')).appendField(new Blockly.FieldImage('img/blocks/zum06.png', 203 * options.zoom, 165 * options.zoom));
                this.appendValueInput('PIN').setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_ZUM_FOLLOWER_PIN_LEFT'));
                this.appendValueInput('PIN2').setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_ZUM_FOLLOWER_PIN_RIGHT'));
                this.appendStatementInput('SENS1').setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_ZUM_FOLLOWER_LEFT'));
                this.appendStatementInput('SENS2').setAlign(Blockly.ALIGN_RIGHT).appendField(Roboblocks2.locales.getKey('LANG_ZUM_FOLLOWER_RIGHT'));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ZUM_FOLLOWER_TOOLTIP'));
            }
        };
        // Source: src/blocks/zum_infrared/zum_infrared.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * zum_infrared code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.zum_infrared = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['zum_infrared_setups']({
                    'dropdown_pin': dropdown_pin
                });
            } else {
                Blockly.Arduino.setups_['setup_infrared_' + dropdown_pin] = JST['zum_infrared_setups']({
                    'dropdown_pin': dropdown_pin
                });
            }
            code += JST['zum_infrared']({
                'dropdown_pin': dropdown_pin
            });
            //  code=code.substring(0,code.length-1);
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };
        /**
         * zum_infrared block definition
         * @type {Object}
         */
        Blockly.Blocks.zum_infrared = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ZUM'),
            tags: ['infrared'],
            helpUrl: Roboblocks2.URL_IR,
            /**
             * zum_infrared initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ZUM);
                this.appendValueInput('PIN').appendField(Roboblocks2.locales.getKey('LANG_ZUM_INFRARED')).appendField(new Blockly.FieldImage('img/blocks/zum07.png', 208 * options.zoom, 126 * options.zoom)).appendField(Roboblocks2.locales.getKey('LANG_ZUM_INFRARED_PIN'));
                this.setOutput(true);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ZUM_INFRARED_TOOLTIP'));
            }
        };
        // Source: src/blocks/ADELANTE/ADELANTE.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */
        /**
         * ADELANTE code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.ADELANTE = function() {
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['ADELANTE_setups' + ADELANTE_]({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = JST['ADELANTE_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['ADELANTE']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.ADELANTE = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ARAÑA'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod20.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };
        

Blockly.Arduino.DERECHA = function() {
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['DERECHA_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = JST['DERECHA_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['DERECHA']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.DERECHA = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ARAÑA'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod21.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };


Blockly.Arduino.IZQUIERDA = function() {
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['IZQUIERDA_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = JST['IZQUIERDA_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['IZQUIERDA']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.IZQUIERDA = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ARAÑA'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod22.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };
Blockly.Arduino.ATRAS = function() {
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});            
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['ATRAS_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = JST['ATRAS_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['ATRAS']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.ATRAS = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ARAÑA'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod23.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };

//cocobot inicio

   Blockly.Arduino.ADELANTE2 = function() {
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['ADELANTE_setups2' + ADELANTE2_]({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = JST['ADELANTE_setups2']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['ADELANTE2']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.ADELANTE2 = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COCO'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod20.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };
        

Blockly.Arduino.DERECHA2 = function() {
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['DERECHA_setups2']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = JST['DERECHA_setups2']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['DERECHA2']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.DERECHA2 = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COCO'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod21.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };


Blockly.Arduino.IZQUIERDA2 = function() {
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['IZQUIERDA_setups2']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = JST['IZQUIERDA_setups2']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['IZQUIERDA2']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.IZQUIERDA2 = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COCO'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod22.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };
Blockly.Arduino.ATRAS2 = function() {
            Blockly.Arduino.definitions_['include_servo'] = JST['servo_cont_definitions_include']({});            
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['ATRAS_setups2']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led_' + dropdown_pin] = JST['ATRAS_setups2']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['ATRAS2']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.ATRAS2 = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_COCO'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod23.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };

//cocobot final


/**Blockly.Arduino.MUSICA = function() {
            var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin1);
            code += a['code'];
            dropdown_pin1 = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin1)) {
                code += JST['MUSICA_setups']({
                    'dropdown_pin1': dropdown_pin1,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led1_' + dropdown_pin1] = JST['MUSICA_setups']({
                    'dropdown_pin1': dropdown_pin1,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['MUSICA']({
                'dropdown_pin': dropdown_pin1,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };*/
        /**
      
        Blockly.Blocks.MUSICA = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ARAÑA'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
   
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod24.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };*/
/**Blockly.Arduino.LUZ = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['LUZ_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led2_' + dropdown_pin] = JST['LUZ_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['LUZ']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
       /**
 Blockly.Blocks.LUZ = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ARAÑA'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            /**
init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/bqmod25.png', 208 * options.zoom, 140 * options.zoom));
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };*/

Blockly.Arduino.ESPERAR = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (Roboblocks2.isVariable(dropdown_pin)) {
                code += JST['ESPERAR_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            } else {
                Blockly.Arduino.setups_['setup_green_led3_' + dropdown_pin] = JST['ESPERAR_setups']({
                    'dropdown_pin': dropdown_pin,
                    'dropdown_stat': dropdown_stat
                });
            }
            code += JST['ESPERAR']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };
        /**
         * ADELANTE block definition
         * @type {Object}
         */
        Blockly.Blocks.ESPERAR = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ARAÑA'),
            tags: ['led'],
            helpUrl: Roboblocks2.URL_LED,
            /**
             * ADELANTE initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_SERVO);
                this.appendDummyInput('PIN').appendField(new Blockly.FieldImage('img/blocks/esperar.gif', 208 * options.zoom, 140 * options.zoom));
                this.appendDummyInput().appendField(Roboblocks2.locales.getKey('LANG_ZUM_LED_STATE')).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_1') || '1', '1000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_2') || '2', '2000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_3') || '3', '3000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_4') || '4', '4000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_5') || '5', '5000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_6') || '6', '6000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_7') || '7', '7000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_8') || '8', '8000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_9') || '9', '9000'],
                    [Roboblocks2.locales.getKey('LANG_ESPERAR_10') || '10', '10000']
                ]), 'STAT');
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ADELANTE_TOOLTIP'));
            }
        };




        // Source: src/blocks/zum_photoresistor/zum_photoresistor.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * zum_photoresistor code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.zum_photoresistor = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];


            code += JST['zum_photoresistor']({
                'dropdown_pin': dropdown_pin
            });

            //  code=code.substring(0,code.length-1);
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };


        /**
         * zum_photoresistor block definition
         * @type {Object}
         */
        Blockly.Blocks.zum_photoresistor = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ZUM'),
            tags: ['photoresistor'],
            helpUrl: Roboblocks2.URL_LDR,
            /**
             * zum_photoresistor initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ZUM);
                this.appendValueInput('PIN')
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PHOTORESISTOR'))
                    .appendField(new Blockly.FieldImage('img/blocks/zum05.png', 208 * options.zoom, 126 * options.zoom))
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PHOTORESISTOR_PIN'));
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ZUM_PHOTORESISTOR_TOOLTIP'));
            }
        };

        // Source: src/blocks/zum_piezo_buzzer/zum_piezo_buzzer.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * zum_piezo_buzzer code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.zum_piezo_buzzer = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var dropdown_stat = this.getFieldValue('STAT');
            var delay_time = Blockly.Arduino.valueToCode(this, 'DURA', Blockly.Arduino.ORDER_ATOMIC);

            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            a = Roboblocks2.findPinMode(delay_time);
            code += a['code'];
            delay_time = a['pin'];

            code += JST['zum_piezo_buzzer']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat,
                'delay_time': delay_time
            });

            return code;
        };


        /**
         * zum_piezo_buzzer block definition
         * @type {Object}
         */
        Blockly.Blocks.zum_piezo_buzzer = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ZUM'),
            tags: ['buzzer'],
            helpUrl: Roboblocks2.URL_BUZZER,
            /**
             * zum_piezo_buzzer initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ZUM);
                this.appendValueInput('PIN')
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER'))
                    .appendField(new Blockly.FieldImage('img/blocks/zum01.png', 208 * options.zoom, 140 * options.zoom))
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_PIN'));
                this.appendDummyInput()
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_TONE'))
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(new Blockly.FieldDropdown([
                        [Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_DO') || 'DO', '261'],
                        [Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_RE') || 'RE', '293'],
                        [Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_MI') || 'MI', '329'],
                        [Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_FA') || 'FA', '349'],
                        [Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_SOL') || 'SOL', '392'],
                        [Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_LA') || 'LA', '440'],
                        [Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_SI') || 'SI', '494']
                    ]), 'STAT'); //523
                this.appendValueInput('DURA', Number)
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_DURATION'));

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZER_TOOLTIP'));
            }
        };

        // Source: src/blocks/zum_piezo_buzzerav/zum_piezo_buzzerav.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * zum_piezo_buzzerav code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.zum_piezo_buzzerav = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var Buzztone = Blockly.Arduino.valueToCode(this, 'TONE', Blockly.Arduino.ORDER_ATOMIC);
            var delay_time = Blockly.Arduino.valueToCode(this, 'DURA', Blockly.Arduino.ORDER_ATOMIC);

            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            a = Roboblocks2.findPinMode(Buzztone);
            code += a['code'];
            Buzztone = a['pin'];

            a = Roboblocks2.findPinMode(delay_time);
            code += a['code'];
            delay_time = a['pin'];

            code += JST['zum_piezo_buzzerav']({
                'dropdown_pin': dropdown_pin,
                'Buzztone': Buzztone,
                'delay_time': delay_time
            });

            return code;
        };


        /**
         * zum_piezo_buzzerav block definition
         * @type {Object}
         */
        Blockly.Blocks.zum_piezo_buzzerav = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ZUM'),
            tags: ['buzzer'],
            helpUrl: Roboblocks2.URL_BUZZER,
            /**
             * zum_piezo_buzzerav initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ZUM);
                this.appendValueInput('PIN')
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV'))
                    .appendField(new Blockly.FieldImage('img/blocks/zum01.png', 208 * options.zoom, 140 * options.zoom))
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_PIN'));
                this.appendValueInput('TONE', Number)
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_TONE'));

                this.appendValueInput('DURA', Number)
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_DURATION'));

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_TOOLTIP'));
            }
        };

        // Source: src/blocks/zum_potentiometer/zum_potentiometer.js
        /* global Blockly, options, JST, Roboblocks2 */
        /* jshint sub:true */

        /**
         * zum_potentiometer code generation
         * @return {String} Code generated with block parameters
         */
        Blockly.Arduino.zum_potentiometer = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var code = '';
            var a = Roboblocks2.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            code += JST['zum_potentiometer']({
                'dropdown_pin': dropdown_pin
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        /**
         * zum_potentiometer block definition
         * @type {Object}
         */
        Blockly.Blocks.zum_potentiometer = {
            category: Roboblocks2.locales.getKey('LANG_CATEGORY_ZUM'),
            tags: ['potentiometer'],
            helpUrl: Roboblocks2.URL_POTENTIOMETER,
            /**
             * zum_potentiometer initialization
             */
            init: function() {
                this.setColour(Roboblocks2.LANG_COLOUR_ZUM);
                this.appendValueInput('PIN')
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_POTENTIOMETER'))
                    .appendField(new Blockly.FieldImage('img/blocks/zum03.png', 208 * options.zoom, 139 * options.zoom))
                    .appendField(Roboblocks2.locales.getKey('LANG_ZUM_POTENTIOMETER_PIN'));
                this.setOutput(true, Number);
                this.setTooltip(Roboblocks2.locales.getKey('LANG_ZUM_POTENTIOMETER_TOOLTIP'));
            }
        };
        return Blockly.Blocks;
    }
    var Roboblocks2 = {
        load: load
    };
    if (typeof define === 'function' && define.amd) {
        return Roboblocks2;
    } else {
        window.Roboblocks2 = Roboblocks2;
    }
}));
