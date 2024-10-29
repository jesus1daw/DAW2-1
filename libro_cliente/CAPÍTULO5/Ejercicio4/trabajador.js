var i = 0;

function timedCount() {
 i = i + 2;
 postMessage(i);
 setTimeout("timedCount()",1000);
}

timedCount();
