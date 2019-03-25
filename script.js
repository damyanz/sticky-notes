function _Magnet() {
  this.html_element = null;
  this.create = function() {
    var div = document.createElement("div");
    var usun = document.createElement("div");
    var rozmiar = document.createElement("div");
    var edit = document.createElement("div");
    usun.className = "x";
    rozmiar.className = "resize";
    edit.className = "edit";
    startcounter++;

    this.klasa = "magnet";
    div.className = this.klasa;

    this.lewa = 30 + startcounter * 20 + "px";
    this.gora = 30 + startcounter * 20 + "px";
    this.stos = fridge.collection.length;

    div.style.left = this.lewa;
    div.style.top = this.gora;
    div.style.zIndex = this.stos;

    this.text = "Lorem ipsum dolor sit amet";
    this.szer = "200px";
    this.wyso = "200px";

    div.innerHTML = "<div class='innertext'>Lorem ipsum</div>";
    div.style.width = this.szer;
    div.style.height = this.wyso;

    magnes = this;

    blokada = false;
    rozmiar.addEventListener("mousedown", function() {
      blokada = true;
      var down = function(e) {
        posx = e.clientX;
        posy = e.clientY;
        szerokosc = parseInt(div.style.width);
        wysokosc = parseInt(div.style.height);
      };
      var move = function(e) {
        var roznicax = e.clientX - posx;
        var roznicay = e.clientY - posy;

        magnes.szer = szerokosc + roznicax + "px";
        magnes.wyso = wysokosc + roznicay + "px";

        div.style.width = magnes.szer;
        div.style.height = magnes.wyso;
      };
      var up = function() {
        blokada = false;

        document.body.removeEventListener("mousemove", move);
        document.body.removeEventListener("mouseup", up);
        document.body.removeEventListener("mousedown", down);
      };
      document.body.addEventListener("mousedown", down);
      document.body.addEventListener("mousemove", move);
      document.body.addEventListener("mouseup", up);
    });
    div.addEventListener("mousedown", function() {
      if (blokada == false) {
        var down = function(e) {
          posx = e.clientX;
          posy = e.clientY;
          startcounter = 0;
          pozycjax = parseInt(div.style.left);
          pozycjay = parseInt(div.style.top);
        };
        var move = function(e) {
          var roznicax = e.clientX - posx;
          var roznicay = e.clientY - posy;

          magnes.lewa = pozycjax + roznicax;
          magnes.gora = pozycjay + roznicay;

          div.style.left = magnes.lewa;
          div.style.top = magnes.gora;
        };
        var up = function() {
          document.body.removeEventListener("mousemove", move);
          document.body.removeEventListener("mouseup", up);
          document.body.removeEventListener("mousedown", down);
        };

        document.body.addEventListener("mousedown", down);
        document.body.addEventListener("mousemove", move);
        document.body.addEventListener("mouseup", up);
      }

      for (var i = 0; i < fridge.collection.length; i++) {
        if (fridge.collection[i].html_element == this) {
          fridge.collection.push(fridge.collection.splice(i, 1).shift());
        }
        fridge.collection[i].html_element.style.zIndex = i;
      }
    });
    usun.addEventListener("mousedown", function() {
      document.body.removeChild(div);
      fridge.collection.splice(this, 1);
    });
    edit.addEventListener("mousedown", () => {
      var area = document.createElement("textarea");
      var lock = document.getElementsByClassName("lock")[0];
      lock.style.visibility = "visible";
      area.classList.add("area");
      document.body.appendChild(area);

      var editor = tinymce.init({
        selector: "textarea",
        width: 600,
        height: 300,
        init_instance_callback: () => {
          var under = document.getElementsByClassName("mce-statusbar")[0];
          var close = document.createElement("span");
          close.classList.add("closebutton");
          close.innerText = "ZAPISZ I ZAMKNIJ";
          under.appendChild(close);
          under.addEventListener("mousedown", () => {
            console.log(div);
            div.children[0].innerHTML = tinymce.activeEditor.getContent();
            lock.style.visibility = "hidden";
            var editwindow = document.getElementsByClassName("mce-tinymce")[0];
            editwindow.parentNode.removeChild(editwindow);
            area.parentNode.removeChild(area);
          });
        }
      });
    });

    this.html_element = div;
    document.body.appendChild(div);
    div.appendChild(usun);
    div.appendChild(rozmiar);
    div.appendChild(edit);
  };
  this.create();
}

document.addEventListener("DOMContentLoaded", function(event) {
  startcounter = 0;
  fridge = {
    collection: [],
    add: function() {
      this.collection.push(new _Magnet());
    }
  };
});
