ShellWindows.Count
ShellWindows.item(i)
ShellWindows[i].FullName
ShellWindows[i].LocationURL
Document.Application
Document.ViewOptions
Document.Folder
Document.FocusedItem
Document.SelectItem()//
Document.CurrentViewMode
ShellWindows[i].Document.FocusedItem.Path
ShellWindows[i].Document.SelectedItems().Count
ShellWindows[i].Document.SelectedItems().Item(j).Path
alert(com.getobj().item(0).Document.SelectItem(com.getobj().item(0).Document.SelectedItems().Item(2),16))



com=GetObject("script:H:/github/forie/2.wsc");
(function(){
    function com::namechanged(){
      alert(333)
    }
})()
com.lowercaseName=44
 

alert(com.add(2,7))
//alert(com.lowercaseName)
alert(com.getobj().item(0).Document.SelectItem(com.getobj().item(0).Document.SelectedItems().Item(2),16))


Python for Windows
import win32com.client
# look in the makepy output for IE for the 'CLSIDToClassMap'
# dictionary, and find the entry for 'ShellWindows'
clsid='{9BA05972-F6A8-11CF-A442-00A0C90A8F39}'
ShellWindows=win32com.client.Dispatch(clsid)
 
# a busy state can be detected:
# while ShellWindows[0].Busy == False:
# go in for-loop here
 
for i in range(ShellWindows.Count):
    print ShellWindows[i].LocationURL
    for j in range(ShellWindows[i].Document.SelectedItems().Count):
        print '  ', ShellWindows[i].Document.SelectedItems().Item(j).Path
 
# Be careful: Internet Explorer uses also the same CLSID. You should implement a detection!