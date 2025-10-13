import Link from "next/link";
import classes from './page.module.css';
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: 'All Meals',
  description: 'Find all delicous meals',
};

async function LoadMeals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

// export default async function Meals() { // You can use async on server components. But on react components you can't use.
export default function Meals() { // You can use async on server components. But on react components you can't use.
  return (
    <>
    <header className={classes.header}>
      <h1>Delicious meals, create <span className={classes.highlight}>by you</span></h1>
      <p>Choose yout favourite recipe and cook it yourself. It is easy and fun!</p>
      <p className={classes.cta}>
        <Link href='/meals/share'>Share your favorite recipe</Link>
      </p>
    </header>
    <main className={classes.main}>
      <Suspense fallback={<p className={classes.loading}>Loading Meals...</p>}>
        <LoadMeals />
      </Suspense>
    </main>
    </>
  );
}