var Note = (function(){
    var dragEL; //保存被拖拽的对象
    //构造便签的构造函数
    function Note(target,text,color,className,keyObj,key) {
      //初始化要用的参数
      this.target = target;
      this.text = text;
      this.color = color;
      this.className = className;
      //设置随机key和本地存储
      keyObj = keyObj || {}
      if(!keyObj[key]){
        var key = parseInt(Math.random()*1000)
        while(keyObj[key]==true){
          key = parseInt(Math.random()*1000);
        }
        keyObj[key] = true;
        var data = {color:this.color,text:this.text.data};
        window.localStorage.setItem(key, JSON.stringify(data));
      }
      this.key = key;
      this.keyObj = keyObj;
      //初始化
      this.init();
    }
    Note.prototype.init = function() {
      this.initDom(); //初始化DOM结构
      this.initEvent(); //初始化事件
    }
    Note.prototype.initDom = function(){
       var div = document.createElement("div");
        div.draggable = "ture";
        div.className = this.className;
        var header = document.createElement("header");
        header.innerHTML="×";
        div.appendChild(header);
        div.appendChild(this.text);
        div.style.background="linear-gradient(to left top, transparent 50%, rgba(0, 0, 0, 0.4) 0px) no-repeat 100% 100% / 2em 2em , linear-gradient(-45deg, transparent 1.4em, "+this.color+" 0px) " ;
        this.target.appendChild(div);  //添加
        this.dom = div;
    }
    Note.prototype.initEvent = function(){
      //点击header中的×删除note的事件
       this.dom.addEventListener("click",function(event){
            if (event.target.tagName.toLowerCase() == "header"){
                this.target.removeChild(this.dom);
                 window.localStorage.removeItem(this.key);
                 delete this.keyObj[this.key];
            }
        }.bind(this));
      //拖拽排序事件
      this.dom.addEventListener("dragstart",function(e){
          this.style.opacity = 0.5;
          dragEL = e.target;
          e.dataTransfer.effectAllowed="move";
      })
      this.dom.addEventListener("dragend",function(e){
          this.style.opacity = 1;
      })
      this.dom.addEventListener("dragover",function(e){
          if(e.preventDefault){
            e.preventDefault();
          }
        })
      this.dom.addEventListener("drop",function(e){   
          var column = this.target.children;
          if(index(e.target,column)>index(dragEL,column)){
              this.target.insertBefore(dragEL,e.target.nextSibling);
          }else{
            this.target.insertBefore(dragEL,e.target);
          }
      }.bind(this))

      function index(current,obj){
        var len = obj.length;
        while(len--){
          if(current == obj[len]){
            return len;
          }
        }
      }
    }
    return Note;
  })();
