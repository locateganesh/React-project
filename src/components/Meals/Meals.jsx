// import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from '../../hooks/useHttp.js';
import Error from "../Error/Error.jsx";

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("http://localhost:3000/meals");
  //     if (!response.ok) {
  //       return;
  //     }
  //     const resData = await response.json();
  //     setLoadedMeals(resData);
  //   })();
  // }, []);

  const { data: loadedMeals, isLoading, error } = useHttp("http://localhost:3000/meals", []);

  if (isLoading) {
    return <p className="center">Loading Meals...</p>
  }

  if (error) {
    return <Error title="Failed to load Meals" message={error} />
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
