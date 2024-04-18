import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import IndiviualMealItem from "../IndividualMealItem/IndiviualMealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  // const DUMMY_MEALS = [
  //   {
  //     id: "m1",
  //     name: "Sushi",
  //     description: "Finest fish and veggies",
  //     price: 22.99,
  //   },
  //   {
  //     id: "m2",
  //     name: "Schnitzel",
  //     description: "A german specialty!",
  //     price: 16.5,
  //   },
  //   {
  //     id: "m3",
  //     name: "Barbecue Burger",
  //     description: "American, raw, meaty",
  //     price: 12.99,
  //   },
  //   {
  //     id: "m4",
  //     name: "Green Bowl",
  //     description: "Healthy...and green...",
  //     price: 18.99,
  //   },
  // ];
  useEffect(() => {
    async function fetchMeals() {

      const response = await fetch("https://react-http-post-method-c5d25-default-rtdb.firebaseio.com/meals.json");
      if (!response.ok) {
        throw new Error('Bad Request')
      }
      const responseData = await response.json();

      const LoadedMeals = [];

      for (const key in responseData) {
        LoadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      };

      setMeals(LoadedMeals);
      setIsLoading(false);
    }

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  

if(isLoading){
  return <p>Loading...</p>
}

if(httpError){
  return <p>{httpError}</p>
}
  const mealsItem = meals.map((meal) => {
    return (
      <IndiviualMealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsItem}</ul> 
      </Card>
    </section>
  );
};

export default AvailableMeals;

  


  