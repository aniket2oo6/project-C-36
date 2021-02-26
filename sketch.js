var dog,sadDog,happyDog;
var foodObj;
var database;
var feed,addFood;
var foodStock;
var readS; 
var food;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  foodObj = new Food();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

 
}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref("/").update({
    food:foodObj.getFoodStock()
  })
}

function addFoods(){
  food++;
  database.ref("/").update({
    food:food
  });
}

function readStock(data){
  readS = data.val();
  foodObj.updateFoodStock(readS);
}

//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock
