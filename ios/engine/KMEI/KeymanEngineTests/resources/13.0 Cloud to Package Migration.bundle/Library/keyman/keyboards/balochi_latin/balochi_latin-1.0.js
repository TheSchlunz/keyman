if(typeof keyman === 'undefined') {console.log('Keyboard requires KeymanWeb 10.0 or later');if(typeof tavultesoft !== 'undefined') tavultesoft.keymanweb.util.alert("This keyboard requires KeymanWeb 10.0 or later");} else {KeymanWeb.KR(new Keyboard_balochi_latin());}function Keyboard_balochi_latin(){this.KI="Keyboard_balochi_latin";this.KN="Balochi Latin";this.KMINVER="10.0";this.KV={F:' 1em "Arial"',K102:0};this.KV.KLS={"default": ["`","1","2","3","4","5","6","7","8","9","0","-","=","","","","q","w","e","r","t","y","u","i","o","p","[","]","\\","","","","a","s","d","é","g","h","j","k","l",";","'","","","","","","\\","z","á","c","ó","b","n","m",",",".","/","","","","","",""],"shift": ["~","!","@","#","$","%","^","&","*","(",")","_","+","","","","Q","W","E","R","T","Y","U","I","O","P","{","}","|","","","","A","S","D","É","G","H","J","K","L",":","\"","","","","","","|","Z","Á","C","Ó","B","N","M","<",">","?","","","","","",""],"shift-alt": ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","F","","","","","","","","","","","","","","","X","","V","","","","","","","","","","","",""],"alt": ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","f","","","","","","","","","","","","","","","x","","v","","","","","","","","","","","",""]};this.KV.BK=(function(x){var e=Array.apply(null,Array(65)).map(String.prototype.valueOf,""),r=[],v,i,m=['default','shift','ctrl','shift-ctrl','alt','shift-alt','ctrl-alt','shift-ctrl-alt'];for(i=m.length-1;i>=0;i--)if((v=x[m[i]])||r.length)r=(v?v:e).slice().concat(r);return r})(this.KV.KLS);this.KDU=0;this.KH="This is a modified US keyboard for typing Balochi in Latin script.";this.KM=0;this.KBVER="1.0";this.KMBM=0x0350;this.KVKL={"tablet":{"displayUnderlying":false,"layer":[{"id":"default","row":[{"id":1,"key":[{"id":"K_1","text":"1"},{"id":"K_2","text":"2"},{"id":"K_3","text":"3"},{"id":"K_4","text":"4"},{"id":"K_5","text":"5"},{"id":"K_6","text":"6"},{"id":"K_7","text":"7"},{"id":"K_8","text":"8"},{"id":"K_9","text":"9"},{"id":"K_0","text":"0"},{"id":"K_HYPHEN","text":"-"},{"id":"K_EQUAL","text":"="},{"id":"K_BKSP","text":"*BkSp*","width":"100","sp":"1"}]},{"id":2,"key":[{"id":"K_Q","text":"q","pad":"75"},{"id":"K_W","text":"w"},{"id":"K_E","text":"e"},{"id":"K_R","text":"r"},{"id":"K_T","text":"t"},{"id":"K_Y","text":"y"},{"id":"K_U","text":"u"},{"id":"K_I","text":"i"},{"id":"K_O","text":"o"},{"id":"K_P","text":"p"},{"id":"K_LBRKT","text":"["},{"id":"K_RBRKT","text":"]"},{"id":"T_new_184","text":"","width":"10","sp":"10"}]},{"id":3,"key":[{"id":"K_BKQUOTE","text":"`"},{"id":"K_A","text":"a"},{"id":"K_S","text":"s"},{"id":"K_D","text":"d"},{"id":"K_F","text":"\u00E9"},{"id":"K_G","text":"g"},{"id":"K_H","text":"h"},{"id":"K_J","text":"j"},{"id":"K_K","text":"k"},{"id":"K_L","text":"l"},{"id":"K_COLON","text":";"},{"id":"K_QUOTE","text":"'"},{"id":"K_BKSLASH","text":"\\"}]},{"id":4,"key":[{"id":"K_SHIFT","text":"*Shift*","width":"160","sp":"1","nextlayer":"shift"},{"id":"K_oE2","text":"\\"},{"id":"K_Z","text":"z"},{"id":"K_X","text":"\u00E1"},{"id":"K_C","text":"c"},{"id":"K_V","text":"\u00F3"},{"id":"K_B","text":"b"},{"id":"K_N","text":"n"},{"id":"K_M","text":"m"},{"id":"K_COMMA","text":","},{"id":"K_PERIOD","text":"."},{"id":"K_SLASH","text":"\/"},{"id":"T_new_210","text":"","width":"10","sp":"10"}]},{"id":5,"key":[{"id":"K_LCONTROL","text":"alt","width":"130","sp":"1","nextlayer":"alt"},{"id":"K_LOPT","text":"*Menu*","width":"140","sp":"1"},{"id":"K_SPACE","text":"","width":"930"},{"id":"K_ENTER","text":"*Enter*","width":"145","sp":"1"}]}]},{"id":"shift","row":[{"id":1,"key":[{"id":"K_1","text":"!","sp":"2"},{"id":"K_2","text":"@"},{"id":"K_3","text":"#"},{"id":"K_4","text":"$"},{"id":"K_5","text":"%"},{"id":"K_6","text":"^"},{"id":"K_7","text":"&"},{"id":"K_8","text":"*"},{"id":"K_9","text":"("},{"id":"K_0","text":")"},{"id":"K_HYPHEN","text":"_"},{"id":"K_EQUAL","text":"+"},{"id":"K_BKSP","text":"*BkSp*","width":"100","sp":"1"}]},{"id":2,"key":[{"id":"K_Q","text":"Q","pad":"75"},{"id":"K_W","text":"W"},{"id":"K_E","text":"E"},{"id":"K_R","text":"R"},{"id":"K_T","text":"T"},{"id":"K_Y","text":"Y"},{"id":"K_U","text":"U"},{"id":"K_I","text":"I"},{"id":"K_O","text":"O"},{"id":"K_P","text":"P"},{"id":"K_LBRKT","text":"{"},{"id":"K_RBRKT","text":"}"},{"id":"T_new_242","text":"","width":"10","sp":"10"}]},{"id":3,"key":[{"id":"K_BKQUOTE","text":"~"},{"id":"K_A","text":"A"},{"id":"K_S","text":"S"},{"id":"K_D","text":"D"},{"id":"K_F","text":"\u00C9"},{"id":"K_G","text":"G"},{"id":"K_H","text":"H"},{"id":"K_J","text":"J"},{"id":"K_K","text":"K"},{"id":"K_L","text":"L"},{"id":"K_COLON","text":":"},{"id":"K_QUOTE","text":"\""},{"id":"K_BKSLASH","text":"|"}]},{"id":4,"key":[{"id":"K_SHIFT","text":"*Shift*","width":"160","sp":"1","nextlayer":"default"},{"id":"K_oE2","text":"|"},{"id":"K_Z","text":"Z"},{"id":"K_X","text":"\u00C1"},{"id":"K_C","text":"C"},{"id":"K_V","text":"\u00D3"},{"id":"K_B","text":"B"},{"id":"K_N","text":"N"},{"id":"K_M","text":"M"},{"id":"K_COMMA","text":"<"},{"id":"K_PERIOD","text":">"},{"id":"K_SLASH","text":"?"},{"id":"T_new_268","text":"","width":"10","sp":"10"}]},{"id":5,"key":[{"id":"K_LCONTROL","text":"alt","width":"130","sp":"1","nextlayer":"shift-alt"},{"id":"K_LOPT","text":"*Menu*","width":"140","sp":"1"},{"id":"K_SPACE","text":"","width":"930"},{"id":"K_ENTER","text":"*Enter*","width":"145","sp":"1"}]}]},{"id":"alt","row":[{"id":1,"key":[{"id":"K_1","text":""},{"id":"K_2","text":""},{"id":"K_3","text":""},{"id":"K_4","text":""},{"id":"K_5","text":""},{"id":"K_6","text":""},{"id":"K_7","text":""},{"id":"K_8","text":""},{"id":"K_9","text":""},{"id":"K_0","text":""},{"id":"K_HYPHEN","text":""},{"id":"K_EQUAL","text":""},{"id":"K_BKSP","text":"*BkSp*","width":"100","sp":"1"}]},{"id":2,"key":[{"id":"K_Q","text":"","pad":"75"},{"id":"K_W","text":""},{"id":"K_E","text":""},{"id":"K_R","text":""},{"id":"K_T","text":""},{"id":"K_Y","text":""},{"id":"K_U","text":""},{"id":"K_I","text":""},{"id":"K_O","text":""},{"id":"K_P","text":""},{"id":"K_LBRKT","text":""},{"id":"K_RBRKT","text":""},{"id":"T_new_354","text":"","width":"10","sp":"10"}]},{"id":3,"key":[{"id":"K_BKQUOTE","text":""},{"id":"K_A","text":""},{"id":"K_S","text":""},{"id":"K_D","text":""},{"id":"K_F","text":"f"},{"id":"K_G","text":""},{"id":"K_H","text":""},{"id":"K_J","text":""},{"id":"K_K","text":""},{"id":"K_L","text":""},{"id":"K_COLON","text":""},{"id":"K_QUOTE","text":""},{"id":"K_BKSLASH","text":""}]},{"id":4,"key":[{"id":"K_SHIFT","text":"*Shift*","width":"160","sp":"1","nextlayer":"shift-alt"},{"id":"K_oE2","text":""},{"id":"K_Z","text":""},{"id":"K_X","text":"x"},{"id":"K_C","text":""},{"id":"K_V","text":"v"},{"id":"K_B","text":""},{"id":"K_N","text":""},{"id":"K_M","text":""},{"id":"K_COMMA","text":""},{"id":"K_PERIOD","text":""},{"id":"K_SLASH","text":""},{"id":"T_new_380","text":"","width":"10","sp":"10"}]},{"id":5,"key":[{"id":"K_LCONTROL","text":"alt","width":"130","sp":"1","nextlayer":"default"},{"id":"K_LOPT","text":"*Menu*","width":"140","sp":"1"},{"id":"K_SPACE","text":"","width":"930"},{"id":"K_ENTER","text":"*Enter*","width":"145","sp":"1"}]}]},{"id":"shift-alt","row":[{"id":1,"key":[{"id":"K_1","text":"","sp":"2"},{"id":"K_2","text":""},{"id":"K_3","text":""},{"id":"K_4","text":""},{"id":"K_5","text":""},{"id":"K_6","text":""},{"id":"K_7","text":""},{"id":"K_8","text":""},{"id":"K_9","text":""},{"id":"K_0","text":""},{"id":"K_HYPHEN","text":""},{"id":"K_EQUAL","text":""},{"id":"K_BKSP","text":"*BkSp*","width":"100","sp":"1"}]},{"id":2,"key":[{"id":"K_Q","text":"","pad":"75"},{"id":"K_W","text":""},{"id":"K_E","text":""},{"id":"K_R","text":""},{"id":"K_T","text":""},{"id":"K_Y","text":""},{"id":"K_U","text":""},{"id":"K_I","text":""},{"id":"K_O","text":""},{"id":"K_P","text":""},{"id":"K_LBRKT","text":""},{"id":"K_RBRKT","text":""},{"id":"T_new_298","text":"","width":"10","sp":"10"}]},{"id":3,"key":[{"id":"K_BKQUOTE","text":""},{"id":"K_A","text":""},{"id":"K_S","text":""},{"id":"K_D","text":""},{"id":"K_F","text":"F"},{"id":"K_G","text":""},{"id":"K_H","text":""},{"id":"K_J","text":""},{"id":"K_K","text":""},{"id":"K_L","text":""},{"id":"K_COLON","text":""},{"id":"K_QUOTE","text":""},{"id":"K_BKSLASH","text":""}]},{"id":4,"key":[{"id":"K_SHIFT","text":"*Shift*","width":"160","sp":"1","nextlayer":"alt"},{"id":"K_oE2","text":""},{"id":"K_Z","text":""},{"id":"K_X","text":"X"},{"id":"K_C","text":""},{"id":"K_V","text":"V"},{"id":"K_B","text":""},{"id":"K_N","text":""},{"id":"K_M","text":""},{"id":"K_COMMA","text":""},{"id":"K_PERIOD","text":""},{"id":"K_SLASH","text":""},{"id":"T_new_324","text":"","width":"10","sp":"10"}]},{"id":5,"key":[{"id":"K_LCONTROL","text":"alt","width":"130","sp":"1","nextlayer":"shift"},{"id":"K_LOPT","text":"*Menu*","width":"140","sp":"1"},{"id":"K_SPACE","text":"","width":"930"},{"id":"K_ENTER","text":"*Enter*","width":"145","sp":"1"}]}]}]},"phone":{"layer":[{"id":"default","row":[{"id":1,"key":[{"id":"K_Q","text":"q"},{"id":"K_W","text":"w"},{"id":"K_E","text":"e"},{"id":"K_R","text":"r"},{"id":"K_T","text":"t"},{"id":"K_Y","text":"y"},{"id":"K_U","text":"u"},{"id":"K_I","text":"i"},{"id":"K_O","text":"o"},{"id":"K_P","text":"p"}]},{"id":2,"key":[{"id":"K_A","text":"a","pad":"50"},{"id":"K_S","text":"s"},{"id":"K_D","text":"d"},{"id":"K_F","text":"\u00E9","sk":[{"text":"f","id":"U_0066"}]},{"id":"K_G","text":"g"},{"id":"K_H","text":"h"},{"id":"K_J","text":"j"},{"id":"K_K","text":"k"},{"id":"K_L","text":"l"},{"id":"T_new_122","text":"","width":"10","sp":"10"}]},{"id":3,"key":[{"id":"K_SHIFT","text":"*Shift*","sp":"1","nextlayer":"shift"},{"id":"K_Z","text":"z"},{"id":"K_X","text":"\u00E1","sk":[{"text":"x","id":"U_0078"}]},{"id":"K_C","text":"c"},{"id":"K_V","text":"\u00F3","sk":[{"text":"v","id":"U_0076"}]},{"id":"K_B","text":"b"},{"id":"K_N","text":"n"},{"id":"K_M","text":"m"},{"id":"K_PERIOD","text":".","sk":[{"text":",","id":"K_COMMA"},{"text":"!","id":"K_1","layer":"shift"},{"text":"?","id":"K_SLASH","layer":"shift"},{"text":"'","id":"K_QUOTE"},{"text":"\"","id":"K_QUOTE","layer":"shift"},{"text":"\\","id":"K_BKSLASH"},{"text":":","id":"K_COLON","layer":"shift"},{"text":";","id":"K_COLON"}]},{"id":"K_BKSP","text":"*BkSp*","width":"100","sp":"1"}]},{"id":4,"key":[{"id":"K_NUMLOCK","text":"*123*","width":"150","sp":"1","nextlayer":"numeric"},{"id":"K_LOPT","text":"*Menu*","width":"120","sp":"1"},{"id":"K_SPACE","text":"","width":"610","sp":"0"},{"id":"K_ENTER","text":"*Enter*","width":"150","sp":"1"}]}]},{"id":"shift","row":[{"id":1,"key":[{"id":"K_Q","text":"Q"},{"id":"K_W","text":"W"},{"id":"K_E","text":"E"},{"id":"K_R","text":"R"},{"id":"K_T","text":"T"},{"id":"K_Y","text":"Y"},{"id":"K_U","text":"U"},{"id":"K_I","text":"I"},{"id":"K_O","text":"O"},{"id":"K_P","text":"P"}]},{"id":2,"key":[{"id":"K_A","text":"A","pad":"50"},{"id":"K_S","text":"S"},{"id":"K_D","text":"D"},{"id":"K_F","text":"\u00C9","sk":[{"text":"F","id":"U_0046"}]},{"id":"K_G","text":"G"},{"id":"K_H","text":"H"},{"id":"K_J","text":"J"},{"id":"K_K","text":"K"},{"id":"K_L","text":"L"},{"id":"T_new_268","text":"","width":"10","sp":"10"}]},{"id":3,"key":[{"id":"K_SHIFT","text":"*Shift*","sp":"2","nextlayer":"default"},{"id":"K_Z","text":"Z"},{"id":"K_X","text":"\u00C1","sk":[{"text":"X","id":"U_0058"}]},{"id":"K_C","text":"C"},{"id":"K_V","text":"\u00D3","sk":[{"text":"V","id":"U_0056"}]},{"id":"K_B","text":"B"},{"id":"K_N","text":"N"},{"id":"K_M","text":"M"},{"id":"K_PERIOD","text":".","layer":"default","sk":[{"text":",","id":"K_COMMA","layer":"default"},{"text":"!","id":"K_1","layer":"shift"},{"text":"?","id":"K_SLASH","layer":"shift"},{"text":"'","id":"K_QUOTE","layer":"default"},{"text":"\"","id":"K_QUOTE","layer":"shift"},{"text":"\\","id":"K_BKSLASH","layer":"default"},{"text":":","id":"K_COLON","layer":"shift"},{"text":";","id":"K_COLON","layer":"default"}]},{"id":"K_BKSP","text":"*BkSp*","sp":"1"}]},{"id":4,"key":[{"id":"K_NUMLOCK","text":"*123*","width":"150","sp":"1","nextlayer":"numeric"},{"id":"K_LOPT","text":"*Menu*","width":"120","sp":"1"},{"id":"K_SPACE","text":"","width":"610","sp":"0"},{"id":"K_ENTER","text":"*Enter*","width":"150","sp":"1"}]}]},{"id":"numeric","row":[{"id":1,"key":[{"id":"K_1","text":"1"},{"id":"K_2","text":"2"},{"id":"K_3","text":"3"},{"id":"K_4","text":"4"},{"id":"K_5","text":"5"},{"id":"K_6","text":"6"},{"id":"K_7","text":"7"},{"id":"K_8","text":"8"},{"id":"K_9","text":"9"},{"id":"K_0","text":"0"}]},{"id":2,"key":[{"id":"K_4","text":"$","pad":"50","width":"","layer":"shift"},{"id":"K_2","text":"@","layer":"shift"},{"id":"K_3","text":"#","layer":"shift"},{"id":"K_5","text":"%","layer":"shift"},{"id":"K_6","text":"&","layer":"shift"},{"id":"K_HYPHEN","text":"_","layer":"shift"},{"id":"K_EQUAL","text":"=","layer":"default"},{"id":"K_BKSLASH","text":"|","layer":"shift"},{"id":"K_BKSLASH","text":"\\","layer":"default"},{"id":"T_new_231","text":"","width":"10","sp":"10"}]},{"id":3,"key":[{"id":"K_LBRKT","text":"[","pad":"130","sk":[{"text":"\u00AB","id":"U_00AB"},{"text":"<","id":"K_COMMA","layer":"shift"},{"text":"{","id":"K_LBRKT","layer":"shift"}]},{"id":"K_9","text":"(","layer":"shift"},{"id":"K_0","text":")","layer":"shift"},{"id":"K_RBRKT","text":"]","sk":[{"id":"U_00BB","text":"\u00BB"},{"id":"K_PERIOD","text":">","layer":"shift"},{"id":"K_RBRKT","text":"}","layer":"shift"}]},{"id":"K_EQUAL","text":"+","layer":"shift"},{"id":"K_HYPHEN","text":"-"},{"id":"K_8","text":"*","layer":"shift"},{"id":"K_SLASH","text":"\/"},{"id":"K_BKSP","text":"*BkSp*","width":"","sp":"1"}]},{"id":4,"key":[{"id":"K_LOWER","text":"*abc*","width":"150","sp":"1","nextlayer":"default"},{"id":"K_LOPT","text":"*Menu*","width":"120","sp":"1"},{"id":"K_SPACE","text":"","width":"610","sp":"0"},{"id":"K_ENTER","text":"*Enter*","width":"150","sp":"1"}]}]}],"displayUnderlying":false}};this.KVER="12.0.55.0";this.gs=function(t,e) {return this.g0(t,e);};this.g0=function(t,e) {var k=KeymanWeb,r=0,m=0;if(k.KKM(e,16384,226)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"\\");}}else if(k.KKM(e,16400,226)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"|");}}else if(k.KKM(e,16384,32)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t," ");}}else if(k.KKM(e,16400,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"!");}}else if(k.KKM(e,16400,222)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"\"");}}else if(k.KKM(e,16400,51)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"#");}}else if(k.KKM(e,16400,52)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"$");}}else if(k.KKM(e,16400,53)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"%");}}else if(k.KKM(e,16400,55)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"&");}}else if(k.KKM(e,16384,222)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"'");}}else if(k.KKM(e,16400,57)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"(");}}else if(k.KKM(e,16400,48)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,")");}}else if(k.KKM(e,16400,56)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"*");}}else if(k.KKM(e,16400,187)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"+");}}else if(k.KKM(e,16384,188)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,",");}}else if(k.KKM(e,16384,189)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"-");}}else if(k.KKM(e,16384,190)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,".");}}else if(k.KKM(e,16384,191)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"/");}}else if(k.KKM(e,16384,48)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"0");}}else if(k.KKM(e,16384,49)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"1");}}else if(k.KKM(e,16384,50)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"2");}}else if(k.KKM(e,16384,51)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"3");}}else if(k.KKM(e,16384,52)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"4");}}else if(k.KKM(e,16384,53)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"5");}}else if(k.KKM(e,16384,54)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"6");}}else if(k.KKM(e,16384,55)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"7");}}else if(k.KKM(e,16384,56)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"8");}}else if(k.KKM(e,16384,57)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"9");}}else if(k.KKM(e,16400,186)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,":");}}else if(k.KKM(e,16384,186)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,";");}}else if(k.KKM(e,16400,188)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"<");}}else if(k.KKM(e,16384,187)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"=");}}else if(k.KKM(e,16400,190)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,">");}}else if(k.KKM(e,16400,191)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"?");}}else if(k.KKM(e,16400,50)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"@");}}else if(k.KKM(e,16640,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"A");}}else if(k.KKM(e,16912,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"A");}}else if(k.KKM(e,16640,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"B");}}else if(k.KKM(e,16912,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"B");}}else if(k.KKM(e,16640,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"C");}}else if(k.KKM(e,16912,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"C");}}else if(k.KKM(e,16640,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"D");}}else if(k.KKM(e,16912,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"D");}}else if(k.KKM(e,16640,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"E");}}else if(k.KKM(e,16912,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"E");}}else if(k.KKM(e,16464,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"F");}}else if(k.KKM(e,16640,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"É");}}else if(k.KKM(e,16912,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"É");}}else if(k.KKM(e,16640,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"G");}}else if(k.KKM(e,16912,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"G");}}else if(k.KKM(e,16640,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"H");}}else if(k.KKM(e,16912,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"H");}}else if(k.KKM(e,16640,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"I");}}else if(k.KKM(e,16912,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"I");}}else if(k.KKM(e,16640,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"J");}}else if(k.KKM(e,16912,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"J");}}else if(k.KKM(e,16640,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"K");}}else if(k.KKM(e,16912,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"K");}}else if(k.KKM(e,16640,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"L");}}else if(k.KKM(e,16912,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"L");}}else if(k.KKM(e,16640,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"M");}}else if(k.KKM(e,16912,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"M");}}else if(k.KKM(e,16640,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"N");}}else if(k.KKM(e,16912,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"N");}}else if(k.KKM(e,16640,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"O");}}else if(k.KKM(e,16912,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"O");}}else if(k.KKM(e,16640,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"P");}}else if(k.KKM(e,16912,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"P");}}else if(k.KKM(e,16640,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Q");}}else if(k.KKM(e,16912,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Q");}}else if(k.KKM(e,16640,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"R");}}else if(k.KKM(e,16912,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"R");}}else if(k.KKM(e,16640,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"S");}}else if(k.KKM(e,16912,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"S");}}else if(k.KKM(e,16640,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"T");}}else if(k.KKM(e,16912,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"T");}}else if(k.KKM(e,16640,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"U");}}else if(k.KKM(e,16912,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"U");}}else if(k.KKM(e,16464,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"V");}}else if(k.KKM(e,16640,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ó");}}else if(k.KKM(e,16912,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Ó");}}else if(k.KKM(e,16640,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"W");}}else if(k.KKM(e,16912,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"W");}}else if(k.KKM(e,16464,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"X");}}else if(k.KKM(e,16640,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Á");}}else if(k.KKM(e,16912,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Á");}}else if(k.KKM(e,16640,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Y");}}else if(k.KKM(e,16912,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Y");}}else if(k.KKM(e,16640,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Z");}}else if(k.KKM(e,16912,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"Z");}}else if(k.KKM(e,16384,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"[");}}else if(k.KKM(e,16384,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"\\");}}else if(k.KKM(e,16384,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"]");}}else if(k.KKM(e,16400,54)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"^");}}else if(k.KKM(e,16400,189)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"_");}}else if(k.KKM(e,16384,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"`");}}else if(k.KKM(e,16896,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"a");}}else if(k.KKM(e,16656,65)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"a");}}else if(k.KKM(e,16896,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"b");}}else if(k.KKM(e,16656,66)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"b");}}if(m) {}else if(k.KKM(e,16896,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"c");}}else if(k.KKM(e,16656,67)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"c");}}else if(k.KKM(e,16896,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"d");}}else if(k.KKM(e,16656,68)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"d");}}else if(k.KKM(e,16896,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"e");}}else if(k.KKM(e,16656,69)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"e");}}else if(k.KKM(e,16448,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"f");}}else if(k.KKM(e,16896,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"é");}}else if(k.KKM(e,16656,70)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"é");}}else if(k.KKM(e,16896,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"g");}}else if(k.KKM(e,16656,71)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"g");}}else if(k.KKM(e,16896,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"h");}}else if(k.KKM(e,16656,72)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"h");}}else if(k.KKM(e,16896,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"i");}}else if(k.KKM(e,16656,73)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"i");}}else if(k.KKM(e,16896,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"j");}}else if(k.KKM(e,16656,74)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"j");}}else if(k.KKM(e,16896,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"k");}}else if(k.KKM(e,16656,75)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"k");}}else if(k.KKM(e,16896,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"l");}}else if(k.KKM(e,16656,76)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"l");}}else if(k.KKM(e,16896,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"m");}}else if(k.KKM(e,16656,77)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"m");}}else if(k.KKM(e,16896,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"n");}}else if(k.KKM(e,16656,78)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"n");}}else if(k.KKM(e,16896,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"o");}}else if(k.KKM(e,16656,79)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"o");}}else if(k.KKM(e,16896,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"p");}}else if(k.KKM(e,16656,80)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"p");}}else if(k.KKM(e,16896,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"q");}}else if(k.KKM(e,16656,81)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"q");}}else if(k.KKM(e,16896,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"r");}}else if(k.KKM(e,16656,82)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"r");}}else if(k.KKM(e,16896,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"s");}}else if(k.KKM(e,16656,83)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"s");}}else if(k.KKM(e,16896,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"t");}}else if(k.KKM(e,16656,84)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"t");}}else if(k.KKM(e,16896,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"u");}}else if(k.KKM(e,16656,85)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"u");}}else if(k.KKM(e,16448,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"v");}}else if(k.KKM(e,16896,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ó");}}else if(k.KKM(e,16656,86)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"ó");}}else if(k.KKM(e,16896,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"w");}}else if(k.KKM(e,16656,87)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"w");}}else if(k.KKM(e,16448,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"x");}}else if(k.KKM(e,16896,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"á");}}else if(k.KKM(e,16656,88)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"á");}}else if(k.KKM(e,16896,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"y");}}else if(k.KKM(e,16656,89)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"y");}}else if(k.KKM(e,16896,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"z");}}else if(k.KKM(e,16656,90)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"z");}}else if(k.KKM(e,16400,219)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"{");}}else if(k.KKM(e,16400,220)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"|");}}else if(k.KKM(e,16400,221)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"}");}}else if(k.KKM(e,16400,192)) {if(1){r=m=1;k.KDC(0,t);k.KO(-1,t,"~");}}return r;};}