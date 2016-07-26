#include <misc.au3>
HotKeySet("!{q}", "restart")       ; alt + q
HotKeySet("^!{q}", "quitAndClose") ; alt + ctrl + q

Opt("WinTitleMatchMode", 2)

While True
   sleep(100)
WEnd

Func restart()
   WinKill("cmd")
   $CMD = "node index.js&pause"
   Run(@ComSpec & " /c " & $CMD)
EndFunc

func quitAndClose()
   WinKill("cmd")
   Exit
EndFunc