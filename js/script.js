(function (win, doc) {
    "use strict";


    function app() {
        var $container = doc.querySelector(".container");
        var valueShop = 0;
        var elements;
        var shopValueActualParcels = 0;
        var shopValueActualTotal = 0;

        return {
            init: function init() {
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
                    return elements = textJson;
                }
            },

            writeItens: function writeItens(data) {
                for (var i = 0; i < data.items.length; i++) {
                    this.createItem(data, i);
                }

            },

            formatingGold: function formatingGold(numero) {
                var numero = numero.toFixed(2).split(".");
                numero[0] = "R$ " + numero[0].split("/(?=(?:...)*$)/").join(".");
                return numero.join(",");
            },




            createItem: function createItem(data, i) {

                var valorTotal = this.formatingGold(data.items[i].product.price.value);
                var valorParcelas = this.formatingGold(data.items[i].product.price.installmentValue);
                var parcelas = data.items[i].product.price.installments
                var nameProduct = data.items[i].product.name;
                var idProduct = data.items[i].product.id;

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
                $photoBigImg.className = "img-responsive zoom";

                $imgBox1.addEventListener("click", function () {
                    $photoBigImg.src = this.src;
                    setTimeout(function () {
                        $photoBigImg.src = data.items[i].product.images[0];
                    }, 15000);
                }, false);
                $imgBox2.addEventListener("click", function () {
                    $photoBigImg.src = this.src;
                    setTimeout(function () {
                        $photoBigImg.src = data.items[i].product.images[0];
                    }, 15000);
                }, false);
                $imgBox3.addEventListener("click", function () {
                    $photoBigImg.src = this.src;
                    setTimeout(function () {
                        $photoBigImg.src = data.items[i].product.images[0];
                    }, 15000);
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
                $productNameDiv.textContent = nameProduct;

                var $inlineBlockDetailsDiv = doc.createElement("div");
                $inlineBlockDetailsDiv.classList = "inline-block-details";
                $productDetails.appendChild($inlineBlockDetailsDiv);

                var $produtVal = doc.createElement("p");
                $produtVal.classList = "produt-val";
                $inlineBlockDetailsDiv.appendChild($produtVal);
                $produtVal.textContent = `${parcelas}x ${valorParcelas}`;

                var $buttonCar = doc.createElement("button");
                $buttonCar.classList = "btn btn-green ml10";
                $buttonCar.textContent = "Adicionar ao Carrinho";
                $produtVal.appendChild($buttonCar);

                $buttonCar.addEventListener("click", addToShop, false);

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
                

                function addToShop() {
                    setInterval(function () {
                        $pCounter.textContent = valueShop;
                        
                        
                        
                        shopValueActualParcels <= 0 ? $totalParcels.textContent = "R$: 0,00" : $totalParcels.textContent = app().formatingGold(shopValueActualParcels);

                        shopValueActualTotal <= 0 ? $totalValor.textContent = "R$: 0,00" : $totalValor.textContent = app().formatingGold(shopValueActualTotal);
                    }, 1000);
                    

                    var $counterCar = doc.createElement("div");
                    $counterCar.classList = "counter-product";
                    doc.querySelector("[data-js='menuDiv']").appendChild($counterCar);

                    var $pCounter = doc.createElement("p");
                    $pCounter.classList = "text-center";
                    $counterCar.appendChild($pCounter);

                    var $shop = doc.querySelector("[data-js='shop']");
                    var $carProduct = doc.createElement("div");
                    $carProduct.classList = "car-product";
                    $shop.appendChild($carProduct);


                    var $close = doc.createElement("span");
                    $close.classList = "close";
                    $close.textContent = "X";
                    $carProduct.appendChild($close);

                    $close.addEventListener("click", function () {
                        valueShop--;
                        $shop.removeChild($carProduct);
                        shopValueActualTotal -= data.items[i].product.price.value;
                        shopValueActualParcels -= data.items[i].product.price.installmentValue;
                        


                    }, false);

                    var $boxCar = doc.createElement("div");
                    $boxCar.classList = "box-car";
                    $carProduct.appendChild($boxCar);

                    var $imgCar = doc.createElement("img");
                    $imgCar.classList = "img-responsive";
                    $imgCar.src = data.items[i].product.images[0];
                    $boxCar.appendChild($imgCar);

                    var $carDetailsProduct = doc.createElement("div");
                    $carDetailsProduct.classList = "box-details";
                    $carProduct.appendChild($carDetailsProduct);

                    var $productCarName = doc.createElement("p");
                    $productCarName.classList = "product-car-name";
                    $carDetailsProduct.appendChild($productCarName);
                    $productCarName.textContent = nameProduct;

                    var $productCarParcels = doc.createElement("p");
                    $productCarParcels.classList = "product-car-parcels";
                    $productCarParcels.textContent = `${parcelas} x de ${valorParcelas}`
                    $carDetailsProduct.appendChild($productCarParcels);


                    var $productCarTotal = doc.createElement("p");
                    $productCarTotal.classList = "product-car-val-total";
                    $productCarTotal.textContent = `ou ${valorTotal} à vista`;
                    $carDetailsProduct.appendChild($productCarTotal);

                    valueShop++;
                    shopValueActualTotal += data.items[i].product.price.value;
                    shopValueActualParcels += data.items[i].product.price.installmentValue

                    var $totalParcels = doc.querySelector("[data-js='totalParcels']");
                    var $totalValor = doc.querySelector("[data-js='totalVal']");


                }


            }




        }
    }

    app().init();




})(window, document);
