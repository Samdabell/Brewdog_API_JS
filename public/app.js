var allBeers = []

var app = function(){
  var url = 'https://api.punkapi.com/v2/beers'
  makeRequest(url, requestComplete);

}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  allBeers = beers;
  // populateList(beers);

  var beerSelect = document.getElementById('beer-select');
  populateSelect(beerSelect, beers);
  beerSelect.addEventListener('change', selectBeer);
}

var populateList = function(beers){
  var ul = document.getElementById('beer-list');
  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  }

  beers.forEach(function(beer){
    getName(beer, ul);
    getPic(beer, ul);
    getIngredients(beer, ul);
  })
}

var getName = function(beer, ul){
  var li = document.createElement('li');
  li.innerText = "Name: " + beer.name;
  ul.appendChild(li)
}

var getPic = function(beer, ul){
  var li = document.createElement('li');
  var img = document.createElement('img');
  img.src = beer.image_url;
  img.style.height = "500px";
  li.appendChild(img);
  ul.appendChild(li)
}

var getIngredients = function(beer, ul){
  var ingredientList = document.createElement('ul');
  ingredientList.innerText = "Ingredients: ";
  var ingredients = beer.ingredients;
  getMalt(ingredients, ingredientList);
  getHops(ingredients, ingredientList);
  getYeast(ingredients, ingredientList);
  ul.appendChild(ingredientList);
}

var getMalt = function(ingredients, ul){
  var maltList = document.createElement('ul');
  maltList.innerText = "Malts: "
  var malts = ingredients.malt;
  malts.forEach(function(malt){
    var name = document.createElement('li');
    var amount = document.createElement('li');
    var space = document.createElement('li');
    name.innerText = "Name: " + malt.name;
    amount.innerText = "Amount: " + malt.amount.value + " " + malt.amount.unit;
    space.innerText = "\n";
    maltList.appendChild(name);
    maltList.appendChild(amount);
    maltList.appendChild(space);
  })
ul.appendChild(maltList);
}

var getHops = function(ingredients, ul){
  var hopList = document.createElement('ul');
  hopList.innerText = "Hops: "
  var hops = ingredients.hops;
  hops.forEach(function(hop){
    var name = document.createElement('li');
    var amount = document.createElement('li');
    var add = document.createElement('li');
    var attribute = document.createElement('li');
    var space = document.createElement('li');
    name.innerText = "Name: " + hop.name;
    amount.innerText = "Amount: " + hop.amount.value + " " + hop.amount.unit;
    add.innerText = "Add: " + hop.add;
    attribute.innerText = "Attribute: " + hop.attribute;
    space.innerText = "\n";
    hopList.appendChild(name);
    hopList.appendChild(amount);
    hopList.appendChild(add);
    hopList.appendChild(attribute);
    hopList.appendChild(space);
  })
ul.appendChild(hopList);
}

var getYeast = function(ingredients, ul){
  var yeastList = document.createElement('ul');
  yeastList.innerText = "Yeast: "
  var name = document.createElement('li');
  var space = document.createElement('li');
  name.innerText = ingredients.yeast;
  space.innerText = "\n";
  yeastList.appendChild(name);
  yeastList.appendChild(space);
  ul.appendChild(yeastList);
}

var populateSelect = function(select, beers){
  beers.forEach(function(beer){
    var option = document.createElement('option');
    option.innerText = beer.name;
    select.appendChild(option);
  })
}

var selectBeer = function(){
  var selected = this.value;
  var selectObj = allBeers.filter(function(beer){
    return beer.name === selected;
    debugger;
  })
  populateList(selectObj);
}

window.addEventListener('load', app);