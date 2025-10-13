
import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// dyanmic meta data
export async function generateMetadata({params}) {
  const { slug } = await params; 
  const meal = getMeal(slug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  }
};

export default async function MealDetailsPage({params}) {
  const { slug } = await params; 
  const meal = getMeal(slug);
  // console.log(slug, meal);

  if (!meal) {
    notFound();
  }

  const intructions = meal?.instructions?.replace(/\n/g, '<br />');

  return (
    <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image 
          src={meal.image} 
          alt={meal.title} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creator}>
          by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
        </p>
        <p className={classes.summary}>{meal.summary}</p>
      </div>
    </header>
    <main>
      <p 
        className={classes.instructions}
        dangerouslySetInnerHTML={{
          __html: intructions
        }}
      ></p>
    </main>
    </>
    
  );
}