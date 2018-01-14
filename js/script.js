(function (win, doc) {
    "use strict";


    function app() {
        var $container = doc.querySelector(".container");

        return {
            init: function init() {
                console.log("Iniciou app");
                console.log($container);
                this.connect();

            },
            connect: function connect() {
                var ajax = new XMLHttpRequest();
                ajax.open("GET", "resources/data.json");
                ajax.send();
                ajax.addEventListener("readystatechange", this.responseConnection, false);
            },

            responseConnection: function responseConnection() {
                if (this.status === 200 && this.readyState === 4) {
                    var textJson = JSON.parse(this.responseText);
                    app().writeItens(textJson);
                }
            },

            writeItens: function writeItens(data) {
                for (var i = 0; i < data.items.length; i++) {
                    this.createItem(data,i);
                }
                
            },

            formatingGold: function formatingGold(numero) {
                var numero = numero.toFixed(2).split(".");
                numero[0] = "R$ " + numero[0].split("/(?=(?:...)*$)/").join(".");
                return numero.join(",");
            },
            
            createItem : function createItem(data,i){
                
                    var $product = doc.createElement("div");
                    $product.className = "products";
                    $container.appendChild($product);
                    var $photoProducts = doc.createElement("div");
                    $photoProducts.classList = "photos-products"
                    $product.appendChild($photoProducts);
                    var $flexColumn = doc.createElement("div");
                    $flexColumn.classList = "flex-column";
                    $photoProducts.appendChild($flexColumn);

                    var $box1 = doc.createElement("div");
                    $box1.classList = "box";
                    $flexColumn.appendChild($box1);
                    var $imgBox1 = doc.createElement("img");
                    $imgBox1.className = "img-responsive";
                    $box1.appendChild($imgBox1);
                    $imgBox1.src = data.items[i].product.images[1];
            
                    var $box2 = doc.createElement("div");
                    $box2.classList = "box";
                    $flexColumn.appendChild($box2);
                    var $imgBox2 = doc.createElement("img");
                    $imgBox2.className = "img-responsive";
                    $box2.appendChild($imgBox2);
                    $imgBox2.src = data.items[i].product.images[2];

                    var $box3 = doc.createElement("div");
                    $box3.classList = "box";
                    $flexColumn.appendChild($box3);
                    var $imgBox3 = doc.createElement("img");
                    $imgBox3.className = "img-responsive";
                    $box3.appendChild($imgBox3);
                    $imgBox3.src = data.items[i].product.images[3];

                    var $photoBig = doc.createElement("div");
                    $photoProducts.appendChild($photoBig);
                    $photoBig.className = "photo-big";
                    var $photoBigImg = doc.createElement("img");
                    $photoBig.appendChild($photoBigImg);
                    $photoBigImg.src = data.items[i].product.images[0];
                    $photoBigImg.className = "img-responsive";
                    
                    $imgBox1.addEventListener("click", function () {   
                        $photoBigImg.src = this.src;
                    }, false);
                    $imgBox2.addEventListener("click", function () {   
                        $photoBigImg.src = this.src;
                    }, false);
                    $imgBox3.addEventListener("click", function () {   
                        $photoBigImg.src = this.src;
                    }, false);


                    var $productDetails = doc.createElement("div");
                    $productDetails.classList = "products-details";
                    $product.appendChild($productDetails);

                    var $productNameDiv = doc.createElement("div");
                    $productNameDiv.classList = "product-name";
                    $productDetails.appendChild($productNameDiv);

                    var $productnameP = doc.createElement("p");
                    $productnameP.classList = "produto-name";
                    $productNameDiv.appendChild($productnameP);
                    $productNameDiv.textContent = data.items[i].product.name

                    var $inlineBlockDetailsDiv = doc.createElement("div");
                    $inlineBlockDetailsDiv.classList = "inline-block-details";
                    $productDetails.appendChild($inlineBlockDetailsDiv);

                    var $produtVal = doc.createElement("p");
                    $produtVal.classList = "produt-val";
                    $inlineBlockDetailsDiv.appendChild($produtVal);
                    var valorTotal = this.formatingGold(data.items[i].product.price.value);
                    var valorParcelas = this.formatingGold(data.items[i].product.price.installmentValue);
                    var parcelas = data.items[i].product.price.installments
                    $produtVal.textContent = `${parcelas}x ${valorParcelas}`;

                    var $buttonCar = doc.createElement("button");
                    $buttonCar.classList = "btn btn-green ml10";
                    $buttonCar.textContent = "Adicionar ao Carrinho";
                    $produtVal.appendChild($buttonCar);

                    var $smallText = doc.createElement("small");
                    $inlineBlockDetailsDiv.appendChild($smallText);
                    $smallText.textContent = "ou ";

                    var $spanVal = doc.createElement("span");
                    $spanVal.classList = "or-vista";
                    $smallText.appendChild($spanVal);
                    $spanVal.textContent = valorTotal;

                    var $smallTextEnd = doc.createElement("small");
                    $inlineBlockDetailsDiv.appendChild($smallTextEnd);
                    $smallTextEnd.textContent = " à vista";

                    var $aboutProduct = doc.createElement("div");
                    $aboutProduct.classList = "about-product";
                    $productDetails.appendChild($aboutProduct);
                    $aboutProduct.textContent = data.items[i].product.description


                    if (data.items[i].product.images.length <= 1) {
                        $photoProducts.removeChild($flexColumn);
                        $photoBig.style = "width:100%; height:100%; margin-left:0; margin-bottom:0px;"
                    }
                    

                }
            
            
            

        }
    }

    app().init();




})(window, document);
