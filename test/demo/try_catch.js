
try {
    window.a.b !== 2
 }
 catch(err){
      console.log('1<<<<<<',err.message, '>>>>>>>>') // 可执行
      try{
        var obj = {}
        obj.push('sdfsdf')
      } catch (E) {
        console.log(2, E.message);
        var obj = []
        obj.push('sdfsdf')
        console.log(3, obj)
      }
 }