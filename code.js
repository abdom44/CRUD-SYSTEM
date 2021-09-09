var prodName = document.getElementById('productName');
var prodCategory = document.getElementById('productCategory');
var prodPrice = document.getElementById('productPrice');
var prodDesc =document.getElementById('productDescription');
var searchInput = document.getElementById('searchInput');

if (localStorage.getItem('allProduct') == null) {
    var productContainer = []; // JSON -- array of objects --js object notations
}
else {
    var productContainer = JSON.parse(localStorage.getItem('allProduct'));

}
displayProducts();

function addProduct() {
    var product = {
        name : prodName.value,
        category : prodCategory.value,
        price : prodPrice.value,
        desc : prodDesc.value
    };
    productContainer.push(product);
    localStorage.setItem('allProduct', JSON.stringify(productContainer));
    displayProducts();
    clearProduct();
}
function displayProducts() {
    var str ='';
    for (let i = 0; i < productContainer.length; i++) {
        str+=`<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].desc}</td>
        <td>
            <button class="btn btn-secondary" onclick="updateProduct(${i})"  value="">
                <i class="fas fa-edit"></i>

            </button>
        </td>
        <td>
        <button class="btn btn-danger" onclick="deleteProduct(${i})")>

        <i class="fas fa-trash"></i>
    </button>
        </td>

    </tr>`;
        
    }
    document.getElementById('showProduct').innerHTML =str;
}
function clearProduct(){
    prodName.value= '';
    prodCategory.value= '';
    prodPrice.value= '';
    prodDesc.value= '';
}
function serachProduct() {
    var str='',hilightedName=false;
    for (let i = 0; i < productContainer.length; i++) {
        var allName='';
        if(productContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase())== true){
            for(var k =0 ,j=0;k<productContainer[i].name.length ;k++){  
               if (j<searchInput.value.length&&(productContainer[i].name.charAt(k) == searchInput.value.charAt(j).toLowerCase() || 
               productContainer[i].name.charAt(k) == searchInput.value.charAt(j).toUpperCase())){
                  
                
                    for(var g=k,h=j;j<searchInput.value.length-h ;g++){//make sure that the all name is already start in (j)
                        if (productContainer[i].name.charAt(g) == searchInput.value.charAt(h).toLowerCase() || 
                        productContainer[i].name.charAt(g) == searchInput.value.charAt(h).toUpperCase()){
                            hilightedName=true;
                            h++;
                        }
                        else{
                            hilightedName=false;
                            j=0;
                            break;
                        }
                   }
                   if (hilightedName==true) {
                       allName+="<span class='bg-warning'>" + productContainer[i].name.charAt(k) + "</span>";
                       j++; 
                   }
                   else{
                       allName+= productContainer[i].name.charAt(k)
                    }
               }
               else{
                allName+= productContainer[i].name.charAt(k)
               }
            } 
            str+=`<tr>
        <td>${i}</td>
        <td>${allName}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].desc}</td>
        <td>
            <button class="btn btn-secondary" onclick="updateProduct(${i})" value="">
                <i class="fas fa-edit"></i>

            </button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct(${i})")>

                <i class="fas fa-trash"></i>
            </button>
        </td>

            </tr>`;
        }
        document.getElementById('showProduct').innerHTML =str;
    }

}
function deleteProduct(i) {
    productContainer.splice(i,1);
    localStorage.setItem('allProduct',JSON.stringify(productContainer));
    displayProducts();
    console.log(i);
}
function updateProduct(i) {
    prodName.value = productContainer[i].name;
    prodCategory.value = productContainer[i].category;
    prodPrice.value =productContainer[i].price;
    prodDesc.value = productContainer[i].desc;
    document.getElementById('addProductBtn').innerHTML= 'Update Product';
    document.getElementById('addProductBtn').setAttribute('onclick',`editProduct(${i})`)
    document.getElementById('addProductBtn').setAttribute('class',"btn btn-secondary mt-3")
}
function editProduct(i) {
    productContainer[i].name =prodName.value;
    productContainer[i].category =prodCategory.value;
    productContainer[i].price =prodPrice.value;
    productContainer[i].desc =prodDesc.value;
    localStorage.setItem('allProduct',JSON.stringify(productContainer));
    displayProducts();
    clearProduct();
    document.getElementById('addProductBtn').innerHTML= 'Add Product';
    document.getElementById('addProductBtn').setAttribute('onclick',`addProduct()`)
    document.getElementById('addProductBtn').setAttribute('class',"btn btn-outline-info mt-3")

}

