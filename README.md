# CalculatorRepo
Note : 
- File Index HARUS dijalankan melalui perintah "gulp serve" (tanpa tanda petik)
- Pengeditan HTML HARUS melalui File Index.jade (silahkan search difoldernya)
- Pengeditan CSS di file styles.styl dan javascript di main.js (silahkan search difoldernya)
- untuk petunjuk push dan pull bisa dibaca di file "Petunjuk Pull & Push.md"
- Cek apakah hari ini ada push atau tidak karna bisa saja salah satu member berhalangan untuk melakukan push ,
  jika sampai jam 11 malam dalam suatu hari tidak ada yang push maka diwajibkan ambil inisiatif untuk melakukan push file apa saja
  boleh melalui web github ini (tidak perlu melalui git bash namun diusahakan pakai gitbash agar rapi commitnya) 
  
 
Note 2 :
- Jika terjadi kesalahan push maka bisa di undo dengan :
  1) git reset --hard <kode commit nya> , contoh : git reset --hard bf34k7232gehjghjgdg2t62382e8
  2) git push -f origin HEAD^:nama branch yang ingin di undo , contoh : git push -f origin HEAD^:master
  3) git reset -f --soft HEAD~
