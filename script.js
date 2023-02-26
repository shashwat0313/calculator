$(".button").on("mouseenter", (inside) => {
  inside.target.style.backgroundColor = "yellow";
});
$(".button").on("mouseleave", (inside) => {
  inside.target.style.backgroundColor = "red";
});
$(".button").on("click", (e) => {
  process(e.target.innerHTML);
});
function process(str) {
  const expr = $("#expr");
  let prev = expr.html();
  if(str=="CLR"){
    //reset
    $("#answer").html("0");
    $("#msg").html("characters: 1/15");
    expr.html("0");
    return;
  }
  if(str=="DEL"){
    if(prev.length == 1 || prev.length == 0){
      expr.html("0");
      $("#msg").html("characters: 1/15");
      return;
    }
    if(prev != "0"){
      //backspace function
      prev = prev.slice(0, length-1)
      expr.html(prev);
      $("#msg").html("characters: " + expr.html().length + "/15");
      return;
    }
  }
  if(str == '='){
    $("#answer").html(eval(expr.html()));
    $("#msg").html("characters: 1/15");
    expr.html("0");
    return;
  }
  if(prev.length >= 15){
    alert("too many characters, resetting.")
    $("#answer").html("0");
    $("#msg").html("characters: 1/15");
    expr.html("0");
    return;
  }
  if(prev==0){
    $("#msg").html("characters: " + expr.html().length + "/15");
    expr.html(str);
  }
  else{
    const newStr = prev + str;
    expr.html(newStr);
    $("#msg").html("characters: " + expr.html().length + "/15");
  }
}
$(document).on("keydown", (keydownEvent) => {
  // console.log(keydownEvent.which);
  let shiftPressed = keydownEvent.shiftKey;
  let k = keydownEvent.which;
  let shiftPlus = k == 187 && shiftPressed;
  let shiftMult = k == 56 && shiftPressed;
  let shiftMod = k == 53 && shiftPressed;
  if(k==8){
    process("DEL");
    $("#btndel").css("background-color", "yellow");
  }
  if (k == 107 || shiftPlus) {
    $("#btnAdd").css("background-color", "yellow");
    process('+');
  }
  else if (k == 109 || k == 189 && !shiftPressed) {
    $("#btn-").css("background-color", "yellow");
    process('-');
  }
  else if (k == 106 || shiftMult) {
    $("#btnMul").css("background-color", "yellow");
    process('*');
  }
  else if (k == 111 || k == 191 && !shiftPressed) {
    $("#btndiv").css("background-color", "yellow");
    process('/');
  }
  else if (k == 187 || k == 13) {
    // console.log(k);  
    $("#btnEq").css("background-color", "yellow");
    process('=');
  }
  else if (shiftMod) {
    $("#btnMod").css("background-color", "yellow");
    process('%');
  }
  else if (k >= 96 && k <= 105) {
    $("#btn" + (k - 96).toString(10)).css("background-color", "yellow");
    process((k - 96).toString(10));
  }
  else if(k>=48 && k<=57){
    $("#btn" + (k - 48).toString(10)).css("background-color", "yellow");
    process((k - 48).toString(10));
  }
  else{
    return;
  }
});
$(document).on("keyup", (keyupEvent) => {
  $(".button").css("background-color", "red");
});